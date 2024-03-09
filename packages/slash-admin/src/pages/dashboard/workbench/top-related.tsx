import { Typography } from 'antd';

import Card from '@turnit/admin/src/components/card';
import { Iconify } from '@turnit/admin/src/components/icon';
import Scrollbar from '@turnit/admin/src/components/scrollbar';
import ProRate from '@turnit/admin/src/theme/antd/components/rage';
import ProTag from '@turnit/admin/src/theme/antd/components/tag';
import { useThemeToken } from '@turnit/admin/src/theme/hooks';

const dataSource = [
    {
        logo: <Iconify icon="logos:chrome" size={24} />,
        title: 'Chrome',
        platform: 'Mac',
        type: 'free',
        star: 4,
        reviews: '9.91k',
    },
    {
        logo: <Iconify icon="logos:google-drive" size={24} />,
        title: 'Drive',
        platform: 'Mac',
        type: 'free',
        star: 3.5,
        reviews: '1.95k',
    },
    {
        logo: <Iconify icon="logos:dropbox" size={24} />,
        title: 'Dropbox',
        platform: 'Windows',
        type: '$66.71',
        star: 4.5,
        reviews: '9.12k',
    },
    {
        logo: <Iconify icon="logos:slack-icon" size={24} />,
        title: 'Slack',
        platform: 'Mac',
        type: 'free',
        star: 3.5,
        reviews: '6.98k',
    },
    {
        logo: <Iconify icon="logos:discord-icon" size={24} />,
        title: 'Discord',
        platform: 'Windows',
        type: '$52.17',
        star: 0.5,
        reviews: '8.49k',
    },
];
export default function TopRelated() {
    const themeToken = useThemeToken();
    return (
        <Card className="flex-col">
            <header className="self-start">
                <Typography.Title level={5}>Top Related Applications</Typography.Title>
            </header>
            <main className="w-full">
                <Scrollbar>
                    {dataSource.map((item) => (
                        <div className="mb-4 flex" key={item.title}>
                            <div
                                className="mr-2 flex items-center justify-center"
                                style={{
                                    background: themeToken.colorBorderSecondary,
                                    borderRadius: '12px',
                                    width: '48px',
                                    height: '48px',
                                }}
                            >
                                {item.logo}
                            </div>

                            <div className="flex flex-col">
                                <span className="font-medium">{item.title}</span>
                                <div className="text-gray flex items-center justify-center">
                                    {item.platform === 'Mac' ? (
                                        <Iconify icon="wpf:mac-os" size={12} />
                                    ) : (
                                        <Iconify icon="mingcute:windows-fill" size={12} />
                                    )}
                                    <span className="mx-1 text-xs font-light">{item.platform}</span>
                                    <ProTag color={item.type === 'free' ? 'green' : 'red'}>
                                        {item.type}
                                    </ProTag>
                                </div>
                            </div>

                            <div className="ml-auto flex flex-col self-center">
                                <ProRate allowHalf disabled defaultValue={item.star} />
                                <span className="mt-1 text-right text-xs text-gray-400">
                                    {item.reviews}reviews
                                </span>
                            </div>
                        </div>
                    ))}
                </Scrollbar>
            </main>
        </Card>
    );
}
