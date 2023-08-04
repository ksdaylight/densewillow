import { getMarkRange, Range, useEditor } from '@tiptap/react';

import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import Youtube from '@tiptap/extension-youtube';
import TipTapImage from '@tiptap/extension-image';
import { useState } from 'react';

interface Options {
    placeholder?: string;
}

const useEditorConfig = (options?: Options) => {
    const [selectionRange, setSelectionRange] = useState<Range>();

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link.configure({
                autolink: false,
                linkOnPaste: false,
                openOnClick: false,
                HTMLAttributes: {
                    target: '',
                },
            }),
            Placeholder.configure({
                placeholder: options?.placeholder || 'Type something',
            }),
            Youtube.configure({
                width: 840,
                height: 472.5,
                HTMLAttributes: {
                    class: 'mx-auto rounded',
                },
            }),
            TipTapImage.configure({
                HTMLAttributes: {
                    class: 'mx-auto',
                },
            }),
        ],
        editorProps: {
            handleClick(view, pos, event) {
                const { state } = view;
                const IsSelectionRange = getMarkRange(
                    state.doc.resolve(pos),
                    state.schema.marks.link,
                );
                if (IsSelectionRange) setSelectionRange(IsSelectionRange);
            },
            attributes: {
                class: 'prose prose-lg focus:outline-none dark:prose-invert max-w-full mx-auto h-full',
            },
        },
    });

    return { editor, selectionRange };
};

export default useEditorConfig;
