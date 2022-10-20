import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    fonts: {
        heading: `'Be Vietnam Pro', sans-serif`,
        body: `'Be Vietnam Pro', sans-serif`,
    },
    colors: {
        primary: {
            500: '#F48004',
        },
    },
    breakpoints: {
        sm: '320px',
        md: '768px',
        lg: '960px',
        xl: '1200px',
        '2xl': '1536px',
    },
});

export default theme;
