import { extendTheme } from '@chakra-ui/react';
import { menuTheme } from './menuTheme';

const theme = extendTheme({
    fonts: {
        heading: `'Be Vietnam Pro', sans-serif`,
        body: `'Be Vietnam Pro', sans-serif`,
    },
    colors: {
        primary: {
            100: '#F48004',
            200: '#F48004',
            300: '#F48004',
            400: '#F48004',
            500: '#F48004',
            600: '#F48004',
            700: '#F48004',
            800: '#F48004',
            900: '#F48004',
        },
        text: '#74767a',
        hoverColor: 'rgba(255, 255, 255, 0.1)',
        primaryBorderColor: 'rgba(255, 255, 255, 0.2)',
    },
    fontSizes: {
        xs: '0.7rem',
        md: '1rem',
        xl: '1.5rem',
    },
    components: {
        Menu: menuTheme,
    },
});

export default theme;
