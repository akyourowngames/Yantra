'use client';

const PYODIDE_VERSION = '0.29.3';
const PYODIDE_INDEX_URL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;
const PYODIDE_SCRIPT_URL = `${PYODIDE_INDEX_URL}pyodide.js`;

const noop = () => {};

type PyodideLoaderOptions = {
  indexURL: string;
  fullStdLib?: boolean;
  stdin?: () => string | null;
  stdout?: (message: string) => void;
  stderr?: (message: string) => void;
};

type PyodideStreamHandler = {
  batched: (output: string) => void;
};

type PyodideStdinHandler = {
  stdin: () => string | null;
  error?: boolean;
};

type PyodideLike = {
  setStdout: (handler: PyodideStreamHandler) => void;
  setStderr: (handler: PyodideStreamHandler) => void;
  setStdin: (handler: PyodideStdinHandler) => void;
  loadPackagesFromImports: (
    code: string,
    options?: {
      errorCallback?: (message: string) => void;
    },
  ) => Promise<void>;
  runPythonAsync: (code: string, options?: { filename?: string }) => Promise<unknown>;
};

type PyodideWindow = Window & {
  loadPyodide?: (options?: PyodideLoaderOptions) => Promise<PyodideLike>;
};

let pyodideScriptPromise: Promise<void> | null = null;
let pyodidePromise: Promise<PyodideLike> | null = null;

function normalizeLines(lines: string[]) {
  return lines
    .join('\n')
    .split('\n')
    .map((line) => line.trimEnd())
    .join('\n')
    .trim();
}

function getResultPreview(result: unknown) {
  if (result === undefined || result === null) {
    return '';
  }

  const rendered = String(result).trim();

  if (typeof result === 'object' && result && 'destroy' in result && typeof result.destroy === 'function') {
    result.destroy();
  }

  return rendered;
}

function getRuntimeScriptNode() {
  return document.querySelector<HTMLScriptElement>('script[data-yantra-pyodide="true"]');
}

function createStdinReader(stdinText?: string) {
  const lines = (stdinText ?? '')
    .split(/\r?\n/)
    .filter((line, index, allLines) => line.length > 0 || index < allLines.length - 1);
  let cursor = 0;

  return () => {
    if (cursor >= lines.length) {
      return null;
    }

    const nextLine = lines[cursor] ?? '';
    cursor += 1;
    return `${nextLine}\n`;
  };
}

function ensurePyodideScript() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return Promise.reject(new Error('Pyodide can only be loaded in the browser.'));
  }

  const pyodideWindow = window as PyodideWindow;

  if (pyodideWindow.loadPyodide) {
    return Promise.resolve();
  }

  if (pyodideScriptPromise) {
    return pyodideScriptPromise;
  }

  pyodideScriptPromise = new Promise<void>((resolve, reject) => {
    const failLoad = (message: string) => {
      pyodideScriptPromise = null;
      reject(new Error(message));
    };

    const completeLoad = () => {
      if (!pyodideWindow.loadPyodide) {
        failLoad('Pyodide script loaded but the runtime bootstrap was unavailable.');
        return;
      }

      resolve();
    };

    const existingScript = getRuntimeScriptNode();
    if (existingScript) {
      if (existingScript.dataset.loaded === 'true') {
        completeLoad();
        return;
      }

      existingScript.addEventListener('load', completeLoad, { once: true });
      existingScript.addEventListener('error', () => failLoad('Failed to load the Pyodide runtime script from the CDN.'), {
        once: true,
      });
      return;
    }

    const script = document.createElement('script');
    script.src = PYODIDE_SCRIPT_URL;
    script.async = true;
    script.dataset.yantraPyodide = 'true';
    script.addEventListener(
      'load',
      () => {
        script.dataset.loaded = 'true';
        completeLoad();
      },
      { once: true },
    );
    script.addEventListener('error', () => failLoad('Failed to load the Pyodide runtime script from the CDN.'), { once: true });
    document.head.appendChild(script);
  });

  return pyodideScriptPromise;
}

export async function getPyodideRuntime() {
  if (!pyodidePromise) {
    pyodidePromise = ensurePyodideScript()
      .then(async () => {
        const pyodideWindow = window as PyodideWindow;

        if (!pyodideWindow.loadPyodide) {
          throw new Error('Pyodide bootstrap is unavailable in this browser context.');
        }

        return pyodideWindow.loadPyodide({
          indexURL: PYODIDE_INDEX_URL,
          fullStdLib: false,
          stdin: () => null,
          stdout: noop,
          stderr: noop,
        });
      })
      .catch((error) => {
        pyodidePromise = null;
        throw error;
      });
  }

  return pyodidePromise;
}

export async function warmPyodideRuntime() {
  try {
    await getPyodideRuntime();
    return true;
  } catch {
    return false;
  }
}

export async function runPythonInBrowser(code: string, stdinText?: string) {
  const stdoutBuffer: string[] = [];
  const stderrBuffer: string[] = [];
  let pyodide: PyodideLike | null = null;

  try {
    pyodide = await getPyodideRuntime();

    pyodide.setStdout({
      batched: (output) => {
        if (output) {
          stdoutBuffer.push(output);
        }
      },
    });

    pyodide.setStderr({
      batched: (output) => {
        if (output) {
          stderrBuffer.push(output);
        }
      },
    });

    pyodide.setStdin({
      stdin: createStdinReader(stdinText),
    });

    await pyodide.loadPackagesFromImports(code, {
      errorCallback: (message) => {
        if (message) {
          stderrBuffer.push(message);
        }
      },
    });

    const result = await pyodide.runPythonAsync(code, { filename: 'main.py' });
    const stdout = normalizeLines(stdoutBuffer);
    const stderr = normalizeLines(stderrBuffer);
    const resultPreview = getResultPreview(result);

    const output = [stdout, stderr ? `stderr\n------\n${stderr}` : '', !stdout && !stderr ? resultPreview : '']
      .filter(Boolean)
      .join('\n\n')
      .trim();

    return {
      status: 'success' as const,
      stdout,
      stderr,
      resultPreview,
      output: output || 'Program completed with no output.',
    };
  } catch (error) {
    const stdout = normalizeLines(stdoutBuffer);
    const stderr = normalizeLines(stderrBuffer);
    const message = error instanceof Error ? error.message.trim() : String(error).trim();
    const combinedStderr = [stderr, message].filter(Boolean).join('\n\n').trim();

    return {
      status: 'error' as const,
      stdout,
      stderr: combinedStderr,
      resultPreview: '',
      output: [stdout, combinedStderr].filter(Boolean).join('\n\n').trim() || 'Python execution failed.',
    };
  } finally {
    if (pyodide) {
      pyodide.setStdout({ batched: noop });
      pyodide.setStderr({ batched: noop });
      pyodide.setStdin({
        stdin: () => null,
      });
    }
  }
}
