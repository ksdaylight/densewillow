'use client';

import { PortfolioSidebar } from '@frontend/components/common/PortfolioSidebar';
import { FC, useEffect, useRef, useState } from 'react';
import Shuffle from 'shufflejs';
import Image from 'next/image';

import { isNil } from 'lodash';
import WorksDialog, { WorkInfo } from '@frontend/components/common/WorksDialog';
import { useTranslation } from '@frontend/app/i18n/client';

interface Props {
    lng?: string;
}
const MyWorkClient: FC<Props> = ({ lng }): JSX.Element => {
    const { t } = useTranslation(lng, 'my-works-page');
    const [currentGroup, setCurrentGroup] = useState('All');

    const shuffleRef = useRef<Shuffle | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [workDialogIsOpen, setWorkDialogIsOpen] = useState(false);
    const [workDialogInfo, setWorkDialogInfo] = useState<WorkInfo | null>(null);

    const handleWorkItemOnClick = (info?: WorkInfo) => {
        setWorkDialogInfo(info || null);
        setWorkDialogIsOpen(true);
    };

    const handleFilter = (group: string) => {
        setCurrentGroup(group);

        if (shuffleRef.current) {
            if (group === 'All') {
                shuffleRef.current.filter();
            } else {
                shuffleRef.current.filter((element) => {
                    const groups = JSON.parse(element.getAttribute('data-groups') || '[]');
                    return groups.includes(group);
                });
            }
        }
    };

    useEffect(() => {
        if (isNil(containerRef.current)) return;
        shuffleRef.current = new Shuffle(containerRef.current, {
            itemSelector: '.js-item',
        });

        // eslint-disable-next-line consistent-return
        return () => {
            if (shuffleRef.current) {
                shuffleRef.current.destroy();
            }
        };
    }, []);
    return (
        <>
            <PortfolioSidebar
                activeItem="/my-work"
                className={`${workDialogIsOpen ? 'blur-sm' : 'blur-none'}`}
                lng={lng}
            />
            <main className="pl-0 pt-[50px] md:pl-[102px] md:pt-0 ">
                <section
                    id="work"
                    className={`block ${workDialogIsOpen ? 'blur-sm' : 'blur-none'} pt-[64px]`}
                >
                    <div className="text-center">
                        <header className="header-has-bg">
                            <Image
                                src="/images/h1-bg-light.png"
                                alt="h1 bg"
                                width={166}
                                height={75}
                                className="dark:hidden"
                            />
                            <Image
                                src="/images/h1-bg.png"
                                alt="h1 bg"
                                width={166}
                                height={75}
                                className="hidden dark:block"
                            />
                            <h1>{t('my-work')}</h1>
                        </header>
                    </div>
                    <div className="text-center mt-[81px] mb-[55px]">
                        <button
                            className={`mx-2 px-4 py-2 border-none mb-4 ${
                                currentGroup === 'Project-Overview'
                                    ? 'rounded-lg bg-secondary_gray_light dark:bg-secondary-dark text-[#fff]'
                                    : 'rounded-none bg-transparent text-secondary_gray'
                            }`}
                            onClick={() => handleFilter('Project-Overview')}
                        >
                            <h4
                                className={
                                    currentGroup === 'Project-Overview'
                                        ? 'text-paragraph_light dark:text-[#fff]'
                                        : 'text-gray_light dark:text-secondary_gray'
                                }
                            >
                                {t('project-overview')}
                            </h4>
                        </button>
                        <button
                            className={`mx-2 px-4 py-2 border-none mb-4 ${
                                currentGroup === 'Back-End'
                                    ? 'rounded-lg bg-secondary_gray_light dark:bg-secondary-dark text-[#fff]'
                                    : 'rounded-none bg-transparent text-secondary_gray'
                            }`}
                            onClick={() => handleFilter('Back-End')}
                        >
                            <h4
                                className={
                                    currentGroup === 'Back-End'
                                        ? 'text-paragraph_light dark:text-[#fff]'
                                        : 'text-gray_light dark:text-secondary_gray'
                                }
                            >
                                {t('back-end')}
                            </h4>
                        </button>
                        <button
                            className={`mx-2 px-4 py-2 border-none mb-4 ${
                                currentGroup === 'Front-End'
                                    ? 'rounded-lg bg-secondary_gray_light dark:bg-secondary-dark text-[#fff]'
                                    : 'rounded-none bg-transparent text-secondary_gray'
                            }`}
                            onClick={() => handleFilter('Front-End')}
                        >
                            <h4
                                className={
                                    currentGroup === 'Front-End'
                                        ? 'text-paragraph_light dark:text-[#fff]'
                                        : 'text-gray_light dark:text-secondary_gray'
                                }
                            >
                                {t('front-end')}
                            </h4>
                        </button>
                        <button
                            className={`mx-2 px-4 py-2 border-none mb-4 ${
                                currentGroup === 'All'
                                    ? 'rounded-lg bg-secondary_gray_light dark:bg-secondary-dark text-[#fff]'
                                    : 'rounded-none bg-transparent text-secondary_gray'
                            }`}
                            onClick={() => handleFilter('All')}
                        >
                            <h4
                                className={
                                    currentGroup === 'All'
                                        ? 'text-paragraph_light dark:text-[#fff]'
                                        : 'text-gray_light dark:text-secondary_gray'
                                }
                            >
                                {t('all-works')}
                            </h4>
                        </button>
                    </div>
                    <div className="container mx-auto">
                        <div
                            ref={containerRef}
                            id="work-items"
                            className="flex flex-wrap w-3/4 min-w-0 h-auto mx-auto"
                        >
                            <div
                                className="w-full md:w-1/2 lg:w-1/3 px-3 py-3 js-item"
                                data-groups='["Project-Overview"]'
                                onClick={() => {
                                    handleWorkItemOnClick({
                                        imgUrl: '/images/works/hini-overview.png',
                                        title: t('title-hi-ni'),
                                        description: t('description-hi-ni'),
                                        completed: t('completed-in-Sustaining'),
                                        skill: 'NestJS,Next.js, Vben, TypeScript, CI/CD',
                                        backend_link: 'https://hi-ni-admin.densewillow.com/',
                                        frontend_link: 'https://hi-ni.densewillow.com/',
                                    });
                                }}
                            >
                                <div className="work-item-wrap">
                                    <Image
                                        src="/images/works/hini-overview.png"
                                        alt="work"
                                        width={1053}
                                        height={817}
                                        className="w-full opacity-50 cursor-pointer rounded-lg"
                                    />
                                </div>
                            </div>
                            <div
                                className="w-full md:w-1/2 lg:w-1/3 px-3 py-3 js-item"
                                data-groups='["Back-End"]'
                                onClick={() => {
                                    handleWorkItemOnClick({
                                        imgUrl: '/images/works/hi-ni-admin.png',
                                        title: t('title-hi-ni-backend'),
                                        description: t('description-hi-ni-backend'),
                                        completed: t('completed-in-Sustaining'),
                                        skill: 'NestJS, TypeORM, Fastify, WebSocket, MySQL, Passport, JWT, BullMQ, Jest, Log4js',
                                        backend_link: 'https://hi-ni-admin.densewillow.com/',
                                    });
                                }}
                            >
                                <div className="work-item-wrap">
                                    <Image
                                        src="/images/works/hi-ni-admin.png"
                                        alt="work"
                                        width={1053}
                                        height={817}
                                        className="w-full opacity-50 cursor-pointer rounded-lg"
                                    />
                                </div>
                            </div>
                            <div
                                className="w-full md:w-1/2 lg:w-1/3 px-3 py-3 js-item"
                                data-groups='["Front-End"]'
                                onClick={() => {
                                    handleWorkItemOnClick({
                                        imgUrl: '/images/works/hini-frontend.png',
                                        title: t('title-hi-ni-frontend'),
                                        description: t('description-hi-ni-frontend'),
                                        completed: t('completed-in-Sustaining'),
                                        skill: 'Next.js,TailwindCSS, Redux Toolkit, Ant Design Mobile, MUI, SWR, i18next, ESLint, Prettier, Jest',
                                        frontend_link: 'https://hi-ni.densewillow.com/',
                                    });
                                }}
                            >
                                <div className="work-item-wrap">
                                    <Image
                                        src="/images/works/hini-frontend.png"
                                        alt="work"
                                        width={1053}
                                        height={817}
                                        className="w-full opacity-50 cursor-pointer rounded-lg"
                                    />
                                </div>
                            </div>
                            <div
                                className="w-full md:w-1/2 lg:w-1/3 px-3 py-3 js-item"
                                data-groups='["Project-Overview"]'
                                onClick={() => {
                                    handleWorkItemOnClick({
                                        imgUrl: '/images/works/discount-overview.png',
                                        title: t('title-discount'),
                                        description: t('description-discount'),
                                        completed: t('completed-in-Sustaining'),
                                        skill: 'NestJS,Next.js, Ant Design Pro, TypeScript, CI/CD',
                                        frontend_link: 'https://discount.densewillow.com/',
                                        backend_link: 'https://admin-discount.densewillow.com/',
                                        test_account: 'u: admin p: @Aa123456',
                                    });
                                }}
                            >
                                <div className="work-item-wrap">
                                    <Image
                                        src="/images/works/discount-overview.png"
                                        alt="work"
                                        width={1053}
                                        height={817}
                                        className="w-full opacity-50 cursor-pointer rounded-lg"
                                    />
                                </div>
                            </div>
                            <div
                                className="w-full md:w-1/2 lg:w-1/3 px-3 py-3 js-item"
                                data-groups='["Back-End"]'
                                onClick={() => {
                                    handleWorkItemOnClick({
                                        imgUrl: '/images/works/discount-backend.png',
                                        title: t('title-discount-backend'),
                                        description: t('description-discount-backend'),
                                        completed: t('completed-in-Sustaining'),
                                        skill: 'NestJS, TypeORM, Fastify, MySQL, Passport, JWT, BullMQ, Jest',
                                        backend_link: 'https://admin-discount.densewillow.com/',
                                        test_account: 'u: admin p: @Aa123456',
                                    });
                                }}
                            >
                                <div className="work-item-wrap">
                                    <Image
                                        src="/images/works/discount-backend.png"
                                        alt="work"
                                        width={1053}
                                        height={817}
                                        className="w-full opacity-50 cursor-pointer rounded-lg"
                                    />
                                </div>
                            </div>
                            <div
                                className="w-full md:w-1/2 lg:w-1/3 px-3 py-3 js-item"
                                data-groups='["Front-End"]'
                                onClick={() => {
                                    handleWorkItemOnClick({
                                        imgUrl: '/images/works/discount-frontend.png',
                                        title: t('title-discount-frontend'),
                                        description: t('description-discount-frontend'),
                                        completed: t('completed-in-Sustaining'),
                                        skill: 'Next.js,TailwindCSS, MUI, DaisyUI, Ant Design, MobX, SWR, ESLint, Prettier, Jest',
                                        frontend_link: 'https://discount.densewillow.com/',
                                    });
                                }}
                            >
                                <div className="work-item-wrap">
                                    <Image
                                        src="/images/works/discount-frontend.png"
                                        alt="work"
                                        width={1053}
                                        height={817}
                                        className="w-full opacity-50 cursor-pointer rounded-lg"
                                    />
                                </div>
                            </div>
                            <div
                                className="w-full md:w-1/2 lg:w-1/3 px-3 py-3 js-item"
                                data-groups='["Project-Overview"]'
                                onClick={() => {
                                    handleWorkItemOnClick({
                                        imgUrl: '/images/works/storage-overview.png',
                                        title: t('title-storage'),
                                        description: t('description-storage'),
                                        completed: t('completed-in-Sustaining'),
                                        skill: 'NestJS,Next.js, Ant Design Pro, TypeScript, CI/CD',
                                        backend_link: 'https://storage.densewillow.com/',
                                        test_account: 'u: admin p: @Aa123456',
                                    });
                                }}
                            >
                                <div className="work-item-wrap">
                                    <Image
                                        src="/images/works/storage-overview.png"
                                        alt="work"
                                        width={1053}
                                        height={817}
                                        className="w-full opacity-50 cursor-pointer rounded-lg"
                                    />
                                </div>
                            </div>
                            <div
                                className="w-full md:w-1/2 lg:w-1/3 px-3 py-3 js-item"
                                data-groups='["Back-End"]'
                                onClick={() => {
                                    handleWorkItemOnClick({
                                        imgUrl: '/images/works/storage-overview.png',
                                        title: t('title-storage-backend'),
                                        description: t('description-storage-backend'),
                                        completed: t('completed-in-Sustaining'),
                                        skill: 'NestJS, TypeORM, Fastify, MySQL, Passport, JWT, BullMQ, Jest',
                                        backend_link: 'https://storage.densewillow.com/',
                                        test_account: 'u: admin p: @Aa123456',
                                    });
                                }}
                            >
                                <div className="work-item-wrap">
                                    <Image
                                        src="/images/works/storage-overview.png"
                                        alt="work"
                                        width={1053}
                                        height={817}
                                        className="w-full opacity-50 cursor-pointer rounded-lg"
                                    />
                                </div>
                            </div>
                            <div
                                className="w-full md:w-1/2 lg:w-1/3 px-3 py-3 js-item"
                                data-groups='["Project-Overview"]'
                                onClick={() => {
                                    handleWorkItemOnClick({
                                        imgUrl: '/images/works/yiming-overview.png',
                                        title: t('title-yiming'),
                                        description: t('description-yiming'),
                                        completed: t('completed-in-Progress'),
                                        skill: 'NestJS,Next.js, Ant Design Pro, TypeScript, CI/CD',
                                        backend_link: 'https://yiming.densewillow.com/admin/',
                                        frontend_link: 'https://yiming.densewillow.com/',
                                        test_account: 'u: admin p: @Aa123456',
                                    });
                                }}
                            >
                                <div className="work-item-wrap">
                                    <Image
                                        src="/images/works/yiming-overview.png"
                                        alt="work"
                                        width={1053}
                                        height={817}
                                        className="w-full opacity-50 cursor-pointer rounded-lg"
                                    />
                                </div>
                            </div>
                            <div
                                className="w-full md:w-1/2 lg:w-1/3 px-3 py-3 js-item"
                                data-groups='["Back-End"]'
                                onClick={() => {
                                    handleWorkItemOnClick({
                                        imgUrl: '/images/works/yiming-backend.png',
                                        title: t('title-yiming-backend'),
                                        description: t('description-yiming-backend'),
                                        completed: t('completed-in-Progress'),
                                        skill: 'NestJS, TypeORM, Fastify, MySQL, Passport, JWT, BullMQ, Jest',
                                        backend_link: 'https://yiming.densewillow.com/admin/',
                                        test_account: 'u: admin p: @Aa123456',
                                    });
                                }}
                            >
                                <div className="work-item-wrap">
                                    <Image
                                        src="/images/works/yiming-backend.png"
                                        alt="work"
                                        width={1053}
                                        height={817}
                                        className="w-full opacity-50 cursor-pointer rounded-lg"
                                    />
                                </div>
                            </div>
                            <div
                                className="w-full md:w-1/2 lg:w-1/3 px-3 py-3 js-item"
                                data-groups='["Front-End"]'
                                onClick={() => {
                                    handleWorkItemOnClick({
                                        imgUrl: '/images/works/yiming-frontend.png',
                                        title: t('title-yiming-frontend'),
                                        description: t('description-yiming-frontend'),
                                        completed: t('completed-in-Progress'),
                                        skill: 'Next.js,TailwindCSS, MUI, DaisyUI, Ant Design, MobX, SWR, i18next, ESLint, Prettier, Jest',
                                        frontend_link: 'https://yiming.densewillow.com/',
                                    });
                                }}
                            >
                                <div className="work-item-wrap">
                                    <Image
                                        src="/images/works/yiming-frontend.png"
                                        alt="work"
                                        width={1053}
                                        height={817}
                                        className="w-full opacity-50 cursor-pointer rounded-lg"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <WorksDialog
                    t={t}
                    workDialogIsOpen={workDialogIsOpen}
                    workInfo={workDialogInfo || undefined}
                    onOpenStatusChange={(isOpen: boolean) => {
                        setWorkDialogIsOpen(isOpen);
                    }}
                />
            </main>
        </>
    );
};

export default MyWorkClient;
