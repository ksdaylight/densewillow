'use client';

import { FC } from 'react';
import StarterKit from '@tiptap/starter-kit';
import { EditorContent, useEditor } from '@tiptap/react';
import Underline from '@tiptap/extension-underline';

import ToolBar from './ToolBar';

interface Props {}

const Editor: FC<Props> = (): JSX.Element => {
    const editor = useEditor({
        extensions: [StarterKit, Underline],
    });
    return (
        <>
            <ToolBar editor={editor} onOpenImageClick={() => {}} />
            <EditorContent editor={editor} />
        </>
    );
};

export default Editor;
