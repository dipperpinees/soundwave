import { Box, Flex, Heading, Text, Image, Link } from '@chakra-ui/react';

const CurrentSong = () => {
    return (
        <Flex>
            <Box boxSize="300px" bg="white" borderRadius={'10px'} overflow="hidden">
                {/* current song image */}
                <Image
                    src={
                        'https://images.macrumors.com/t/hi1_a2IdFGRGMsJ0x31SdD_IcRk=/1600x/article-new/2018/05/apple-music-note.jpg'
                    }
                    alt="song image"
                    boxSize="100%"
                    objectFit="cover"
                />
            </Box>
            <Flex flexDirection={'column'}>
                <Flex>
                    <Heading fontSize="3xl">Hãy Trao Cho Anh</Heading>
                    <Link fontSize={'3xl'}>Sơn Tùng M-TP</Link>
                </Flex>
                <Link href="#">
                    <Text size={'xs'}>user name</Text>
                </Link>
            </Flex>
        </Flex>
    );
};

export default CurrentSong;
