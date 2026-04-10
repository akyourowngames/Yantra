-- Seed script for public.python_rooms
INSERT INTO public.python_rooms (id, topic, room_number, title, learning_goal, concept_summary, difficulty, estimated_minutes, starter_code, expected_output_hint, success_criteria, starter_guidance, banned_concepts, phase_label)
VALUES
(
    'variables-room-1',
    'Variables',
    1,
    'Your First Variable',
    'Store a value in a variable and print it.',
    'A variable is a named container that holds a value. You create one by writing a name, an equals sign, and the value. Python figures out the type automatically.',
    'beginner',
    10,
    '# Store your name in a variable and print it
name = "Asha"
print(name)
',
    'Asha',
    '{"Create at least one variable.","Use print() to display the variable value.","The output matches the value stored."}'::text[],
    '{"Variable names should be lowercase and descriptive.","Use quotes around text values.","print() displays whatever is inside the brackets."}'::text[],
    '{"loops","functions","if statements","lists","dictionaries"}'::text[],
    'Variables // Room 1'
  ),
(
    'variables-room-2',
    'Variables',
    2,
    'Swap Two Variables',
    'Reassign variables and swap their values.',
    'Variables can be updated at any time by assigning a new value. To swap two variables, use a temporary third variable to hold one value while you reassign.',
    'beginner',
    12,
    'a = 10
b = 20

# Swap the values of a and b
# After the swap: a should be 20, b should be 10

print("a =", a)
print("b =", b)
',
    'a = 20
b = 10',
    '{"a ends up with the original value of b.","b ends up with the original value of a.","Print both values after the swap."}'::text[],
    '{"Use a third variable called temp to hold one value temporarily.","Reassign step by step — do not try to do it in one line yet."}'::text[],
    '{"loops","functions","if statements","lists","tuple unpacking"}'::text[],
    'Variables // Room 2'
  ),
(
    'variables-room-3',
    'Variables',
    3,
    'Build a Summary Line',
    'Combine multiple variables into a single printed sentence.',
    'You can combine variables and text using commas in print() or by using string concatenation with +. This is useful for building readable output from stored values.',
    'beginner',
    14,
    'name = "Asha"
age = 17
city = "Mumbai"

# Print one line: "Asha is 17 years old and lives in Mumbai."
',
    'Asha is 17 years old and lives in Mumbai.',
    '{"All three variables appear in the output.","The sentence reads naturally.","age is stored as a number, not a string."}'::text[],
    '{"Use print() with commas to combine values — Python adds spaces automatically.","Or use str(age) to convert the number if you use + concatenation."}'::text[],
    '{"loops","functions","if statements","f-strings","format()"}'::text[],
    'Variables // Room 3'
  ),
(
    'data-types-room-1',
    'Data Types',
    1,
    'Identify the Type',
    'Use type() to discover what data type a value is.',
    'Every value in Python has a type: int for whole numbers, float for decimals, str for text, and bool for True or False. The type() function tells you what type any value is.',
    'beginner',
    10,
    '# Print the type of each value below
print(type(42))
print(type(3.14))
print(type("hello"))
print(type(True))
',
    '<class ''int''>
<class ''float''>
<class ''str''>
<class ''bool''>',
    '{"All four type() calls print correctly.","Output shows int, float, str, and bool."}'::text[],
    '{"Run the code as-is first to see the output.","Then try type() on your own values."}'::text[],
    '{"loops","functions","if statements","lists","type casting"}'::text[],
    'Data Types // Room 1'
  ),
(
    'data-types-room-2',
    'Data Types',
    2,
    'Type Conversion',
    'Convert between int, float, and str using casting functions.',
    'Python lets you convert values from one type to another using int(), float(), and str(). This is called type casting and is useful when combining numbers with text or doing math on user input.',
    'beginner',
    14,
    'price = "49"
tax_rate = 0.18

# Convert price to a float and calculate total with tax
# Print: "Total: 57.82"
',
    'Total: 57.82',
    '{"price is converted from str to float before calculation.","Tax is calculated correctly.","Output shows the correct total."}'::text[],
    '{"Use float(price) to convert the string to a number.","Calculate total = float(price) + float(price) * tax_rate.","Use str() or print with commas to display the result."}'::text[],
    '{"loops","functions","if statements","round()","format()"}'::text[],
    'Data Types // Room 2'
  ),
(
    'data-types-room-3',
    'Data Types',
    3,
    'Boolean Logic',
    'Evaluate expressions that produce True or False.',
    'Booleans represent truth values: True or False. Comparison operators like ==, !=, >, and < produce boolean results. You can also combine them with and, or, and not.',
    'beginner',
    12,
    'score = 85
passing_mark = 50

# Print whether the student passed (True or False)
# Print whether the score is above 90 (True or False)
# Print whether the student passed AND scored above 90
',
    'True
False
False',
    '{"All three print statements use boolean expressions.","No if statements used — only print with comparison operators.","Output is True, False, False."}'::text[],
    '{"Use print(score >= passing_mark) for the first line.","Use print(score > 90) for the second.","Combine with and for the third."}'::text[],
    '{"loops","functions","if statements","lists"}'::text[],
    'Data Types // Room 3'
  ),
(
    'control-flow-room-1',
    'Control Flow',
    1,
    'Pass or Fail',
    'Use an if/else block to decide between two outcomes.',
    'Control flow lets your program make decisions. An if statement runs a block of code only when a condition is True. An else block runs when the condition is False.',
    'beginner',
    12,
    'score = 73

# Print "Pass" if score is 50 or above
# Print "Fail" otherwise
',
    'Pass',
    '{"Uses if and else correctly.","Prints Pass for score >= 50.","Prints Fail for score < 50."}'::text[],
    '{"Start with: if score >= 50:","Indent your print statement inside the if block.","Add else: and the Fail print below."}'::text[],
    '{"loops","functions","elif","lists","match statements"}'::text[],
    'Control Flow // Room 1'
  ),
(
    'control-flow-room-2',
    'Control Flow',
    2,
    'Grade Ladder',
    'Use if/elif/else to assign one of multiple labels.',
    'When you need more than two outcomes, use elif (else if) to chain multiple conditions. Python checks each condition in order and runs the first block that matches.',
    'beginner',
    15,
    'score = 82

# Assign a grade label:
# 90 and above  → "A"
# 75 to 89      → "B"
# 50 to 74      → "C"
# Below 50      → "Fail"

# Print: "Grade: B"
',
    'Grade: B',
    '{"Uses if, elif, and else.","All four grade ranges are covered.","Prints the correct grade for the given score."}'::text[],
    '{"Start with the highest range first: if score >= 90.","Use elif for each lower range.","End with else for anything below 50."}'::text[],
    '{"loops","functions","lists","dictionaries","match statements"}'::text[],
    'Control Flow // Room 2'
  ),
(
    'control-flow-room-3',
    'Control Flow',
    3,
    'Loop Through Scores',
    'Use a for loop to apply a condition to every item in a list.',
    'A for loop repeats a block of code for each item in a sequence. Combined with if/else inside the loop, you can process every item and make decisions about each one.',
    'beginner',
    18,
    'scores = [88, 45, 73, 92, 55]

# Loop through scores
# Print "Pass" for scores >= 50 and "Fail" for scores below 50
',
    'Pass
Fail
Pass
Pass
Pass',
    '{"Loop visits every score in the list.","Correct label printed for each score.","Five lines of output total."}'::text[],
    '{"Use: for score in scores:","Put the if/else block inside the loop with indentation."}'::text[],
    '{"functions","while loops","list comprehension","enumerate"}'::text[],
    'Control Flow // Room 3'
  ),
(
    'functions-room-1',
    'Functions',
    1,
    'Your First Function',
    'Define and call a function that prints a greeting.',
    'A function is a reusable block of code you define once and call many times. Use the def keyword to define it, give it a name, and call it by writing its name followed by ().',
    'beginner',
    10,
    '# Define a function called greet that prints "Hello, Yantra!"
# Then call the function

',
    'Hello, Yantra!',
    '{"Function is defined using def.","Function is called after it is defined.","Output matches exactly."}'::text[],
    '{"Start with: def greet():","Indent the print statement inside the function.","Call it by writing greet() on a new line after the definition."}'::text[],
    '{"parameters","return","loops","if statements","arguments"}'::text[],
    'Functions // Room 1'
  ),
(
    'functions-room-2',
    'Functions',
    2,
    'Function with Parameters',
    'Write a function that accepts input and uses it in output.',
    'Parameters let you pass values into a function when you call it. Inside the function, the parameter works like a variable. This makes functions flexible and reusable for different inputs.',
    'beginner',
    14,
    '# Define a function called greet that takes a name parameter
# It should print: "Hello, Asha!" when called with "Asha"

# Call it with three different names
',
    'Hello, Asha!
Hello, Dev!
Hello, Ira!',
    '{"Function accepts a name parameter.","Output uses the parameter value.","Function is called three times with different names."}'::text[],
    '{"Define as: def greet(name):","Use print() with the name variable inside.","Call greet(""Asha""), greet(""Dev""), greet(""Ira"") separately."}'::text[],
    '{"return","loops","if statements","default parameters","*args"}'::text[],
    'Functions // Room 2'
  ),
(
    'functions-room-3',
    'Functions',
    3,
    'Return a Value',
    'Write a function that calculates and returns a result.',
    'The return statement sends a value back from a function to the code that called it. This lets you store the result in a variable or use it in another expression.',
    'beginner',
    16,
    '# Define a function called add that takes two numbers and returns their sum
# Store the result in a variable and print it

',
    '15',
    '{"Function uses return to send back the sum.","Result is stored in a variable.","Correct sum is printed."}'::text[],
    '{"Define as: def add(a, b):","Use return a + b inside.","Call it: result = add(7, 8) then print(result)."}'::text[],
    '{"loops","if statements","default parameters","multiple return values"}'::text[],
    'Functions // Room 3'
  ),
(
    'variables-room-4',
    'Variables',
    4,
    'Update and Increment',
    'Update a variable using its current value and basic math.',
    'Variables are dynamic. You can update a variable by assigning it a new value that depends on its old value, like incrementing a score by 1.',
    'beginner',
    12,
    'score = 10
# Increase the score by 5
# Then decrease it by 2
# Print the final score
',
    '13',
    '{"The variable score is updated twice.","Mathematical operators + and - are used correctly.","The final output matches the expected result."}'::text[],
    '{"Use score = score + 5 to increase the value.","Alternatively, use the shorthand score += 5."}'::text[],
    '{"loops","functions","if statements","lists","input()"}'::text[],
    'Variables // Room 4'
  ),
(
    'data-types-room-4',
    'Data Types',
    4,
    'Introduction to Lists',
    'Create a list and access its elements using index numbers.',
    'A list is an ordered collection of items. You can store different types together and access them using their position (index), starting from zero.',
    'beginner',
    15,
    'fruits = ["apple", "banana", "cherry"]

# Print the first fruit in the list
# Print the last fruit in the list
# Change "banana" to "blueberries" and print the whole list
',
    'apple
cherry
[''apple'', ''blueberries'', ''cherry'']',
    '{"Access the first item using index 0.","Access the last item using name or index.","Successfully modify an item in the list."}'::text[],
    '{"Use fruits[0] for the first item.","To change an item, use fruits[1] = \"blueberries\".","Python lists use square brackets []."}'::text[],
    '{"loops","functions","if statements","dictionaries","tuples"}'::text[],
    'Data Types // Room 4'
  ),
(
    'control-flow-room-4',
    'Control Flow',
    4,
    'The While Loop',
    'Use a while loop to repeat code as long as a condition is True.',
    'A while loop continues to run its block of code until its condition becomes False. It is essential when you need to repeat an action an unknown number of times.',
    'beginner',
    18,
    'count = 1

# Write a while loop that prints "Count is: X" 
# Keep looping while count is 5 or less
# Don't forget to increase count inside the loop!

',
    'Count is: 1
Count is: 2
Count is: 3
Count is: 4
Count is: 5',
    '{"The while loop has a clear condition.","The loop body prints the count.","The loop variable is incremented to avoid an infinite loop."}'::text[],
    '{"Use while count <= 5: as your loop header.","Add count = count + 1 at the end of your indented block."}'::text[],
    '{"functions","for loops","lists","break","continue"}'::text[],
    'Control Flow // Room 4'
  ),
(
    'functions-room-4',
    'Functions',
    4,
    'Default Parameters',
    'Create a function with a default parameter value.',
    'Default parameters allow you to call a function without providing all the arguments. If an argument is missing, Python uses the predefined default value.',
    'beginner',
    16,
    '# Define a function "greet" with a parameter "name"
# Set the default value of "name" to "Guest"
# The function should print "Welcome, [name]!"

# Call greet() with no name
# Call greet() with "Asha"
',
    'Welcome, Guest!
Welcome, Asha!',
    '{"Function definition includes a default value (name=\"Guest\").","The first call prints the default greeting.","The second call overrides the default with \"Asha\"."}'::text[],
    '{"Define as: def greet(name=\"Guest\"):","Call simply as greet() then greet(\"Asha\")."}'::text[],
    '{"loops","if statements","*args","**kwargs","return"}'::text[],
    'Functions // Room 4'
  );
