'use client';

import { Hydrate as RQHydrate, HydrateProps } from '@tanstack/react-query';

const Hydrate = (props: HydrateProps) => {
    return <RQHydrate {...props} />;
};

export default Hydrate;
