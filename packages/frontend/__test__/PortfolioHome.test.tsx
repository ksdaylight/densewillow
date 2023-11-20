import { render, screen } from '@testing-library/react';
// import * as matchers from '@testing-library/jest-dom/matchers';
import MyBlogsClient from '@frontend/app/[lng]/(front)/blogs/blog-client';

describe('Home', () => {
    // expect.extend(matchers);
    it('should have Docs text', () => {
        render(<MyBlogsClient lng="en" />); // ARRANGE

        const myElem = screen.getByText('test'); // ACT

        expect(myElem).toBeInTheDocument(); // ASSERT
    });
});
