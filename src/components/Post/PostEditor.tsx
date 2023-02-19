import { TRANSFORMERS } from '@lexical/markdown';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { useEffect } from 'react';

import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import type { EditorState } from 'lexical';

import type { ChakraProps } from '@chakra-ui/react';
import { Box, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverTrigger, Text, useColorModeValue } from '@chakra-ui/react';
import { MdHelp } from 'react-icons/md';

import { AppIconButton } from '../AppIconButton';

import { lexicalEditorConfig } from './config';

function Editable({ py = 0, px = 0 }: { py?: number; px?: number; }) {
  return (
    <ContentEditable style={{
      outline: 'none',
      padding: `var(--chakra-space-${py}) var(--chakra-space-${px})`,
      background: 'transparent',
      minHeight: '150px',
    }} />
  );
}

interface PostEditorProps {
  value: string;
  onChange: (content: string) => void;
}

export function PostEditor({ value, onChange }: PostEditorProps) {
  const editorBg = useColorModeValue('gray.100', 'gray.600');

  const handleChange = (editorState: EditorState) => {
    const serialziedEditorData = JSON.stringify(editorState.toJSON());
    onChange(serialziedEditorData);
  };

  return (
    <LexicalComposer initialConfig={lexicalEditorConfig}>
      <PrefillEditorStatePlugin content={value} />
      <Box bg={editorBg} borderRadius="xl">
        <Box pos="relative" borderBottomRadius="xl" transition="ease-in-out">
          <RichTextPlugin
            contentEditable={<Editable px={4} py={2} />}
            placeholder={<Placeholder text="Start your post..." mx={4} my={2} />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <OnChangePlugin onChange={handleChange} />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <ListPlugin />
          <LinkPlugin />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          <ShortcutHelperPlugin mx={4} my={2} />
        </Box>
      </Box>
    </LexicalComposer>
  );
}

type ChakraSpaceProps = Pick<ChakraProps, 'm' | 'mx' | 'my'>;

type PlaceholderProps = ChakraSpaceProps & {
  text?: string;
};

export function PrefillEditorStatePlugin({ content }: { content: string; }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.update(() => {
      try {
        const data = editor.parseEditorState(content);
        if (!data.isEmpty()) {
          editor.setEditorState(data);
        }
      } catch (e: unknown) {
        console.warn('Unable to parse editor state', e);
      }
    });
  }, [content, editor]);

  return null;
}

function Placeholder({ text, ...spaceProps }: PlaceholderProps) {
  return <Box pos="absolute" top="0" left="0" userSelect="none" {...spaceProps} pointerEvents="none">{text}</Box>;
}

function ShortcutHelperPlugin({ ...spaceProps }: ChakraSpaceProps) {
  return (
    <>
      <Popover>
        <PopoverTrigger >
          <Box right={0} top={0} pos="absolute" {...spaceProps}>
            <AppIconButton icon={<MdHelp />} label="Show shortcuts" ></AppIconButton>
          </Box>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <Text fontSize="sm">Use markdown for formatting your text</Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
}
