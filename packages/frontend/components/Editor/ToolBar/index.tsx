import { FC } from 'react';
import { Editor } from '@tiptap/react';
import { AiFillCaretDown } from 'react-icons/ai';
import { RiDoubleQuotesL } from 'react-icons/ri';
import {
    BsTypeStrikethrough,
    BsBraces,
    BsCode,
    BsListOl,
    BsListUl,
    BsTypeBold,
    BsTypeItalic,
    BsTypeUnderline,
    BsImageFill,
} from 'react-icons/bs';

import DropdownOptions from '../../common/DropdownOptions';
import { getFocusedEditor } from '../EditorUtils';
import InsertLink from '../Link/InsertLink';
import { LinkOption } from '../Link/LinkForm';

import Button from './Button';
import EmbedVideo from './EmbedVideo';

interface Props {
    editor: Editor | null;
    onOpenImageClick?(): void;
}
const ToolBar: FC<Props> = ({ editor, onOpenImageClick }): JSX.Element | null => {
    if (!editor) return null;
    const options = [
        {
            label: 'Paragraph',
            onClick: () => getFocusedEditor(editor).setParagraph().run(),
        },
        {
            label: 'Heading 1',
            onClick: () => getFocusedEditor(editor).toggleHeading({ level: 1 }).run(),
        },
        {
            label: 'Heading 2',
            onClick: () => getFocusedEditor(editor).toggleHeading({ level: 2 }).run(),
        },
        {
            label: 'Heading 3',
            onClick: () => getFocusedEditor(editor).toggleHeading({ level: 3 }).run(),
        },
    ];

    const getLabel = (): string => {
        if (editor.isActive('heading', { level: 1 })) return 'Heading 1';
        if (editor.isActive('heading', { level: 2 })) return 'Heading 2';
        if (editor.isActive('heading', { level: 3 })) return 'Heading 3';

        return 'Paragraph';
    };
    const handleLinkSubmit = ({ url, openInNewTab }: LinkOption) => {
        const { commands } = editor;
        if (openInNewTab) commands.setLink({ href: url, target: '_blank' });
        else commands.setLink({ href: url });
    };

    // eslint-disable-next-line consistent-return
    const handleEmbedVideo = (input: string) => {
        // validate url is from youtube or vimeo
        if (!input.match(/youtube|bilibili/)) {
            // eslint-disable-next-line no-alert
            return alert('视频地址必须是 YouTube 或 bilibili 的嵌入视频地址');
        }
        const srcCheck = input.match(/src="(?<src>.+?)"/); // get the src value from embed code if all pasted in
        let src = srcCheck ? srcCheck.groups!.src : input; // use src or if just url in input use that
        // check youtube url is correct
        if (input.match(/youtube/) && !src.match(/^https:\/\/www\.youtube\.com\/embed\//)) {
            // eslint-disable-next-line no-alert
            return alert('YouTube嵌入视频地址必须以 https://www.youtube.com/embed/ 开头');
        }
        // check bilibili url is correct
        if (
            !src.match(
                /^(https:\/\/player\.bilibili\.com\/player\.html|\/\/player\.bilibili\.com\/player\.html).*/,
            )
        ) {
            // eslint-disable-next-line no-alert
            return alert(
                'Bilibili嵌入视频地址必须以 https://player.bilibili.com 或者 //player.bilibili.com 开头',
            );
        }

        // Add "https:" prefix if it's missing
        if (src.startsWith('//')) {
            src = `https:${src}`;
        }
        editor.chain().focus().insertContent(`<video src="${src}"></video>`).run();
    };

    // eslint-disable-next-line react/no-unstable-nested-components
    const Head = () => {
        return (
            <div className="flex items-center space-x-2 text-primary-dark dark:text-white">
                <p>{getLabel()}</p>
                <AiFillCaretDown />
            </div>
        );
    };

    return (
        <div className="flex items-center">
            <DropdownOptions options={options} head={<Head />} />
            <div className="h-4 w-[1px] bg-secondary-gray dark:bg-secondary-light mx-8" />

            <div className="flex items-center space-x-3">
                <Button
                    active={editor.isActive('bold')}
                    onClick={() => getFocusedEditor(editor).toggleBold().run()}
                >
                    <BsTypeBold />
                </Button>

                <Button
                    active={editor.isActive('italic')}
                    onClick={() => getFocusedEditor(editor).toggleItalic().run()}
                >
                    <BsTypeItalic />
                </Button>

                <Button
                    active={editor.isActive('underline')}
                    onClick={() => getFocusedEditor(editor).toggleUnderline().run()}
                >
                    <BsTypeUnderline />
                </Button>

                <Button
                    active={editor.isActive('strike')}
                    onClick={() => getFocusedEditor(editor).toggleStrike().run()}
                >
                    <BsTypeStrikethrough />
                </Button>
            </div>

            <div className="h-4 w-[1px] bg-secondary-gray dark:bg-secondary-light mx-8" />

            <div className="flex items-center space-x-3">
                <Button
                    active={editor.isActive('blockquote')}
                    onClick={() => getFocusedEditor(editor).toggleBlockquote().run()}
                >
                    <RiDoubleQuotesL />
                </Button>

                <Button
                    active={editor.isActive('code')}
                    onClick={() => getFocusedEditor(editor).toggleCode().run()}
                >
                    <BsCode />
                </Button>

                <Button
                    active={editor.isActive('codeBlock')}
                    onClick={() => getFocusedEditor(editor).toggleCodeBlock().run()}
                >
                    <BsBraces />
                </Button>

                <InsertLink onSubmit={handleLinkSubmit} />

                <Button
                    active={editor.isActive('orderedList')}
                    onClick={() => getFocusedEditor(editor).toggleOrderedList().run()}
                >
                    <BsListOl />
                </Button>

                <Button
                    active={editor.isActive('bulletList')}
                    onClick={() => getFocusedEditor(editor).toggleBulletList().run()}
                >
                    <BsListUl />
                </Button>
            </div>

            <div className="h-4 w-[1px] bg-secondary-gray dark:bg-secondary-light mx-8" />
            <div className="flex items-center space-x-3">
                <EmbedVideo onSubmit={handleEmbedVideo} />
                <Button onClick={onOpenImageClick}>
                    <BsImageFill />
                </Button>
            </div>
        </div>
    );
};

export default ToolBar;
