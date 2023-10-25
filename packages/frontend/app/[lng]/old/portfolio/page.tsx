import { NextPage } from 'next';

import PortfolioClient from './portfolio';

interface Props {}

const Portfolio: NextPage<Props> = async () => {
    return <PortfolioClient />;
};

export default Portfolio;
