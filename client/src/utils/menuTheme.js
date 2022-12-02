import { menuAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(menuAnatomy.keys);

// define the base component styles
const baseStyle = definePartsStyle({
    list: {
        bg: 'blackAlpha.900',
    },
    item: {
        color: 'white',
        _hover: {
            color: 'var(--primary-color)',
            bg: '#211826'
        },
        _focus: {
            color: 'var(--primary-color)',
            bg: "none"
        },
    },
});

export const menuTheme = defineMultiStyleConfig({ baseStyle });
