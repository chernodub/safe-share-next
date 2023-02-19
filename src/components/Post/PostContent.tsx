import type { InitialConfigType } from '@lexical/react/LexicalComposer';
import { LexicalComposer } from '@lexical/react/LexicalComposer';

import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import type { Post } from '@prisma/client';

import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';

import { lexicalEditorConfig } from './config';
import { PrefillEditorStatePlugin } from './PostEditor';
import { getLexicalTheme } from './config/baseLexicalTheme';
import styles from './PostContent.module.css';

const editorConfig: InitialConfigType = {
  ...lexicalEditorConfig,
  theme: getLexicalTheme({
    root: styles.root,
    paragraph: styles.p,
  }),
  editable: false,
};

export function PostContent({ post }: { post: Post; }) {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <PrefillEditorStatePlugin content={post.text} />
      <RichTextPlugin contentEditable={<ContentEditable />} placeholder={null} ErrorBoundary={LexicalErrorBoundary} />
    </LexicalComposer>
  );
}
