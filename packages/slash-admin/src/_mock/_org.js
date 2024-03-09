import { rest } from 'msw';

import { OrgApi } from '../api/services/orgService';

import { ORG_LIST } from './assets';

const orgList = rest.get(`/api${OrgApi.Org}`, (req, res, ctx) => {
    return res(
        ctx.json({
            status: 0,
            message: '',
            data: ORG_LIST,
        }),
    );
});

export default [orgList];
