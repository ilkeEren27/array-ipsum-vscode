# Array Ipsum

Generate placeholder arrays instantly in VS Code. Create random integer, float, string, and boolean arrays with code snippets for multiple programming languages.

## Features

- **Quick Array Generation**: Generate arrays directly in your editor via Command Palette
- **Multiple Data Types**: Integer, Float, Double, String, Boolean
- **Auto-Detects Language**: Automatically formats output based on your file type
- **Insert at Cursor**: Generated arrays are inserted directly where your cursor is

## Usage

1. Open Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`)
2. Type `Array Ipsum`
3. Choose a command:
   - **Array Ipsum: Generate Array** - Insert a plain array
   - **Array Ipsum: Generate Code Snippet** - Insert language-specific code

## Supported Languages

| Language | Example Output |
|----------|----------------|
| JavaScript | `const arr = [1, 2, 3];` |
| TypeScript | `const arr: number[] = [1, 2, 3];` |
| Python | `arr = [1, 2, 3]` |
| Java | `int[] arr = {1, 2, 3};` |
| C# | `int[] arr = {1, 2, 3};` |
| C++ | `int arr[] = {1, 2, 3};` |

## Data Types

| Type | Description | Example |
|------|-------------|---------|
| Integer | Whole numbers | `[42, -127, 856]` |
| Float | 2 decimal places | `[3.14, -2.71, 1.41]` |
| Double | 6 decimal places | `[3.141592, -2.718281]` |
| String | Lorem ipsum words | `["lorem", "ipsum", "dolor"]` |
| Boolean | true/false values | `[true, false, true]` |

## License

MIT
