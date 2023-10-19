import { FC } from 'react';
import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    RedditShareButton,
} from 'next-share';

import { SlSocialFacebook } from 'react-icons/sl';
import { RiTwitterXFill } from 'react-icons/ri';
import { FaLinkedinIn } from 'react-icons/fa';
import { ImReddit } from 'react-icons/im';

interface Props {
    url: string;
    title?: string;
    quote?: string;
}

const Share: FC<Props> = ({ url, title, quote }): JSX.Element => {
    const iconDivClass =
        'group py-2 px-3 w-full bg-neutral-200 dark:bg-[#212137] rounded-md hover:bg-[#e8eefd] dark:hover:bg-neutral-600 duration-100 ease-in-out transition-colors';
    const iconClass =
        'group-hover:fill-primary transition-all duration-[0.3s]  fill-paragraph_light dark:fill-white';
    return (
        <div className="flex flex-row md:flex-col gap-5">
            <FacebookShareButton url={url} quote={quote} title={title}>
                <div className={iconDivClass}>
                    <SlSocialFacebook size={18} className={iconClass} />
                </div>
            </FacebookShareButton>

            <TwitterShareButton url={url} title={title}>
                <div className={iconDivClass}>
                    <RiTwitterXFill size={18} className={iconClass} />
                </div>
            </TwitterShareButton>

            <LinkedinShareButton url={url} source={quote} title={title}>
                <div className={iconDivClass}>
                    <FaLinkedinIn    size={18} className={iconClass} />
                </div>
            </LinkedinShareButton>

            <RedditShareButton url={url} title={title}>
                <div className={iconDivClass}>
                    <ImReddit size={18} className={iconClass} />
                </div>
            </RedditShareButton>
        </div>
    );
};

export default Share;
