import { menuAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(menuAnatomy.keys);

// define the base component styles
const baseStyle = definePartsStyle({
    list: {
        bg: '#2d3748',
    },
    item: {
        color: 'white',
        _hover: {
            bg: '#51555e',
        },
        _focus: {
            bg: '#51555e',
        },
    },
});

export const menuTheme = defineMultiStyleConfig({ baseStyle });
