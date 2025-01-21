import React from "react";
import {
  Bold,
  Italic,
  List,
  Link,
  Image as ImageIcon,
  Code,
  FileText,
} from "lucide-react";
interface RichTextEditorProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  attachments?: Array<{
    name: string;
    size: number;
  }>;
  onAttach?: (files: FileList) => void;
}
export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder,
  attachments = [],
  onAttach,
}) => {
  return (
    <div className="w-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="flex items-center gap-1 p-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
        <button className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400">
          <Bold size={16} />
        </button>
        <button className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400">
          <Italic size={16} />
        </button>
        <button className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400">
          <Code size={16} />
        </button>
        <button className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400">
          <Link size={16} />
        </button>
        <div className="h-4 w-px bg-gray-300 dark:bg-gray-600 mx-1" />
        <button className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400">
          <List size={16} />
        </button>
        <div className="h-4 w-px bg-gray-300 dark:bg-gray-600 mx-1" />
        <button
          className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400"
          onClick={() => {
            if (onAttach) {
              const input = document.createElement("input");
              input.type = "file";
              input.multiple = true;
              input.onchange = (e) => {
                const files = (e.target as HTMLInputElement).files;
                if (files && onAttach) {
                  onAttach(files);
                }
              };
              input.click();
            }
          }}
        >
          <ImageIcon size={16} />
        </button>
        <button className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400">
          <FileText size={16} />
        </button>
      </div>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 resize-none focus:outline-none min-h-[120px]"
      />
      {attachments.length > 0 && (
        <div className="border-t border-gray-200 dark:border-gray-700">
          <div className="p-2">
            <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
              Attachments ({attachments.length})
            </div>
            <div className="space-y-2">
              {attachments.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700/50 rounded text-sm"
                >
                  <FileText size={14} className="text-purple-500" />
                  <span className="flex-1 text-gray-700 dark:text-gray-300 truncate">
                    {file.name}
                  </span>
                  <span className="text-gray-400 text-xs">
                    {Math.round(file.size / 1024)}kb
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
