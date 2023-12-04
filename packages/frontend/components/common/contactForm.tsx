'use client';

import { useTranslation } from '@frontend/app/i18n/client';
import { apiClient } from '@frontend/utils/helps';
import React, { FC, useState } from 'react';

interface Props {
    lng: string;
}

const ContactForm: FC<Props> = ({ lng }): JSX.Element => {
    const { t } = useTranslation(lng, 'contact-me-page');
    const [focused, setFocused] = useState<Record<string, boolean>>({});
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

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

    const { mutate: addContactMessageMutate } = apiClient.portfolio.addContactMessage.useMutation({
        onSuccess: (data, variables, context) => {
            // eslint-disable-next-line no-alert, no-restricted-globals
            const userConfirmed = confirm(t('send-success'));
            // 如果用户点击了"确定"，则刷新页面
            if (userConfirmed) {
                window.location.reload();
            }
        },
        onError: (error, variables, context) => {
            console.log(error);
            // eslint-disable-next-line no-alert
            alert(t('send-failed'));
        },
    });

    const handleNewContactMessageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // setSubmitting(true);
        addContactMessageMutate({
            body: {
                data: { ...formData },
            },
        });
        // setSubmitting(false);
    };
    return (
        <form onSubmit={handleNewContactMessageSubmit}>
            <div className={`contact-form-item ${isFocused4Div('name')}`}>
                <label htmlFor="name" className={`${isFocused4Label('name')}`}>
                    {t('name')}
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </div>
            <div className={`contact-form-item ${isFocused4Div('email')}`}>
                <label htmlFor="email" className={`${isFocused4Label('email')}`}>
                    {t('email')}
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </div>
            <div className={`contact-form-item ${isFocused4Div('subject')}`}>
                <label htmlFor="subject" className={`${isFocused4Label('subject')}`}>
                    {t('subject')}
                </label>
                <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </div>
            <div className={`contact-form-item ${isFocused4Div('message')}`}>
                <label htmlFor="message" className={`${isFocused4Label('message')}`}>
                    {t('message')}
                </label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
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
                    {t('send-message')}
                </button>
            </div>
        </form>
    );
};

export default ContactForm;
