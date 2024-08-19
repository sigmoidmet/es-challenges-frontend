// Utility function to count characters in a string
const countCharInString = (str, char) => {
  let count = 0;
  for(let i = 0; i < str.length; i++){
    // Don't count it if the character is preceded by a backslash
    if(str[i] === char && str[i-1] !== '\\'){
      count++;
    }
  }
  return count;
};

// Utility function to determine if a character is a quote or bracket
const isQuoteOrBracket = (char) => ['"', "'", '{', '}', '[', ']', '(', ')'].includes(char);

// Function to check if there are unmatched quotes or brackets in the entire document
const isEven = (doc, char) => {
  const cursor = doc.getCursor();
  const line = doc.getLine(cursor.line);
  const openingCount = countCharInString(line, char);
  return openingCount % 2 === 0;
};

export const handleBeforeChange = (editor, data, value, onChange) => {
  // Automatically remove matching quotes
  if (data.origin === '+delete' && data.text[0] === '' && data.removed && data.removed[0] === '"') {
    const cursor = editor.getCursor();
    const nextChar = editor.getRange(cursor, { line: cursor.line, ch: cursor.ch + 1 });
    if (nextChar === '"') {
      editor.replaceRange('', cursor, { line: cursor.line, ch: cursor.ch + 1 });
    }
  }

  // Automatically add matching closing quote
  const doc = editor.getDoc();
  const cursor = doc.getCursor();
  const selection = doc.getSelection();


  if (data.origin === '+input') {
    if (isQuoteOrBracket(data.text[0])) {
      let closingChar;
      if (data.text[0] === '"') closingChar = '"';
      if (data.text[0] === "'") closingChar = "'";
      if (data.text[0] === '{') closingChar = '}';
      if (data.text[0] === '[') closingChar = ']';

      // Insert the closing character and move the cursor back inside
      if (selection) {
        doc.replaceSelection(data.text[0] + selection + closingChar);
      } else {
        // Insert the closing character if there isn't already an unmatched one
        if ((data.text[0] === '"' || data.text[0] === "'") && isEven(doc, data.text[0])) {
          doc.replaceRange(closingChar, cursor);
          doc.setCursor({ line: cursor.line, ch: cursor.ch + 1 });
        } else {
          onChange(value)
        }
      }

      return;
    }
  }

  // Fix for Ctrl+Z adding two quotes instead of restoring original text
  if (data.origin === 'undo') {
    const history = editor.getHistory();
    const lastChange = history.done[history.done.length - 1];
    if (lastChange && lastChange.changes) {
      lastChange.changes.forEach(change => {
        if (change.removed && change.removed[0] === '"' && change.text[0] === '"') {
          const cursor = editor.getCursor();
          const nextChar = editor.getRange(cursor, { line: cursor.line, ch: cursor.ch + 1 });
          if (nextChar === '"') {
            editor.replaceRange('', cursor, { line: cursor.line, ch: cursor.ch + 1 });
          }
        }
      });
    }
  }

  onChange(value);
};
