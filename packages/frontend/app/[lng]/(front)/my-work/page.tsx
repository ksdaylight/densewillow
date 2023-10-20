import { NextPage } from 'next';

import MyWorkClient from './work-client';

interface Props {
    params: {
        lng: string;
    };
}

const PortfolioMyWorks: NextPage<Props> = async ({ params }) => {
    return <MyWorkClient lng={params.lng} />;
};
export default PortfolioMyWorks;
