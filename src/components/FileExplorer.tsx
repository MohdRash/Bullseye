import React, { useState } from 'react';
import { ChevronRight, ChevronDown, File, Folder, FolderOpen, Plus, MoreHorizontal } from 'lucide-react';
import { useFileTree } from '../contexts/FileTreeContext';
import { useEditor } from '../contexts/EditorContext';

const FileExplorer: React.FC = () => {
  const { fileTree, createFile, createFolder, deleteFile, toggleFolder } = useFileTree();
  const { openFile } = useEditor();
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; path: string } | null>(null);

  const handleContextMenu = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, path });
  };

  const handleFileClick = (path: string, isFolder: boolean) => {
    if (isFolder) {
      toggleFolder(path);
    } else {
      openFile(path);
    }
  };

  const renderFileTree = (items: any[], depth = 0) => {
    return items.map((item) => (
      <div key={item.path} className="select-none">
        <div
          className={`flex items-center py-1 px-2 hover:bg-[#2a2d2e] cursor-pointer text-sm transition-colors`}
          style={{ paddingLeft: `${8 + depth * 16}px` }}
          onClick={() => handleFileClick(item.path, item.type === 'folder')}
          onContextMenu={(e) => handleContextMenu(e, item.path)}
        >
          {item.type === 'folder' ? (
            <>
              {item.expanded ? (
                <ChevronDown size={12} className="mr-1 text-[#cccccc]" />
              ) : (
                <ChevronRight size={12} className="mr-1 text-[#cccccc]" />
              )}
              {item.expanded ? (
                <FolderOpen size={16} className="mr-2 text-[#dcb67a]" />
              ) : (
                <Folder size={16} className="mr-2 text-[#dcb67a]" />
              )}
            </>
          ) : (
            <>
              <div className="w-3 mr-1" />
              <File size={16} className="mr-2 text-[#cccccc]" />
            </>
          )}
          <span className="text-[#cccccc] truncate">{item.name}</span>
        </div>
        {item.type === 'folder' && item.expanded && item.children && (
          <div>
            {renderFileTree(item.children, depth + 1)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-3 border-b border-[#3e3e42]">
        <h3 className="text-xs font-semibold text-[#cccccc] uppercase tracking-wider">Explorer</h3>
        <div className="flex gap-1">
          <button
            onClick={() => createFile('', 'new-file.txt')}
            className="p-1 hover:bg-[#2a2d2e] rounded transition-colors"
            title="New File"
          >
            <Plus size={14} className="text-[#cccccc]" />
          </button>
          <button
            onClick={() => createFolder('', 'new-folder')}
            className="p-1 hover:bg-[#2a2d2e] rounded transition-colors"
            title="New Folder"
          >
            <Folder size={14} className="text-[#cccccc]" />
          </button>
          <button className="p-1 hover:bg-[#2a2d2e] rounded transition-colors">
            <MoreHorizontal size={14} className="text-[#cccccc]" />
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="py-2">
          {renderFileTree(fileTree)}
        </div>
      </div>

      {contextMenu && (
        <div
          className="fixed bg-[#383838] border border-[#5a5a5a] rounded shadow-lg py-1 z-50 min-w-[150px]"
          style={{ left: contextMenu.x, top: contextMenu.y }}
          onMouseLeave={() => setContextMenu(null)}
        >
          <button
            className="w-full text-left px-3 py-1 text-sm hover:bg-[#2a2d2e] transition-colors"
            onClick={() => {
              createFile(contextMenu.path, 'new-file.txt');
              setContextMenu(null);
            }}
          >
            New File
          </button>
          <button
            className="w-full text-left px-3 py-1 text-sm hover:bg-[#2a2d2e] transition-colors"
            onClick={() => {
              createFolder(contextMenu.path, 'new-folder');
              setContextMenu(null);
            }}
          >
            New Folder
          </button>
          <hr className="my-1 border-[#5a5a5a]" />
          <button
            className="w-full text-left px-3 py-1 text-sm hover:bg-[#2a2d2e] text-red-400 transition-colors"
            onClick={() => {
              deleteFile(contextMenu.path);
              setContextMenu(null);
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default FileExplorer;