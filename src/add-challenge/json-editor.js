import React from 'react';
import jsonlint from 'jsonlint-mod';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/material.css';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/lint/lint';
import 'codemirror/addon/lint/json-lint';
import 'codemirror/addon/selection/active-line';
import 'codemirror/addon/edit/matchbrackets';
import './json-editor.css';
import { prettifyJson } from './json-prettifier-command';
import {handleBeforeChange} from "./json-change-controller";

window.jsonlint = jsonlint;

const JsonEditor = ({ value, onChange }) => {
  return (
    <CodeMirror
      value={value}
      options={{
        mode: 'application/json',
        theme: 'material',
        lineNumbers: true,
        lineWrapping: false,
        tabSize: 4,
        indentUnit: 4,
        autoCloseBrackets: false,
        matchBrackets: true,
        lint: true,
        gutters: ["CodeMirror-lint-markers"],
        extraKeys: {
          "Shift-Tab": "indentLess",
          "Tab": (cm) => {
            if (cm.somethingSelected()) {
              cm.indentSelection("add");
            } else {
              cm.replaceSelection("    ", "end");
            }
          },
          "Enter": (cm) => {
            const cursor = cm.getCursor();
            const line = cm.getLine(cursor.line);
            if (!line.endsWith(',')) {
              cm.replaceRange(',', { line: cursor.line, ch: line.length });
            }
            if (cm.somethingSelected()) {
              cm.indentSelection("add");
            } else {
              const pos = cm.getCursor();
              cm.replaceRange("\n" + "    ".repeat(pos.ch / 4), pos);
              cm.setCursor({ line: pos.line + 1, ch: 4 });
            }
          },
          "Ctrl-Alt-L": (cm) => prettifyJson(cm),
          "Cmd-Alt-L": (cm) => prettifyJson(cm)
        }
      }}
      onBeforeChange={(editor, data, value) => handleBeforeChange(editor, data, value, onChange)}
    />
  );
};

export default JsonEditor;
