import { useCallback, useEffect } from 'react';

import { useUserToken } from '@turnit/admin/src/store/userStore';

import { useRouter } from '../hooks';

type Props = {
    children: React.ReactNode;
};
export default function AuthGuard({ children }: Props) {
    const router = useRouter();
    const { accessToken } = useUserToken();

    const check = useCallback(() => {
        if (!accessToken) {
            router.replace('/login');
        }
    }, [router, accessToken]);

    useEffect(() => {
        check();
    }, [check]);

    return children;
}
