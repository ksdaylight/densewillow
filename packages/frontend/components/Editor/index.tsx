'use client';

import { ChangeEventHandler, FC, useEffect, useState } from 'react';
import StarterKit from '@tiptap/starter-kit';
import { EditorContent, getMarkRange, useEditor, Range } from '@tiptap/react';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import { MultipartFile } from '@fastify/multipart';
import { isNil } from 'lodash';
import TipTapImage from '@tiptap/extension-image';

// import { useRouter } from 'next/navigation';
import { useRouter } from 'next-nprogress-bar';
import { apiClient, publicApiUrl } from '@frontend/utils/helps';

import { AiFillCaretDown } from 'react-icons/ai';

import ActionButton from '../common/ActionButton';

import DropdownOptions, { DropDownOptions } from '../common/DropdownOptions';

import ToolBar from './ToolBar';
import EditLink from './Link/EditLink';
import Video from './Video';
import GalleryModal, { ImageSelectionResult } from './GalleryModal';
import SEOForm, { SeoResult } from './SeoForm';
import ThumbnailSelector from './ThumbnailSelector';

export interface FinalPost extends SeoResult {
    id?: string;
    title: string;
    content: string;
    thumbnail?: File | string;
}
interface Props {
    initialSlug?: string;
    btnTitle?: string;
    busy?: boolean;
    // onSubmit(post: FinalPost): void;
}

const Editor: FC<Props> = ({
    initialSlug,
    btnTitle = 'Submit',
    busy = false,
    // onSubmit,
}): JSX.Element => {
    const [selectionRange, setSelectionRange] = useState<Range>();
    const [postLng, setPostLng] = useState<string>('default');
    const [showGallery, setShowGallery] = useState(false);
    const [seoInitialValue, setSeoInitialValue] = useState<SeoResult>();
    const [post, setPost] = useState<FinalPost>({
        title: '',
        content: '',
        meta: '',
        tags: '',
        slug: '',
    });

    // const apiQueryClient = useTsRestQueryClient(apiClient);
    // const queryClientOriginal = useQueryClient(); // 改用refetch()

    const router = useRouter();

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

    const { data, refetch: refetchImages } = apiClient.images.getImages.useQuery(
        ['getAllImage', '1'],
        {
            query: {
                skip: String(0),
                take: String(20), // TODO 添加分页
            },
        },
        {
            staleTime: 60000,
        },
    );

    const images =
        data?.body?.images.map((image) => ({
            src: `${publicApiUrl}/images/${image.id}${image.ext}`,
        })) || [];

    const { mutate } = apiClient.images.uploadImage.useMutation({
        onSuccess: () => {
            setUploading(false);
            refetchImages();
            // queryClientOriginal.invalidateQueries(['getAllImage', '1']);
        },
    });
    const { mutate: createPostMutate } = apiClient.content.createPost.useMutation({
        onSuccess: () => {
            console.log('create success');
            router.push(`/admin/posts/update/${post.slug}`);
        },
    });
    const { mutate: updatePostMutate } = apiClient.content.updatePost.useMutation({
        onSuccess: () => {
            console.log('update success');
        },
    });
    const updateTitle: ChangeEventHandler<HTMLInputElement> = ({ target }) =>
        setPost({ ...post, title: target.value });
    const updateSeoValue = (result: SeoResult) => setPost({ ...post, ...result });
    const updateThumbnail = (file: File) => setPost({ ...post, thumbnail: file });

    const handleImageUpload = async (image: File) => {
        setUploading(true);
        // const formData = new FormData();
        // formData.append('image', image);
        mutate({ body: { image: image as any as MultipartFile } });
    };
    const handleSubmit = () => {
        if (!editor) return;

        // console.log({ ...post, content: editor.getHTML() });
        if (!isNil(initialSlug)) {
            if (!isNil(post.id)) {
                updatePostMutate({
                    body: {
                        id: post.id,
                        title: post.title,
                        content: editor.getHTML(),
                        image: post.thumbnail as any as MultipartFile,
                        slug: post.slug,
                        meta: post.meta,
                        tags: post.tags,
                        ...(postLng === 'default' ? {} : { lng: postLng }),
                    },
                });
            } else {
                console.log('id为空');
            }
        } else {
            createPostMutate({
                body: {
                    title: post.title,
                    content: editor.getHTML(),
                    image: post.thumbnail as any as MultipartFile,
                    slug: post.slug,
                    meta: post.meta,
                    tags: post.tags,
                    ...(postLng === 'default' ? {} : { lng: postLng }),
                    // .split(',')
                    // .map((tag: string) => tag.trim())
                    // .filter((tag: string) => tag.length > 0),
                },
            });
        }
    };
    const lngOptions: DropDownOptions = [
        {
            label: `Save as 'en'`,
            onClick: () => {
                setPostLng('en');
            },
        },
        {
            label: `Save as 'cn'`,
            onClick: () => {
                setPostLng('cn');
            },
        },
        // {
        //     label: 'Log out',
        //     // onClick: handleLogOut,
        // },
    ];
    useEffect(() => {
        if (editor && selectionRange) {
            editor.commands.setTextSelection(selectionRange);
        }
    }, [editor, selectionRange]);

    const { data: postData } = apiClient.content.getPostBySlug.useQuery(
        ['getPostBySlug', initialSlug || ''],
        {
            params: { slug: initialSlug || '' },
        },
        {
            enabled: false,
        },
    );

    useEffect(() => {
        if (!isNil(initialSlug) && !isNil(postData) && !isNil(postData.body)) {
            const {
                id,
                meta: postMeta,
                title,
                content,
                thumbnail: image,
                tags: postTags,
            } = postData.body;

            const initialValue = {
                id,
                title,
                content: content || '',
                tags: postTags.join(', '),
                thumbnail: !isNil(image) ? `${publicApiUrl}/images/${image.id}${image.ext}` : '',
                slug: initialSlug,
                meta: postMeta,
            };
            setPost({ ...initialValue });
            editor?.commands.setContent(initialValue.content);

            const { meta, slug, tags } = initialValue;
            setSeoInitialValue({ meta, slug, tags });
        }
    }, [initialSlug, editor, postData]);

    return (
        <>
            <div className="p-3 dark:bg-primary-dark bg-white transition">
                <div className="sticky top-0 z-10 dark:bg-primary-dark bg-white">
                    {/* Thumbnail Selector and Submit Button */}
                    <div className="flex items-center justify-between mb-3">
                        <ThumbnailSelector
                            initialValue={post.thumbnail as any as string}
                            onChange={updateThumbnail}
                        />
                        <div className="flex space-x-4">
                            <DropdownOptions
                                head={
                                    <div className="flex items-center">
                                        <span className="whitespace-nowrap">
                                            {`Save as '${postLng}'`}
                                        </span>
                                        {/* down icon */}
                                        <AiFillCaretDown className="text-primary-dark dark:text-white" />
                                    </div>
                                }
                                options={lngOptions}
                            />
                            <ActionButton busy={busy} title={btnTitle} onClick={handleSubmit} />
                        </div>
                    </div>
                    {/* Title Input */}
                    <input
                        type="text"
                        className="py-2 outline-none bg-transparent w-full border-0 border-b-[1px] border-secondary-gray dark:border-secondary-light text-3xl font-semibold italic text-primary-dark dark:text-white mb-3"
                        placeholder="Title"
                        onChange={updateTitle}
                        value={post.title}
                    />
                    <ToolBar editor={editor} onOpenImageClick={() => setShowGallery(true)} />
                    <div className="h-[1px] w-full bg-secondary-gray dark:bg-secondary-light my-3" />
                </div>

                {editor ? <EditLink editor={editor} /> : null}
                <EditorContent editor={editor} className="min-h-[300px]" />
                <div className="h-[1px] w-full bg-secondary-gray dark:bg-secondary-light my-3" />
                <SEOForm
                    onChange={updateSeoValue}
                    title={post.title}
                    initialValue={seoInitialValue}
                />
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
