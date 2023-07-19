import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
    function middleware(req) {
        // navigate our use
        NextResponse.rewrite(new URL(req.url));
    },
    {
        callbacks: {
            authorized({ token }) {
                return token?.role === 'admin';
            },
        },
    },
);

export const config = { matcher: ['/admin/:path*'] };
