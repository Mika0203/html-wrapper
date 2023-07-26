// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { wrapDiv } from "./features";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "html-wrapper.helloWorld",
    () => {
      vscode.window.showInformationMessage("Hello World from HTML wrapper!");
    }
  );

  context.subscriptions.push(disposable);

  // =================================================================

  // create code action lower case to upper case

  const codeAction = vscode.languages.registerCodeActionsProvider(
    { scheme: "file", language: "html" },
    {
      provideCodeActions(document, range) {
        const codeAction = new vscode.CodeAction(
          "lower case to upper case",
          vscode.CodeActionKind.QuickFix
        );
        codeAction.command = {
          title: "lower case to upper case",
          command: "html-wrapper.lowerCaseToUpperCase",
          arguments: [document.uri, range],
        };
        return [codeAction];
      },
    }
  );

  context.subscriptions.push(codeAction);

  // create command wrap selections with div. comamnd's name is "wrap with tag"
  const wrapWithTag = vscode.commands.registerCommand(
    "html-wrapper.wrapDiv",
    wrapDiv
  );

  context.subscriptions.push(wrapWithTag);

  // create quick fix in html file to wrap selected text with div tag
  const quickFix = vscode.languages.registerCodeActionsProvider(
    { scheme: "file", language: "html" },
    {
      provideCodeActions(document, range) {
        const codeAction = new vscode.CodeAction(
          "wrap with div",
          vscode.CodeActionKind.QuickFix
        );
        codeAction.command = {
          title: "wrap with div",
          command: "html-wrapper.wrapDiv",
          arguments: [document.uri, range],
        };
        return [codeAction];
      },
    }
  );

  context.subscriptions.push(quickFix);
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
