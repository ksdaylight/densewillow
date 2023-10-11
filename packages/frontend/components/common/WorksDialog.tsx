import React, { FC, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import { LiaTimesSolid, LiaFlaskSolid } from 'react-icons/lia';
import { AiOutlineUser } from 'react-icons/ai';
import { PiCalendarCheckLight } from 'react-icons/pi';
import { BiLink } from 'react-icons/bi';

export type WorkInfo = {
    imgUrl: string;
    title: string;
    description: string;
    client: string;
    Completed: string;
    skill: string;
    project_link: string;
};
interface Props {
    workDialogIsOpen: boolean;
    workInfo?: WorkInfo;
    onOpenStatusChange: (isOpen: boolean) => void;
}

const WorksDialog: FC<Props> = ({
    workDialogIsOpen,
    workInfo,
    onOpenStatusChange,
}): JSX.Element => {
    return (
        <Transition show={workDialogIsOpen} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center py-8"
                open={workDialogIsOpen}
                onClose={onOpenStatusChange}
            >
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="max-w-[853px] bg-[#fff] dark:bg-secondary-dark mx-auto my-auto z-10 p-8 relative rounded-lg">
                        <div id="modal-body" className="static p-0">
                            <button
                                type="button"
                                className="absolute right-[10px] top-[10px] lg:right-[-23px] lg:top-[-23px] text-[22px] w-[46px] h-[46px] transition-all duration-[0.3s] rounded-[50%] hover:bg-white dark:hover:bg-[#0b2c80] border-none bg-secondary_gray_light dark:bg-secondary-dark outline-none flex items-center justify-center group"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={() => onOpenStatusChange(false)}
                            >
                                <LiaTimesSolid className="fill-black group-hover:fill-white dark:fill-white w-1/2 h-1/2" />
                            </button>
                            <Image
                                src={`${workInfo?.imgUrl || '/images/works/1.png'}`}
                                alt="work"
                                width={1053}
                                height={817}
                                className="w-full h-[unset] md:h-[532px] object-cover rounded-lg"
                            />
                            <div className="relative flex flex-wrap w-full min-w-0 h-auto">
                                <div className="lg:w-7/12 pl-0 lg:pr-8">
                                    <h2 className="mt-8 mb-4">{`${
                                        workInfo?.title || 'Antelope Canyon'
                                    }`}</h2>
                                    <p className="text-gray_light dark:text-gray">
                                        {`${
                                            workInfo?.description ||
                                            "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using'Content here, content here', making it look like readable EnglishIt is a long established fact that a reader will be"
                                        }`}
                                    </p>
                                </div>
                                <div className="lg:w-5/12  lg:pl-8 pr-0 pt-8 lg:pt-20">
                                    <div className="mb-3 flex items-center">
                                        <AiOutlineUser className="text-lg mr-0.5" />
                                        <span className="mr-1">Client:</span>
                                        <span className=" text-gray_light dark:text-gray">
                                            {`${workInfo?.client || 'Cheetah Academy'}`}
                                        </span>
                                    </div>
                                    <div className="mb-3 flex items-center">
                                        <PiCalendarCheckLight className="text-lg mr-0.5" />
                                        <span className="mr-1">Completed:</span>
                                        <span className="text-gray_light dark:text-gray">
                                            {`${workInfo?.Completed || 'Cheetah Academy'}`}
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <LiaFlaskSolid className="text-lg mr-0.5" />
                                        <span className="mr-1">Skills:</span>
                                        <span className="text-gray_light dark:text-gray">
                                            {`${workInfo?.skill || 'HTML, CSS, Javascript'}`}
                                        </span>
                                    </div>
                                    <div className="mt-4 flex items-center">
                                        <BiLink className="text-lg mr-0.5 fill-white no-underline" />
                                        <a
                                            href={`${workInfo?.project_link || '#'}`}
                                            className="text-white no-underline hover:underline"
                                        >
                                            Project link
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Transition.Child>
            </Dialog>
        </Transition>
    );
};

export default WorksDialog;
