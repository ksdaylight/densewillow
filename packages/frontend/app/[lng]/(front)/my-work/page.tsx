import { NextPage } from 'next';

import MyWorkClient from './work-client';

interface Props {}

const PortfolioMyWorks: NextPage<Props> = async () => {
    return <MyWorkClient />;
};
export default PortfolioMyWorks;
