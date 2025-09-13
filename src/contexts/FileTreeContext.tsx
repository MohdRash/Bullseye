import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FileTreeItem {
  name: string;
  path: string;
  type: 'file' | 'folder';
  expanded?: boolean;
  children?: FileTreeItem[];
}

interface FileTreeContextType {
  fileTree: FileTreeItem[];
  createFile: (parentPath: string, name: string) => void;
  createFolder: (parentPath: string, name: string) => void;
  deleteFile: (path: string) => void;
  toggleFolder: (path: string) => void;
}

const FileTreeContext = createContext<FileTreeContextType | undefined>(undefined);

const initialFileTree: FileTreeItem[] = [
  {
    name: 'src',
    path: 'src',
    type: 'folder',
    expanded: true,
    children: [
      {
        name: 'components',
        path: 'src/components',
        type: 'folder',
        expanded: false,
        children: [
          { name: 'App.tsx', path: 'src/components/App.tsx', type: 'file' },
          { name: 'Header.tsx', path: 'src/components/Header.tsx', type: 'file' }
        ]
      },
      { name: 'index.tsx', path: 'src/index.tsx', type: 'file' },
      { name: 'App.css', path: 'src/App.css', type: 'file' }
    ]
  },
  {
    name: 'public',
    path: 'public',
    type: 'folder',
    expanded: false,
    children: [
      { name: 'index.html', path: 'public/index.html', type: 'file' }
    ]
  },
  { name: 'package.json', path: 'package.json', type: 'file' },
  { name: 'README.md', path: 'README.md', type: 'file' }
];

export const FileTreeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [fileTree, setFileTree] = useState<FileTreeItem[]>(initialFileTree);

  const findItemByPath = (items: FileTreeItem[], path: string): FileTreeItem | null => {
    for (const item of items) {
      if (item.path === path) return item;
      if (item.children) {
        const found = findItemByPath(item.children, path);
        if (found) return found;
      }
    }
    return null;
  };

  const createFile = (parentPath: string, name: string) => {
    const newPath = parentPath ? `${parentPath}/${name}` : name;
    const newFile: FileTreeItem = { name, path: newPath, type: 'file' };
    
    setFileTree(prev => {
      const updated = [...prev];
      if (!parentPath) {
        updated.push(newFile);
      } else {
        const parent = findItemByPath(updated, parentPath);
        if (parent && parent.type === 'folder') {
          if (!parent.children) parent.children = [];
          parent.children.push(newFile);
        }
      }
      return updated;
    });
  };

  const createFolder = (parentPath: string, name: string) => {
    const newPath = parentPath ? `${parentPath}/${name}` : name;
    const newFolder: FileTreeItem = { 
      name, 
      path: newPath, 
      type: 'folder', 
      expanded: false, 
      children: [] 
    };
    
    setFileTree(prev => {
      const updated = [...prev];
      if (!parentPath) {
        updated.push(newFolder);
      } else {
        const parent = findItemByPath(updated, parentPath);
        if (parent && parent.type === 'folder') {
          if (!parent.children) parent.children = [];
          parent.children.push(newFolder);
        }
      }
      return updated;
    });
  };

  const deleteFile = (path: string) => {
    setFileTree(prev => {
      const removeItem = (items: FileTreeItem[]): FileTreeItem[] => {
        return items.filter(item => {
          if (item.path === path) return false;
          if (item.children) {
            item.children = removeItem(item.children);
          }
          return true;
        });
      };
      return removeItem([...prev]);
    });
  };

  const toggleFolder = (path: string) => {
    setFileTree(prev => {
      const updated = [...prev];
      const folder = findItemByPath(updated, path);
      if (folder && folder.type === 'folder') {
        folder.expanded = !folder.expanded;
      }
      return updated;
    });
  };

  return (
    <FileTreeContext.Provider value={{
      fileTree,
      createFile,
      createFolder,
      deleteFile,
      toggleFolder
    }}>
      {children}
    </FileTreeContext.Provider>
  );
};

export const useFileTree = () => {
  const context = useContext(FileTreeContext);
  if (!context) {
    throw new Error('useFileTree must be used within a FileTreeProvider');
  }
  return context;
};