import React from 'react';
import Editor from '@monaco-editor/react';

interface EditorAreaProps {
  code: string;
  language: string;
  onCodeChange: (value: string | undefined) => void;
}

const EditorArea: React.FC<EditorAreaProps> = ({ code, language, onCodeChange }) => {
  return (
    <div className="flex-1">
      <Editor
        height="100%"
        language={language}
        value={code}
        onChange={onCodeChange}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default EditorArea;