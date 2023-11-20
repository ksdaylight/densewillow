import { render, screen } from '@testing-library/react';
// import * as matchers from '@testing-library/jest-dom/matchers';
import CheckMark from '@frontend/components/common/CheckMark';

describe('Test tdd', () => {
    // expect.extend(matchers);
    it('should render an SVG element when visible', () => {
        render(<CheckMark visible />); // ARRANGE

        const svgElement = screen.getByTestId('test');

        expect(svgElement).toBeInTheDocument();
    });
});
