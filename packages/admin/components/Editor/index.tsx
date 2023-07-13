'use client';

import { FC, useEffect, useState } from 'react';
import StarterKit from '@tiptap/starter-kit';
import { EditorContent, getMarkRange, useEditor, Range } from '@tiptap/react';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import TipTapImage from '@tiptap/extension-image';
// import { apiClient, baseApiUrl } from 'packages/admin/app/admin/';

import { useTsRestQueryClient } from '@ts-rest/react-query';

import { useQueryClient } from '@tanstack/react-query';

import { apiClient, baseApiUrl } from '../../app/admin/page';

import ToolBar from './ToolBar';
import EditLink from './Link/EditLink';
import Video from './Video';
import GalleryModal, { ImageSelectionResult } from './GalleryModal';

interface Props {}

const Editor: FC<Props> = (): JSX.Element => {
    const [selectionRange, setSelectionRange] = useState<Range>();
    const [showGallery, setShowGallery] = useState(false);

    const apiQueryClient = useTsRestQueryClient(apiClient);
    const queryClient = useQueryClient();

    const [uploading, setUploading] = useState(false);
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
            Video,
            TipTapImage.configure({
                HTMLAttributes: {
                    class: 'mx-auto',
                },
            }),
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
    const handleImageSelection = (result: ImageSelectionResult) => {
        editor?.chain().focus().setImage({ src: result.src, alt: result.altText }).run();
    };

    const { data } = apiClient.images.getImages.useQuery(['getAllImage', '1'], {
        query: {
            skip: String(0),
            take: String(10),
        },
    });
    // debugger;
    const images =
        data?.body?.images.map((image) => ({
            src: `${baseApiUrl}/images/${image.id}${image.ext}`,
        })) || [];
    // console.log(images);

    const { mutate } = apiQueryClient.images.uploadImage.useMutation({
        onSuccess: () => {
            setUploading(false);
            queryClient.invalidateQueries(['getAllImage', '1']);
        },
    });

    const handleImageUpload = async (image: File) => {
        setUploading(true);
        const formData = new FormData();
        formData.append('image', image);
        mutate({ body: { image } });
    };
    useEffect(() => {
        if (editor && selectionRange) {
            editor.commands.setTextSelection(selectionRange);
        }
    }, [editor, selectionRange]);
    // return (
    //     <>
    //         <ToolBar editor={editor} onOpenImageClick={() => {}} />
    //         <div className="h-[1px] w-full bg-secondary-dark dark:bg-secondary-light my-3" />
    //         {editor ? <EditLink editor={editor} /> : null}
    //         <EditorContent editor={editor} />
    //     </>
    // );
    return (
        <>
            <div className="p-3 dark:bg-primary-dark bg-primary transition">
                <div className="sticky top-0 z-10 dark:bg-primary-dark bg-primary">
                    Thumbnail Selector and Submit Button
                    <div className="flex items-center justify-between mb-3">
                        {/* <ThumbnailSelector
                            initialValue={post.thumbnail as string}
                            onChange={updateThumbnail}
                        />
                        <div className="inline-block">
                            <ActionButton busy={busy} title={btnTitle} onClick={handleSubmit} />
                        </div> */}
                    </div>
                    {/* Title Input */}
                    {/* <input
                        type="text"
                        className="py-2 outline-none bg-transparent w-full border-0 border-b-[1px] border-secondary-dark dark:border-secondary-light text-3xl font-semibold italic text-primary-dark dark:text-primary mb-3"
                        placeholder="Title"
                        onChange={updateTitle}
                        value={post.title}
                    /> */}
                    <ToolBar editor={editor} onOpenImageClick={() => setShowGallery(true)} />
                    <div className="h-[1px] w-full bg-secondary-dark dark:bg-secondary-light my-3" />
                </div>

                {editor ? <EditLink editor={editor} /> : null}
                <EditorContent editor={editor} className="min-h-[300px]" />
                <div className="h-[1px] w-full bg-secondary-dark dark:bg-secondary-light my-3" />
                {/* <SEOForm
                    onChange={updateSeoValue}
                    title={post.title}
                    initialValue={seoInitialValue}
                /> */}
            </div>

            <GalleryModal
                visible={showGallery}
                onClose={() => setShowGallery(false)}
                onSelect={handleImageSelection}
                images={images}
                onFileSelect={handleImageUpload}
                uploading={uploading}
            />
        </>
    );
};

export default Editor;
