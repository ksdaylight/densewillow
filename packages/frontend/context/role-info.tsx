'use client';

import { FC, ReactNode, createContext, useContext, useState, useEffect } from 'react';

type UserInfoLocal = {
    id?: string;
    name?: string;
    avatar?: string;
    role: string;
};

type UserInfoContextType = {
    userInfoLocal: UserInfoLocal;
    setUserInfoLocal: (user: UserInfoLocal) => void;
};
export const RoleInfoContext = createContext<UserInfoContextType>({
    userInfoLocal: { role: 'guest' },
    setUserInfoLocal: (user: UserInfoLocal) => {},
});

// export const RoleInfoContext = createContext({});

export const UserRoleContextProvider: FC<{ children?: ReactNode }> = ({ children }) => {
    const [userInfo, setUserInfo] = useState({ role: 'guest' });
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setUserInfo(JSON.parse(storedUser));
            }
        }
    }, []);
    const handleSetUserInfoLocal = (user: UserInfoLocal) => {
        setUserInfo(user);
        localStorage.setItem('user', JSON.stringify(user));
    };
    return (
        <RoleInfoContext.Provider
            // eslint-disable-next-line react/jsx-no-constructed-context-values
            value={{ userInfoLocal: userInfo, setUserInfoLocal: handleSetUserInfoLocal }}
        >
            {children}
        </RoleInfoContext.Provider>
    );
};

export const useRoleInfoContext = () => useContext(RoleInfoContext);
