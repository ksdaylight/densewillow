import axios from 'axios';

describe('GET /posts on example db', () => {
    it('should return a message', async () => {
        const res = await axios.get(`api/posts`,{
            params:{
                skip: 0,
                take: 10,
            }
        });
        console.log(res);
        expect(res.status).toBe(200);
        expect(res.data).toEqual({
                posts: [],
                count: 0,
                skip: 0,
                take: 10,
            });
    });
});
