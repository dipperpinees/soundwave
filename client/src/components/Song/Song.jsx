import { Flex, Image, Box, Text, Icon } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Song = () => {
    return (
        <Flex>
            <Box boxSize="42px" bg="white" padding="4px">
                <Image
                    src="https://images.macrumors.com/t/hi1_a2IdFGRGMsJ0x31SdD_IcRk=/1600x/article-new/2018/05/apple-music-note.jpg"
                    alt="song image"
                    boxSize="100%"
                    objectFit="cover"
                    borderRadius="full"
                />
            </Box>
            <Box ml={2} flex="1">
                <Text fontSize="md">Hãy trao cho anh</Text>
                <Text fontSize="xs">Sơn Tùng - Sơn Tùng MTP</Text>
            </Box>
            <Box>{/* <FontAwesomeIcon icon="fa-regular fa-heart" /> */}</Box>
        </Flex>
    );
};

export default Song;
