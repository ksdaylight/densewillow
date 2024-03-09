import { App } from 'antd';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { create } from 'zustand';

import { SignInReq } from '@slash-admin/src/api/services/userService';
import { getItem, removeItem, setItem } from '@slash-admin/src/utils/storage';

import { UserInfo, UserToken } from '@slash-admin/types/entity';
import { StorageEnum } from '@slash-admin/types/enum';

import { apiClient } from '../api/helps';

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

type UserStore = {
    userInfo: Partial<UserInfo>;
    userToken: UserToken;
    // 使用 actions 命名空间来存放所有的 action
    actions: {
        setUserInfo: (userInfo: UserInfo) => void;
        setUserToken: (token: UserToken) => void;
        clearUserInfoAndToken: () => void;
    };
};

const useUserStore = create<UserStore>((set) => ({
    userInfo: getItem<UserInfo>(StorageEnum.User) || {},
    userToken: getItem<UserToken>(StorageEnum.Token) || {},
    actions: {
        setUserInfo: (userInfo) => {
            set({ userInfo });
            setItem(StorageEnum.User, userInfo);
        },
        setUserToken: (userToken) => {
            set({ userToken });
            setItem(StorageEnum.Token, userToken);
        },
        clearUserInfoAndToken() {
            set({ userInfo: {}, userToken: {} });
            removeItem(StorageEnum.User);
            removeItem(StorageEnum.Token);
        },
    },
}));

export const useUserInfo = () => useUserStore((state) => state.userInfo);
export const useUserToken = () => useUserStore((state) => state.userToken);
export const useUserPermission = () => useUserStore((state) => state.userInfo.permissions);
export const useUserActions = () => useUserStore((state) => state.actions);

export const useSignIn = () => {
    const { t } = useTranslation();
    const navigatge = useNavigate();
    const { notification, message } = App.useApp();
    const { setUserToken, setUserInfo } = useUserActions();

    // const signInMutation = useMutation(userService.signin);
    const { mutateAsync } = apiClient.user.testSingIn.useMutation({
        onSuccess(res: any, _variables: any, _context: any) {
            // res = data2 as any as SignInRes;
            console.log(JSON.stringify(res));
            // const { user, accessToken, refreshToken } = res.body.data;
            // setUserToken({ accessToken, refreshToken });
            // if (user) setUserInfo(user);
            // navigatge(HOMEPAGE, { replace: true });

            // notification.success({
            //     message: t('sys.login.loginSuccessTitle'),
            //     description: `${t('sys.login.loginSuccessDesc')}: `, // ${data.username}`,
            //     duration: 3,
            // });
        },
        onError(err: any, _variables: any, _context: any) {
            console.log(err);
        },
        onSettled(data2: any) {
            console.log(data2);
        },
    });

    const signIn = async (data: SignInReq) => {
        try {
            // const res = await signInMutation.mutateAsync(data);
            const res = await mutateAsync({ body: data });
            // let res: SignInRes;
            // userTestMutate({
            //     body: { ...data },
            // });
            const { user, accessToken, refreshToken } = res.body.data;
            setUserToken({ accessToken, refreshToken });
            if (user) setUserInfo(user);
            navigatge(HOMEPAGE, { replace: true });

            notification.success({
                message: t('sys.login.loginSuccessTitle'),
                description: `${t('sys.login.loginSuccessDesc')}: ${data.username}`,
                duration: 3,
            });
        } catch (err) {
            message.warning({
                content: err.message,
                duration: 3,
            });
        }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    return useCallback(signIn, []);
};
