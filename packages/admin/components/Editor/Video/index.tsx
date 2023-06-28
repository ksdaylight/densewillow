import { Node, mergeAttributes } from '@tiptap/core';
import { NodeViewRendererProps } from '@tiptap/react';

const Video = Node.create({
    name: 'video', // unique name for the Node
    group: 'block', // belongs to the 'block' group of extensions
    selectable: true, // so we can select the video
    draggable: true, // so we can drag the video
    atom: true, // is a single unit

    addAttributes() {
        return {
            src: {
                default: null,
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: 'video',
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return ['video', mergeAttributes(HTMLAttributes)];
    },

    addNodeView() {
        return ({ editor, node }: NodeViewRendererProps) => {
            const div = document.createElement('div');
            div.className = `aspect-w-16 aspect-h-9${editor.isEditable ? ' cursor-pointer' : ''}`;
            const iframe = document.createElement('iframe');
            if (editor.isEditable) {
                iframe.className = 'pointer-events-none';
            } else {
                iframe.className = 'pointer-events-auto';
            }
            iframe.width = '640';
            iframe.height = '360';
            // iframe.frameBorder = '0';
            iframe.allowFullscreen = true;
            iframe.src = node.attrs.src as string;
            div.append(iframe);
            return {
                dom: div,
            };
        };
    },
});

export default Video;
