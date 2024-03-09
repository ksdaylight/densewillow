import { App as AntdApp } from 'antd';

import Router from '@turnit/admin/src/router/index';

import AntdConfig from '@turnit/admin/src/theme/antd';

import { MotionLazy } from './components/animate/motion-lazy';

const App = () => {
    return (
        <AntdConfig>
            <AntdApp>
                <MotionLazy>
                    <Router />
                </MotionLazy>
            </AntdApp>
        </AntdConfig>
    );
};

export default App;
