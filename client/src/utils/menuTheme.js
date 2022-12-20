import { menuAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(menuAnatomy.keys);

// define the base component styles
const baseStyle = definePartsStyle({
    list: {
        bg: '#282828',
    },
    item: {
        bg: 'transparent',
        color: 'white',
        _hover: {
            bg: '#3E3E3E',
        },
        _focus: {
            bg: '#3E3E3E',
        },
    },
});

export const menuTheme = defineMultiStyleConfig({ baseStyle });
