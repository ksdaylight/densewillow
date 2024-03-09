import { memo } from 'react';
import ApexChart from 'react-apexcharts';

import { useSettings } from '@turnit/admin/src/store/settingStore';
import { useThemeToken } from '@turnit/admin/src/theme/hooks';

import type { Props as ApexChartProps } from 'react-apexcharts';

import { StyledApexChart } from './styles';

const Chart = (props: ApexChartProps) => {
    const { themeMode } = useSettings();
    const theme = useThemeToken();
    return (
        <StyledApexChart $thememode={themeMode} $theme={theme}>
            <ApexChart {...props} />
        </StyledApexChart>
    );
};

export default memo(Chart);
