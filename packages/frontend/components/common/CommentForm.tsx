import { EditorContent } from '@tiptap/react';
import { FC, useEffect } from 'react';

import useEditorConfig from '@frontend/hooks/useEditorConfig';

import ActionButton from './ActionButton';

interface Props {
    title?: string;
    onSubmit(content: string): void;
    busy?: boolean;
    onClose?(): void;
    initialState?: string;
    visible?: boolean;
}

const CommentForm: FC<Props> = ({
    title,
    busy = false,
    initialState,
    visible = true,
    onSubmit,
    onClose,
}): JSX.Element | null => {
    const { editor } = useEditorConfig({ placeholder: 'Add your comment...' });

    const handleSubmit = () => {
        if (editor && !busy) {
            const value = editor?.getHTML();
            if (value === '<p></p>') return;

            onSubmit(value);
        }
    };

    useEffect(() => {
        if (typeof initialState === 'string')
            editor?.chain().focus().setContent(initialState).run();
    }, [editor, initialState]);

    if (!visible) return null;

    return (
        <div>
            {title ? (
                <h1 className="text-xl text-primary-dark dark:text-primary font-semibold py-3">
                    {title}
                </h1>
            ) : null}
            <EditorContent
                className="min-h-[200px] border-2 border-secondary-dark rounded p-2"
                editor={editor}
            />

            <div className="md:flex justify-end py-3">
                <div className="flex space-x-4">
                    <ActionButton busy={busy} title="Submit" onClick={handleSubmit} />

                    {onClose ? (
                        <button onClick={onClose} className="text-primary-dark dark:text-primary">
                            close
                        </button>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default CommentForm;
