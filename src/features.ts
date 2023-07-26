import * as vscode from "vscode";

/**
 * html-wrapper.wrapDiv
 * */
const wrapSelection = () => {
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    const selection = editor.selection;
    const text = editor.document.getText(selection);
    editor.edit((editBuilder) => {
      const tabSize =
        typeof editor.options.tabSize === "string"
          ? parseInt(editor.options.tabSize, 10)
          : editor.options.tabSize ?? 1;
      editBuilder.replace(
        selection,
        `<>\n${" ".repeat(
          selection.start.character + tabSize
        )}${text}\n${" ".repeat(selection.start.character)}</>`
      );
    });

    const start = selection.start;
    const end = selection.end;
    const startTagSelection = new vscode.Selection(
      new vscode.Position(start.line, start.character + 1),
      new vscode.Position(start.line, start.character + 1)
    );
    const endTagSelection = new vscode.Selection(
      new vscode.Position(end.line + 2, start.character + 2),
      new vscode.Position(end.line + 2, start.character + 2)
    );
    editor.selections = [startTagSelection, endTagSelection];
  }
};

export { wrapSelection };
