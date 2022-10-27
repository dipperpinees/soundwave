import { Flex, Image, Box, Text } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { RiHeartLine, RiHeartFill } from 'react-icons/ri';

const Song = ({ ...props }) => {
    const { isLikeIcon } = props;
    const { borderBottom } = props;
    const { id, url_img, songName, singerName, userName } = props;

    const [likeIcon, setLikeIcon] = useState(false);

    const toggleLikeSong = useCallback(() => {
        setLikeIcon(!likeIcon);
    });

    return (
        <Box id={id} borderBottom={borderBottom} padding="12px 0">
            <Flex h="42px" overflow="hidden">
                <Box boxSize="42px" bg="white" padding="4px">
                    <Image src={url_img} alt="song image" boxSize="100%" objectFit="cover" borderRadius="full" />
                </Box>
                <Box ml={2} flex="1">
                    <Text fontSize="md">{songName}</Text>
                    <Text fontSize="xs">
                        {userName} - {singerName}
                    </Text>
                </Box>
                {isLikeIcon && (
                    <Flex alignItems="center" margin="0 24px">
                        {likeIcon ? (
                            <RiHeartFill fontSize="24px" onClick={() => toggleLikeSong()} />
                        ) : (
                            <RiHeartLine fontSize="24px" onClick={() => toggleLikeSong()} />
                        )}
                    </Flex>
                )}
            </Flex>
        </Box>
    );
};

export default Song;
