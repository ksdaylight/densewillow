import { NextPage } from 'next';
import { useRouter } from 'next/router';

interface Props {}

const MyNextCoolPageID: NextPage<Props> = () => {
    const router = useRouter();
    console.log(router);
    return <div>MyNextCoolPageID</div>;
};

export default MyNextCoolPageID;
