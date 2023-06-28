'use client';

import { FC, useEffect, useState } from 'react';
import StarterKit from '@tiptap/starter-kit';
import { EditorContent, getMarkRange, useEditor, Range } from '@tiptap/react';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import Youtube from '@tiptap/extension-youtube';

import ToolBar from './ToolBar';
import EditLink from './Link/EditLink';
import Video from './Video';

interface Props {}

const Editor: FC<Props> = (): JSX.Element => {
    const [selectionRange, setSelectionRange] = useState<Range>();
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Placeholder.configure({
                placeholder: 'Type something',
            }),
            Link.configure({
                autolink: false,
                linkOnPaste: false,
                openOnClick: false,
                HTMLAttributes: {
                    target: '',
                },
            }),
            Youtube.configure({
                width: 840,
                height: 472.5,
                HTMLAttributes: {
                    class: 'mx-auto rounded',
                },
            }),
            Video,
        ],
        editorProps: {
            handleClick(view, pos, event) {
                const { state } = view;
                const range = getMarkRange(state.doc.resolve(pos), state.schema.marks.link);
                if (range) setSelectionRange(range);
            },
            attributes: {
                class: 'prose prose-lg focus:outline-none dark:prose-invert max-w-full mx-auto h-full',
            },
        },
    });
    useEffect(() => {
        if (editor && selectionRange) {
            editor.commands.setTextSelection(selectionRange);
        }
    }, [editor, selectionRange]);
    return (
        <>
            <ToolBar editor={editor} onOpenImageClick={() => {}} />
            <div className="h-[1px] w-full bg-secondary-dark dark:bg-secondary-light my-3" />
            {editor ? <EditLink editor={editor} /> : null}
            <EditorContent editor={editor} />
        </>
    );
};

export default Editor;
