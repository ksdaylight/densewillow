'use client';

import { FC, useEffect, useState } from 'react';
import StarterKit from '@tiptap/starter-kit';
import { EditorContent, getMarkRange, useEditor, Range } from '@tiptap/react';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import TipTapImage from '@tiptap/extension-image';

// import { apiClient, baseApiUrl } from 'packages/admin/app/admin/';

import { apiClient, baseApiUrl } from '../../app/admin/page';

// /app/admin/page';

import ToolBar from './ToolBar';
import EditLink from './Link/EditLink';
import Video from './Video';
import GalleryModal, { ImageSelectionResult } from './GalleryModal';

interface Props {}
// const imagesUrl = [
//     {
//         src: 'https://images.unsplash.com/photo-1664574654529-b60630f33fdb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
//     },
//     {
//         src: 'https://images.unsplash.com/photo-1664784805210-9fa665e2b7e9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
//     },
//     {
//         src: 'https://images.unsplash.com/photo-1664719772929-4e7265bb3c4f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
//     },
//     {
//         src: 'https://images.unsplash.com/photo-1664740688843-0e8ad76b07a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
//     },
//     {
//         src: 'https://images.unsplash.com/photo-1664725594423-3a221a3469ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
//     },
//     {
//         src: 'https://images.unsplash.com/photo-1664737426331-a1cde6c831d5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxM3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
//     },
//     {
//         src: 'https://images.unsplash.com/photo-1664575198263-269a022d6e14?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
//     },
//     {
//         src: 'https://images.unsplash.com/photo-1664745027113-0145831af78a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
//     },
//     {
//         src: 'https://images.unsplash.com/photo-1664750160078-254952b00ec0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
//     },
//     {
//         src: 'https://images.unsplash.com/photo-1664777415004-d83abf07a61a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
//     },
//     {
//         src: 'https://images.unsplash.com/photo-1664268531721-b3a29768467b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
//     },
//     {
//         src: 'https://images.unsplash.com/photo-1635774855317-edf3ee4463db?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
//     },
//     {
//         src: 'https://images.unsplash.com/photo-1604404157820-e90f6ff383b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
//     },
//     {
//         src: 'https://images.unsplash.com/photo-1453230806017-56d81464b6c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MnwzMzN8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
//     },
//     {
//         src: 'https://images.unsplash.com/photo-1415935701388-58a01402490d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NHwzMzN8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
//     },
//     {
//         src: 'https://images.unsplash.com/photo-1473881823110-d94cac66318a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTN8MTUxODk5fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
//     },
//     {
//         src: 'https://images.unsplash.com/photo-1664480169131-899eb1aae002?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDN8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
//     },
//     {
//         src: 'https://images.unsplash.com/photo-1664295776783-6e72b6ab1387?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDl8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
//     },
//     {
//         src: 'https://images.unsplash.com/photo-1664286423988-d742f1165f9a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDExfDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
//     },
//     {
//         src: 'https://images.unsplash.com/photo-1645474886991-032013802da0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE3fDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
//     },
//     {
//         src: 'https://images.unsplash.com/photo-1664021029310-bc881e4ebb22?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDIxfDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
//     },
//     {
//         src: 'https://images.unsplash.com/photo-1664091729644-07a158d7c4ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDI4fDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
//     },
//     {
//         src: 'https://images.unsplash.com/photo-1663667163173-b1c11c74bb49?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDM3fDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
//     },
//     {
//         src: 'https://images.unsplash.com/photo-1663657471161-30b3d75d82cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDM1fDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
//     },
// ];
const Editor: FC<Props> = (): JSX.Element => {
    const [selectionRange, setSelectionRange] = useState<Range>();
    const [showGallery, setShowGallery] = useState(false);
    // const [images, setImages] = useState<{ src: string }[]>([]);
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

    // const { data } = await axios('/api/image');
    // setImages(data.images);
    const { data } = apiClient.images.getImages.useQuery(['getAllImage', '1'], {
        query: {
            skip: String(0),
            take: String(10),
        },
    });

    const images =
        data?.body?.images.map((image) => ({
            src: `${baseApiUrl}/images/${image.id}${image.ext}`,
        })) || [];
    console.log(images);
    // setImages(imagesUrl);

    // useEffect(() => {
    //     fetchImages();
    // }, []);
    const handleImageUpload = async (image: File) => {
        setUploading(true);
        const formData = new FormData();
        formData.append('image', image);
        // const { data } = await axios.post('/api/image', formData);
        // const data = {
        //     src: 'https://images.unsplash.com/photo-1663657471161-30b3d75d82cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDM1fDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        // };
        setUploading(false);

        // setImages([data, ...images]);
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
