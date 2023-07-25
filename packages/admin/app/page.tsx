import { NextPage } from 'next';

import DefaultLayout from '../components/layout/DefaultLayout';

import Home from './home-page';

interface Props {}

const Index: NextPage<Props> = async () => {
    return (
        <DefaultLayout>
            <div className="pb-20">
                <Home />
            </div>
        </DefaultLayout>
    );
};

export default Index;
