import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Textarea } from '../ui/Textarea';
import { Card } from '../ui/Card';
import { 
  BoldIcon, 
  ItalicIcon, 
  ListBulletIcon, 
  ListNumberedIcon,
  LinkIcon,
  EyeIcon,
  EyeSlashIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  rows?: number;
  disabled?: boolean;
  showPreview?: boolean;
  className?: string;
}

interface ToolbarButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  isActive?: boolean;
  title: string;
  disabled?: boolean;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({ 
  icon, 
  onClick, 
  isActive = false, 
  title, 
  disabled = false 
}) => (
  <Button
    variant="text"
    size="sm"
    onClick={onClick}
    disabled={disabled}
    className={`p-2 h-8 w-8 min-w-0 ${
      isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:text-gray-800'
    }`}
    title={title}
  >
    {icon}
  </Button>
);

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = "Start writing your content...",
  label,
  rows = 8,
  disabled = false,
  showPreview = true,
  className = ""
}) => {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Markdown formatting functions
  const wrapText = (before: string, after: string = before) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const beforeText = value.substring(0, start);
    const afterText = value.substring(end);

    const newText = beforeText + before + selectedText + after + afterText;
    onChange(newText);

    // Set cursor position after formatting
    setTimeout(() => {
      if (textarea) {
        textarea.focus();
        textarea.setSelectionRange(
          start + before.length,
          end + before.length
        );
      }
    }, 0);
  };

  const insertAtCursor = (text: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const beforeText = value.substring(0, start);
    const afterText = value.substring(start);

    const newText = beforeText + text + afterText;
    onChange(newText);

    // Set cursor position after insertion
    setTimeout(() => {
      if (textarea) {
        textarea.focus();
        textarea.setSelectionRange(
          start + text.length,
          start + text.length
        );
      }
    }, 0);
  };

  const formatHeader = (level: number) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const lineStart = value.lastIndexOf('\n', start - 1) + 1;
    const lineEnd = value.indexOf('\n', start);
    const lineEndPos = lineEnd === -1 ? value.length : lineEnd;
    const currentLine = value.substring(lineStart, lineEndPos);

    const headerPrefix = '#'.repeat(level) + ' ';
    let newLine = currentLine;

    // Remove existing header formatting
    if (currentLine.match(/^#{1,6}\s/)) {
      newLine = currentLine.replace(/^#{1,6}\s/, '');
    }

    // Add new header formatting
    newLine = headerPrefix + newLine;

    const beforeText = value.substring(0, lineStart);
    const afterText = value.substring(lineEndPos);

    const newText = beforeText + newLine + afterText;
    onChange(newText);
  };

  const formatList = (ordered: boolean) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const lineStart = value.lastIndexOf('\n', start - 1) + 1;
    const lineEnd = value.indexOf('\n', start);
    const lineEndPos = lineEnd === -1 ? value.length : lineEnd;
    const currentLine = value.substring(lineStart, lineEndPos);

    const listPrefix = ordered ? '1. ' : '* ';
    let newLine = currentLine;

    // Remove existing list formatting
    if (currentLine.match(/^[\d*+-]\.?\s/)) {
      newLine = currentLine.replace(/^[\d*+-]\.?\s/, '');
    }

    // Add new list formatting
    newLine = listPrefix + newLine;

    const beforeText = value.substring(0, lineStart);
    const afterText = value.substring(lineEndPos);

    const newText = beforeText + newLine + afterText;
    onChange(newText);
  };

  const formatLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      wrapText('[', `](${url})`);
    }
  };

  const toolbarButtons = [
    {
      icon: <BoldIcon className="h-4 w-4" />,
      onClick: () => wrapText('**'),
      title: 'Bold (Ctrl+B)',
      key: 'bold'
    },
    {
      icon: <ItalicIcon className="h-4 w-4" />,
      onClick: () => wrapText('*'),
      title: 'Italic (Ctrl+I)',
      key: 'italic'
    },
    {
      icon: <LinkIcon className="h-4 w-4" />,
      onClick: formatLink,
      title: 'Insert Link',
      key: 'link'
    },
    {
      icon: <ListBulletIcon className="h-4 w-4" />,
      onClick: () => formatList(false),
      title: 'Unordered List',
      key: 'ul'
    },
    {
      icon: <ListNumberedIcon className="h-4 w-4" />,
      onClick: () => formatList(true),
      title: 'Ordered List',
      key: 'ol'
    }
  ];

  const headerButtons = [
    { level: 1, label: 'H1' },
    { level: 2, label: 'H2' },
    { level: 3, label: 'H3' }
  ];

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case 'b':
            e.preventDefault();
            wrapText('**');
            break;
          case 'i':
            e.preventDefault();
            wrapText('*');
            break;
        }
      }
    };

    const textarea = textareaRef.current;
    if (textarea) {
      textarea.addEventListener('keydown', handleKeyDown);
      return () => textarea.removeEventListener('keydown', handleKeyDown);
    }
  }, [value]);

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <Card className="border border-gray-200">
        {/* Toolbar */}
        <div className="border-b border-gray-200 p-2 bg-gray-50 rounded-t-lg">
          <div className="flex items-center gap-1 flex-wrap">
            {/* Header buttons */}
            <div className="flex items-center gap-1 mr-2">
              {headerButtons.map(({ level, label }) => (
                <Button
                  key={level}
                  variant="text"
                  size="sm"
                  onClick={() => formatHeader(level)}
                  disabled={disabled}
                  className="px-2 py-1 h-7 text-xs font-semibold text-gray-600 hover:text-gray-800"
                  title={`Heading ${level}`}
                >
                  {label}
                </Button>
              ))}
            </div>

            {/* Divider */}
            <div className="w-px h-6 bg-gray-300 mx-1" />

            {/* Formatting buttons */}
            {toolbarButtons.map((button) => (
              <ToolbarButton
                key={button.key}
                icon={button.icon}
                onClick={button.onClick}
                title={button.title}
                disabled={disabled}
              />
            ))}

            {/* Divider */}
            <div className="w-px h-6 bg-gray-300 mx-1" />

            {/* Preview toggle */}
            {showPreview && (
              <ToolbarButton
                icon={isPreviewMode ? <DocumentTextIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                title={isPreviewMode ? 'Edit Mode' : 'Preview Mode'}
                disabled={disabled}
              />
            )}
          </div>
        </div>

        {/* Editor/Preview Content */}
        <div className="p-4">
          {isPreviewMode ? (
            <div className="min-h-[200px] prose prose-sm max-w-none">
              {value ? (
                <div dangerouslySetInnerHTML={{
                  __html: value
                    .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold text-gray-900 mt-6 mb-3">$1</h3>')
                    .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold text-gray-900 mt-8 mb-4">$1</h2>')
                    .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold text-gray-900 mt-8 mb-6">$1</h1>')
                    .replace(/\*\*(.*)\*\*/gim, '<strong class="font-semibold text-gray-900">$1</strong>')
                    .replace(/\*(.*)\*/gim, '<em class="italic">$1</em>')
                    .replace(/\[([^\]]*)\]\(([^\)]*)\)/gim, '<a href="$2" class="text-orange-600 hover:text-orange-700 underline">$1</a>')
                    .replace(/^\* (.*$)/gim, '<li class="ml-4 mb-1">• $1</li>')
                    .replace(/^- (.*$)/gim, '<li class="ml-4 mb-1">• $1</li>')
                    .replace(/^(\d+)\. (.*$)/gim, '<li class="ml-4 mb-1">$1. $2</li>')
                    .replace(/\n\n/gim, '</p><p class="mb-4 text-gray-700 leading-relaxed">')
                    .replace(/\n/gim, '<br />')
                }} />
              ) : (
                <p className="text-gray-500 italic">No content to preview</p>
              )}
            </div>
          ) : (
            <Textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              rows={rows}
              disabled={disabled}
              className="border-0 focus:ring-0 resize-none"
              variant="default"
            />
          )}
        </div>
      </Card>

      {/* Character count */}
      <div className="text-xs text-gray-500 text-right">
        {value.length} characters
      </div>
    </div>
  );
};

export default RichTextEditor; 