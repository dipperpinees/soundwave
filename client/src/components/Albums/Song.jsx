import { Flex, Image, Box, Text, Center } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { RiHeartLine, RiHeartFill } from 'react-icons/ri';
import { BsThreeDots } from 'react-icons/bs';

const Song = ({ ...props }) => {
    const { borderBottom } = props;
    const { id, url_img, songName, singerName, userName } = props;

    const [likeIcon, setLikeIcon] = useState(false);

    const toggleLikeSong = useCallback(() => {
        setLikeIcon(!likeIcon);
    });

    return (
        <Box id={id} borderBottom={borderBottom} padding="4px 0">
            <Flex h="36px" overflow="hidden" justify={'space-between'} align={'center'}>
                <Flex align={'end'}>
                    <Text fontSize="sm" mr={'16px'}>
                        1
                    </Text>
                    <Text fontSize="sm">{songName}</Text>
                </Flex>
                <Flex alignItems="center" margin="0 24px">
                    {likeIcon ? (
                        <RiHeartFill fontSize="24px" onClick={() => toggleLikeSong()} />
                    ) : (
                        <RiHeartLine fontSize="24px" onClick={() => toggleLikeSong()} />
                    )}
                    <Box ml={'32px'}>
                        <BsThreeDots />
                    </Box>
                </Flex>
            </Flex>
        </Box>
    );
};

export default Song;
