import { Flex, Link, Box, Text } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { RiHeartLine, RiHeartFill } from 'react-icons/ri';
import { BsThreeDots } from 'react-icons/bs';
import { LikeIcon } from '../Icon';

const Song = ({ ...props }) => {
    const { borderBottom } = props;
    const { id, songName } = props;

    return (
        <Box id={id} borderBottom={borderBottom} padding="4px 0">
            <Flex h="36px" overflow="hidden" justify={'space-between'} align={'center'}>
                <Flex align={'end'}>
                    <Text fontSize="sm" mr={'16px'}>
                        1
                    </Text>
                    <Link href={'#'}>
                        <Text fontSize="sm">{songName}</Text>
                    </Link>
                </Flex>
                <Flex alignItems="center" margin="0 24px">
                    <LikeIcon />
                    <Box ml={'32px'}>
                        <BsThreeDots />
                    </Box>
                </Flex>
            </Flex>
        </Box>
    );
};

export default Song;
