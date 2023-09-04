import parse, { Element } from 'html-react-parser';
import Image from 'next/image';
import { FC } from 'react';

interface Props {
    body: string;
}
const PostBody: FC<Props> = ({ body }): JSX.Element => {
    const options = {
        // eslint-disable-next-line react/no-unstable-nested-components, consistent-return
        replace: (domNode: any) => {
            if (domNode instanceof Element && domNode.attribs) {
                if (domNode.name === 'img') {
                    const { src, alt } = domNode.attribs;
                    return (
                        <Image
                            className="object-cover object-center w-full my-3 rounded-md h-auto max-h-[300px] md:max-h-[500px]"
                            src={src}
                            alt={alt}
                            width={1280}
                            height={620}
                        />
                    );
                }
            }
        },
    };

    const getParsedHTML = (bodyString: string) => {
        return parse(bodyString, options);
    };

    return <div className="rich-text">{getParsedHTML(body)}</div>;
};

export default PostBody;
