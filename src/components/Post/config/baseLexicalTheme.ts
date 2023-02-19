import type { DeepPartial } from '@chakra-ui/react';
import type { EditorThemeClasses } from 'lexical';

import styles from './baseLexicalTheme.module.css';

const baseLexicalEditorTheme: EditorThemeClasses = {
  root: 'unspecified',
  placeholder: 'unspecified',
  paragraph: 'unspecified',
  quote: 'unspecified',
  heading: {
    h1: styles.h1,
    h2: styles.h2,
    h3: styles.h3,
    h4: 'unspecified',
    h5: 'unspecified',
    h6: 'unspecified',
  },
  list: {
    nested: {
      listitem: 'unspecified',
    },
    ol: 'unspecified',
    ul: 'unspecified',
    listitem: 'unspecified',
    listitemChecked: 'unspecified',
    listitemUnchecked: 'unspecified',
  },
  hashtag: 'unspecified',
  image: 'unspecified',
  link: styles.link,
  text: {
    bold: styles.textBold,
    code: 'unspecified',
    italic: styles.textItalic,
    strikethrough: 'unspecified',
    subscript: 'unspecified',
    superscript: 'unspecified',
    underline: styles.textUnderline,
    underlineStrikethrough: 'unspecified',
  },
  code: 'unspecified',
  codeHighlight: {
    'atrule': 'unspecified',
    'attr': 'unspecified',
    'boolean': 'unspecified',
    'builtin': 'unspecified',
    'cdata': 'unspecified',
    'char': 'unspecified',
    'class': 'unspecified',
    'class-name': 'unspecified',
    'comment': 'unspecified',
    'constant': 'unspecified',
    'deleted': 'unspecified',
    'doctype': 'unspecified',
    'entity': 'unspecified',
    'function': 'unspecified',
    'important': 'unspecified',
    'inserted': 'unspecified',
    'keyword': 'unspecified',
    'namespace': 'unspecified',
    'number': 'unspecified',
    'operator': 'unspecified',
    'prolog': 'unspecified',
    'property': 'unspecified',
    'punctuation': 'unspecified',
    'regex': 'unspecified',
    'selector': 'unspecified',
    'string': 'unspecified',
    'symbol': 'unspecified',
    'tag': 'unspecified',
    'url': 'unspecified',
    'variable': 'unspecified',
  },
};

export function getLexicalTheme(overrides: DeepPartial<EditorThemeClasses> = {}): EditorThemeClasses {
  return overrideProperties(overrides, baseLexicalEditorTheme);
}

function overrideProperties<TOverrides extends object, TBase extends TOverrides>(
  overrides: TOverrides,
  base: TBase,
): TBase {
  const baseClone = structuredClone(base);

  // To keep this easy to read
  /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any */
  (Object.entries(overrides) as [keyof TOverrides, any][]).forEach(([key, value]) => {
    if (typeof value === 'object') {
      baseClone[key] = overrideProperties(value, baseClone[key]);
    } else {
      baseClone[key] = value;
    }
  });
  /* eslint-enable @typescript-eslint/no-unsafe-assignment */

  return {
    ...base,
    ...overrides,
  };
}
