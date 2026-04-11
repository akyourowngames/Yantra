import { pythonRoomDayOneContent, type PythonRoomDayOneContent } from './python-room-content';

export type RoomBlueprint = PythonRoomDayOneContent & {
  id: string;
  slug: string;
};

const controlFlowCalibrationRoom: RoomBlueprint = {
  id: 'control-flow-calibration',
  slug: 'control-flow-calibration',
  ...pythonRoomDayOneContent,
};

export const pythonRoomBlueprints: RoomBlueprint[] = [controlFlowCalibrationRoom];

export function getPythonRoomBlueprintById(roomId: string): RoomBlueprint | null {
  return pythonRoomBlueprints.find((room) => room.id === roomId) ?? null;
}
