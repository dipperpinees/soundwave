import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Input,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import { PlayerContext } from '../../stores';
import Song from '../Song';

export function NextUp({ isOpen, toggleOpen }) {
    const [{ songList, indexSongPlayed, isPlayed }, setPlayer] = useContext(PlayerContext);
    return (
        <>
            <Drawer isOpen={isOpen} onClose={toggleOpen} placement="right">
                <DrawerOverlay />
                <DrawerContent bgColor="blackAlpha.800" color="white">
                    <DrawerCloseButton />
                    <DrawerHeader>Next up playlist</DrawerHeader>

                    <DrawerBody>
                        {songList.map((song) => (
                            <Song
                                key={song.id}
                                index={1}
                                data={songList}
                                userName={'user name'}
                                borderBottom="1px solid rgba(255, 255, 255, 0.2)"
                            />
                        ))}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
}
