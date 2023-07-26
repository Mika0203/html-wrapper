// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { wrapSelection } from "./features";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const wrapSelectionCommand = vscode.commands.registerCommand(
    "html-wrapper.wrapDiv",
    wrapSelection
  );
  context.subscriptions.push(wrapSelectionCommand);
}

// This method is called when your extension is deactivated
export function deactivate(context: vscode.ExtensionContext) {
  for (const subscription of context.subscriptions) {
    subscription.dispose();
  }
}

function executeCommand(
  uri: vscode.Uri,
  range: vscode.Range | vscode.Selection
) {
  // Code Action을 실행할 작업을 수행
  // 예: 선택한 텍스트를 대문자로 변환하는 Code Action
  const editor = vscode.window.activeTextEditor;
  const selectedText = editor!.document.getText(range);
  const transformedText = selectedText.toUpperCase();
  editor!.edit((editBuilder) => {
    editBuilder.replace(range, transformedText);
  });
}
