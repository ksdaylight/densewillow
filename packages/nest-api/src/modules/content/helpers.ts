import { ConfigureFactory, ConfigureRegister } from '../core/types';

import { ContentConfig } from './types';

export const createContentConfig: (
    register: ConfigureRegister<Partial<ContentConfig>>,
) => ConfigureFactory<Partial<ContentConfig>, ContentConfig> = (register) => ({
    register,
    defaultRegister: () => ({}),
});
