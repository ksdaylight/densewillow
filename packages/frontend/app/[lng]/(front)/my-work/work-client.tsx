'use client';

import { PortfolioSidebar } from '@frontend/components/common/PortfolioSidebar';
import { FC, useEffect, useRef, useState } from 'react';
import Shuffle from 'shufflejs';
import Image from 'next/image';

import { isNil } from 'lodash';
import WorksDialog, { WorkInfo } from '@frontend/components/common/WorksDialog';

interface Props {
    lng?: string;
}
const MyWorkClient: FC<Props> = ({ lng }): JSX.Element => {
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
                            <h1>My Work</h1>
                        </header>
                    </div>
                    <div className="text-center mt-[81px] mb-[55px]">
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
                                All
                            </h4>
                        </button>
                        <button
                            className={`mx-2 px-4 py-2 border-none mb-4 ${
                                currentGroup === 'Web Developing'
                                    ? 'rounded-lg bg-secondary_gray_light dark:bg-secondary-dark text-[#fff]'
                                    : 'rounded-none bg-transparent text-secondary_gray'
                            }`}
                            onClick={() => handleFilter('Web Developing')}
                        >
                            <h4
                                className={
                                    currentGroup === 'Web Developing'
                                        ? 'text-paragraph_light dark:text-[#fff]'
                                        : 'text-gray_light dark:text-secondary_gray'
                                }
                            >
                                Web Developing
                            </h4>
                        </button>
                        <button
                            className={`mx-2 px-4 py-2 border-none mb-4 ${
                                currentGroup === 'Video'
                                    ? 'rounded-lg bg-secondary_gray_light dark:bg-secondary-dark text-[#fff]'
                                    : 'rounded-none bg-transparent text-secondary_gray'
                            }`}
                            onClick={() => handleFilter('Video')}
                        >
                            <h4
                                className={
                                    currentGroup === 'Video'
                                        ? 'text-paragraph_light dark:text-[#fff]'
                                        : 'text-gray_light dark:text-secondary_gray'
                                }
                            >
                                Video
                            </h4>
                        </button>
                        <button
                            className={`mx-2 px-4 py-2 border-none mb-4 ${
                                currentGroup === 'SEO'
                                    ? 'rounded-lg bg-secondary_gray_light dark:bg-secondary-dark text-[#fff]'
                                    : 'rounded-none bg-transparent text-secondary_gray'
                            }`}
                            onClick={() => handleFilter('SEO')}
                        >
                            <h4
                                className={
                                    currentGroup === 'SEO'
                                        ? 'text-paragraph_light dark:text-[#fff]'
                                        : 'text-gray_light dark:text-secondary_gray'
                                }
                            >
                                SEO
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
                                data-groups='["Web Developing", "SEO"]'
                                onClick={() => {
                                    handleWorkItemOnClick();
                                }}
                            >
                                <div className="work-item-wrap">
                                    <Image
                                        src="/images/works/1.png"
                                        alt="work"
                                        width={1053}
                                        height={817}
                                        className="w-full opacity-50 cursor-pointer rounded-lg"
                                    />
                                </div>
                            </div>
                            <div
                                className="w-full md:w-1/2 lg:w-1/3 px-3 py-3 js-item"
                                data-groups='["Web Developing", "SEO"]'
                                onClick={() => {
                                    handleWorkItemOnClick({
                                        imgUrl: '/images/works/2.png',
                                        title: 'Antelope Canyon',
                                        description: `It is a long established fact that a reader will be distracted by the
                            readable content of a page when looking at its layout. The point of using
                            Lorem Ipsum is that it has a more-or-less normal distribution of letters, as
                            opposed to using 'Content here, content here', making it look like readable
                            English`,
                                        client: 'Cheetah Academy',
                                        Completed: 'December 29 2022',
                                        skill: 'HTML, CSS, Javascript TS',
                                        project_link: '#2',
                                    });
                                }}
                            >
                                <div className="work-item-wrap">
                                    <Image
                                        src="/images/works/2.png"
                                        alt="work"
                                        width={1053}
                                        height={817}
                                        className="w-full opacity-50 cursor-pointer rounded-lg"
                                    />
                                </div>
                            </div>
                            <div
                                className="w-full md:w-1/2 lg:w-1/3 px-3 py-3 js-item"
                                data-groups='["SEO", "Video"]'
                                onClick={() => {
                                    handleWorkItemOnClick();
                                }}
                            >
                                <div className="work-item-wrap">
                                    <Image
                                        src="/images/works/3.png"
                                        alt="work"
                                        width={1053}
                                        height={817}
                                        className="w-full opacity-50 cursor-pointer rounded-lg"
                                    />
                                </div>
                            </div>
                            <div
                                className="w-full md:w-1/2 lg:w-1/3 px-3 py-3 js-item"
                                data-groups='["SEO"]'
                                onClick={() => {
                                    handleWorkItemOnClick();
                                }}
                            >
                                <div className="work-item-wrap">
                                    <Image
                                        src="/images/works/4.png"
                                        alt="work"
                                        width={1053}
                                        height={817}
                                        className="w-full opacity-50 cursor-pointer rounded-lg"
                                    />
                                </div>
                            </div>
                            <div
                                className="w-full md:w-1/2 lg:w-1/3 px-3 py-3 js-item"
                                data-groups='["Web Developing"]'
                                onClick={() => {
                                    handleWorkItemOnClick();
                                }}
                            >
                                <div className="work-item-wrap">
                                    <Image
                                        src="/images/works/5.png"
                                        alt="work"
                                        width={1053}
                                        height={817}
                                        className="w-full opacity-50 cursor-pointer rounded-lg"
                                    />
                                </div>
                            </div>
                            <div
                                className="w-full md:w-1/2 lg:w-1/3 px-3 py-3 js-item"
                                data-groups='["Video", "SEO"]'
                                onClick={() => {
                                    handleWorkItemOnClick();
                                }}
                            >
                                <div className="work-item-wrap">
                                    <Image
                                        src="/images/works/6.png"
                                        alt="work"
                                        width={1053}
                                        height={817}
                                        className="w-full opacity-50 cursor-pointer rounded-lg"
                                    />
                                </div>
                            </div>
                            <div
                                className="w-full md:w-1/2 lg:w-1/3 px-3 py-3 js-item"
                                data-groups='["Video", "SEO"]'
                                onClick={() => {
                                    handleWorkItemOnClick();
                                }}
                            >
                                <div className="work-item-wrap">
                                    <Image
                                        src="/images/works/7.png"
                                        alt="work"
                                        width={1053}
                                        height={817}
                                        className="w-full opacity-50 cursor-pointer rounded-lg"
                                    />
                                </div>
                            </div>
                            <div
                                className="w-full md:w-1/2 lg:w-1/3 px-3 py-3 js-item"
                                data-groups='["Web Developing"]'
                                onClick={() => {
                                    handleWorkItemOnClick();
                                }}
                            >
                                <div className="work-item-wrap">
                                    <Image
                                        src="/images/works/8.png"
                                        alt="work"
                                        width={1053}
                                        height={817}
                                        className="w-full opacity-50 cursor-pointer rounded-lg"
                                    />
                                </div>
                            </div>
                            <div
                                className="w-full md:w-1/2 lg:w-1/3 px-3 py-3 js-item"
                                data-groups='["Web Developing"]'
                                onClick={() => {
                                    handleWorkItemOnClick();
                                }}
                            >
                                <div className="work-item-wrap">
                                    <Image
                                        src="/images/works/9.png"
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
