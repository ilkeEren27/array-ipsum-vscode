import * as vscode from 'vscode';
import {
  DataType,
  generateArray,
  formatOutput,
  generateCodeSnippet,
  mapLanguageId
} from './generators';

const dataTypes: { label: string; value: DataType; description: string }[] = [
  { label: "Integer", value: "int", description: "Whole numbers" },
  { label: "Float", value: "float", description: "2 decimal places" },
  { label: "Double", value: "double", description: "6 decimal places" },
  { label: "String", value: "string", description: "Lorem ipsum words" },
  { label: "Boolean", value: "bool", description: "true/false values" },
];

export function activate(context: vscode.ExtensionContext) {
  // Command: Generate plain array
  const generateCmd = vscode.commands.registerCommand('arrayipsum.generate', async () => {
    const result = await promptAndGenerate(false);
    if (result) {
      insertAtCursor(result);
    }
  });

  // Command: Generate code snippet
  const generateCodeCmd = vscode.commands.registerCommand('arrayipsum.generateCode', async () => {
    const result = await promptAndGenerate(true);
    if (result) {
      insertAtCursor(result);
    }
  });

  context.subscriptions.push(generateCmd, generateCodeCmd);
}

async function promptAndGenerate(asCode: boolean): Promise<string | undefined> {
  // Step 1: Select data type
  const typeSelection = await vscode.window.showQuickPick(
    dataTypes.map(t => ({
      label: t.label,
      description: t.description,
      value: t.value
    })),
    {
      placeHolder: "Select data type",
      title: "Array Ipsum: Choose Data Type"
    }
  );

  if (!typeSelection) {
    return undefined;
  }

  // Step 2: Enter count
  const countInput = await vscode.window.showInputBox({
    prompt: "Number of elements to generate",
    placeHolder: "Enter a number (1-1000)",
    value: "10",
    validateInput: (value) => {
      const num = parseInt(value);
      if (isNaN(num) || num < 1 || num > 1000) {
        return "Please enter a number between 1 and 1000";
      }
      return null;
    }
  });

  if (!countInput) {
    return undefined;
  }

  const count = parseInt(countInput);
  const dataType = (typeSelection as any).value as DataType;

  // Step 3: Ask about negative values (only for numeric types)
  let allowNegative = true;
  if (dataType === "int" || dataType === "float" || dataType === "double") {
    const negativeSelection = await vscode.window.showQuickPick(
      [
        { label: "Yes", description: "Include negative values (-1000 to 1000)" },
        { label: "No", description: "Only positive values (0 to 1000)" }
      ],
      {
        placeHolder: "Include negative values?",
        title: "Array Ipsum: Negative Values"
      }
    );

    if (!negativeSelection) {
      return undefined;
    }

    allowNegative = negativeSelection.label === "Yes";
  }

  const arr = generateArray(dataType, count, allowNegative);

  if (asCode) {
    // Get current file language
    const editor = vscode.window.activeTextEditor;
    const languageId = editor?.document.languageId || "javascript";
    const language = mapLanguageId(languageId);
    return generateCodeSnippet(arr, dataType, language);
  } else {
    return formatOutput(arr, dataType);
  }
}

async function insertAtCursor(text: string): Promise<void> {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    // No editor open, copy to clipboard instead
    await vscode.env.clipboard.writeText(text);
    vscode.window.showInformationMessage("Array copied to clipboard!");
    return;
  }

  await editor.edit(editBuilder => {
    const position = editor.selection.active;
    editBuilder.insert(position, text);
  });

  vscode.window.showInformationMessage(`Generated ${text.split(",").length} elements`);
}

export function deactivate() { }
