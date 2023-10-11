'use client';

import React, { FC, useState } from 'react';

export type WorkInfo = {};
interface Props {}

const ContactForm: FC<Props> = (): JSX.Element => {
    const [focused, setFocused] = useState<Record<string, boolean>>({});

    const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name } = e.target;
        setFocused({
            ...focused,
            [name]: true,
        });
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name } = e.target;
        if (!e.target.value) {
            setFocused({
                ...focused,
                [name]: false,
            });
        }
    };

    const isFocused4Div = (name: string) => (focused[name] ? 'after:w-full' : '');
    const isFocused4Label = (name: string) => (focused[name] ? 'top-[-3px] text-xs' : 'top-[17px]');

    return (
        <form>
            <div className={`contact-form-item ${isFocused4Div('name')}`}>
                <label htmlFor="name" className={`${isFocused4Label('name')}`}>
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </div>
            <div className={`contact-form-item ${isFocused4Div('email')}`}>
                <label htmlFor="email" className={`${isFocused4Label('email')}`}>
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </div>
            <div className={`contact-form-item ${isFocused4Div('subject')}`}>
                <label htmlFor="subject" className={`${isFocused4Label('subject')}`}>
                    Subject
                </label>
                <input
                    type="text"
                    id="subject"
                    name="subject"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </div>
            <div className={`contact-form-item ${isFocused4Div('message')}`}>
                <label htmlFor="message" className={`${isFocused4Label('message')}`}>
                    Message
                </label>
                <textarea
                    id="message"
                    name="message"
                    defaultValue=""
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className="resize-none min-h-[171px]"
                />
            </div>
            <div className="text-right">
                <button
                    type="submit"
                    className="btn-custom-base bg-secondary_gray_light dark:bg-secondary-dark text-paragraph_light dark:text-white"
                >
                    Send message
                </button>
            </div>
        </form>
    );
};

export default ContactForm;
