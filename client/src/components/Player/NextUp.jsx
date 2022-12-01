import {
    Drawer,
    DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader,
    DrawerOverlay, Input
} from '@chakra-ui/react';
import React from 'react';

export function NextUp({isOpen, toggleOpen}) {
    return (
        <>
            <Drawer isOpen={isOpen} onClose={toggleOpen} placement="right">
                <DrawerOverlay />
                <DrawerContent bgColor="blackAlpha.800" color="white">
                    <DrawerCloseButton />
                    <DrawerHeader>Next up playlist</DrawerHeader>

                    <DrawerBody>
                    </DrawerBody>

                    
                </DrawerContent>
            </Drawer>
        </>
    );
}
