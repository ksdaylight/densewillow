import Providers from '../utils/provider';

import './global.css';

export const metadata = {
    title: 'Welcome to admin',
    description: 'Generated by create-nx-workspace',
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en">
            <body>
                {/* <h1 className="tw-text-red-500"> the root layout</h1> */}
                <Providers>{children}</Providers>
            </body>
        </html>
    );
};

export default RootLayout;
