export const prettifyJson = (editor) => {
  const doc = editor.getDoc();
  const selection = doc.listSelections()[0];
  var from = selection.anchor;
  var to = selection.head;

  // Ensure 'from' and 'to' are defined
  if (!from || !to) {
    console.error('Selection positions are not defined.');
    return;
  }

  let selectedText = doc.getRange(from, to);

  // If no text is selected, use the entire content of the editor
  if (selectedText.trim() === "") {
    selectedText = doc.getValue();
    // Update the selection range to cover the entire content
    from = { line: 0, ch: 0 }
    to = { line: doc.lineCount() - 1, ch: doc.getLine(doc.lineCount() - 1).length }
    doc.setSelection(from, to);
  }

  try {
   const prettyText = JSON.stringify(JSON.parse(selectedText), null, 4)
   console.log(selectedText)

    // Replace the entire content or the selected text with the prettified text
    doc.replaceRange(prettyText, from, to);
  } catch (error) {
    console.error('Error prettifying JSON:', error);
  }
};
