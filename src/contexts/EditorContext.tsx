import React, { createContext, useContext, useState, ReactNode } from 'react';

interface OpenFile {
  path: string;
  name: string;
  content: string;
  isDirty: boolean;
}

interface EditorContextType {
  openFiles: OpenFile[];
  activeFile: string | null;
  openFile: (path: string) => void;
  closeFile: (path: string) => void;
  setActiveFile: (path: string) => void;
  updateFileContent: (path: string, content: string) => void;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

const getDefaultContent = (filename: string): string => {
  const ext = filename.split('.').pop()?.toLowerCase();
  
  switch (ext) {
    case 'js':
      return `console.log('Hello from ${filename}');`;
    case 'ts':
      return `const message: string = 'Hello from ${filename}';\nconsole.log(message);`;
    case 'tsx':
      return `import React from 'react';\n\nconst Component: React.FC = () => {\n  return <div>Hello from ${filename}</div>;\n};\n\nexport default Component;`;
    case 'jsx':
      return `import React from 'react';\n\nconst Component = () => {\n  return <div>Hello from ${filename}</div>;\n};\n\nexport default Component;`;
    case 'html':
      return `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Document</title>\n</head>\n<body>\n  <h1>Hello World</h1>\n</body>\n</html>`;
    case 'css':
      return `/* ${filename} */\n\nbody {\n  font-family: -apple-system, BlinkMacSystemFont, sans-serif;\n  margin: 0;\n  padding: 20px;\n}`;
    case 'json':
      return `{\n  "name": "${filename.replace('.json', '')}",\n  "version": "1.0.0",\n  "description": ""\n}`;
    case 'md':
      return `# ${filename.replace('.md', '')}\n\nWelcome to your new markdown file!`;
    case 'py':
      return `#!/usr/bin/env python3\n\ndef main():\n    print("Hello from ${filename}")\n\nif __name__ == "__main__":\n    main()`;
    default:
      return `# Welcome to ${filename}\n\nStart coding here!`;
  }
};

export const EditorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [openFiles, setOpenFiles] = useState<OpenFile[]>([]);
  const [activeFile, setActiveFile] = useState<string | null>(null);

  const openFile = (path: string) => {
    const filename = path.split('/').pop() || path;
    const existingFile = openFiles.find(f => f.path === path);
    
    if (existingFile) {
      setActiveFile(path);
      return;
    }

    const newFile: OpenFile = {
      path,
      name: filename,
      content: getDefaultContent(filename),
      isDirty: false
    };

    setOpenFiles(prev => [...prev, newFile]);
    setActiveFile(path);
  };

  const closeFile = (path: string) => {
    setOpenFiles(prev => prev.filter(f => f.path !== path));
    
    if (activeFile === path) {
      const remaining = openFiles.filter(f => f.path !== path);
      setActiveFile(remaining.length > 0 ? remaining[0].path : null);
    }
  };

  const updateFileContent = (path: string, content: string) => {
    setOpenFiles(prev => prev.map(file => 
      file.path === path 
        ? { ...file, content, isDirty: true }
        : file
    ));
  };

  return (
    <EditorContext.Provider value={{
      openFiles,
      activeFile,
      openFile,
      closeFile,
      setActiveFile,
      updateFileContent
    }}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
};