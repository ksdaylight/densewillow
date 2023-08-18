import { UserRoleContextProvider } from '../context/role-info';
import Providers from '../utils/provider';

import './global.css';

// export const metadata = {
//     title: 'Welcome to admin',
//     description: 'Generated by create-nx-workspace',
// }; // TODO HEAD not work, next video

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en">
            <body>
                <Providers>
                    <UserRoleContextProvider>{children}</UserRoleContextProvider>
                </Providers>
            </body>
        </html>
    );
};

export default RootLayout;
