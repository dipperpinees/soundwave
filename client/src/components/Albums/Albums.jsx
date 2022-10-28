import Song from './Song';
import { Box, Heading, List, Text, Flex, Image, Link } from '@chakra-ui/react';
import { BsThreeDots } from 'react-icons/bs';
import { LineRightIcon, LikeIcon } from '../Icon';

// test data
import { data } from '../FeaturedTracks/dataTest';

const Albums = () => {
    return (
        <Box>
            <Heading fontSize="xl">Albums</Heading>
            <Flex justifyContent={'space-between'} mt={'16px'}>
                <Box flexBasis={'16%'}>
                    <Box boxSize="150px" bg="white" padding="4px">
                        {/* ảnh albums */}
                        <Image
                            src={
                                'https://images.macrumors.com/t/hi1_a2IdFGRGMsJ0x31SdD_IcRk=/1600x/article-new/2018/05/apple-music-note.jpg'
                            }
                            alt="song image"
                            boxSize="100%"
                            objectFit="cover"
                            borderRadius="full"
                        />
                    </Box>
                    <Flex justify={'space-between'} align={'center'} mt="8px">
                        <LikeIcon />
                        <BsThreeDots />
                    </Flex>
                </Box>
                <Box flexBasis={'79%'} ml={'16px'}>
                    <Heading as={'h2'} size={'sm'}>
                        Sense
                    </Heading>
                    <List>
                        {data.map((song, index) => {
                            /* hiển thị nhiều nhất 5 bài hát */
                            if (index >= 5) {
                                return null;
                            }
                            return (
                                <Song
                                    key={song.id}
                                    {...song}
                                    userName={'user name'}
                                    borderBottom="1px solid rgba(255, 255, 255, 0.2)"
                                />
                            );
                        })}
                    </List>
                    {/* nhiều hơn 5 bài hát sẽ hiện nút xem thêm */}
                    {data.length > 5 && (
                        <Flex justifyContent="end" mt="4px">
                            <Link href="#">
                                <Text mr="4px" fontSize="xs" display="inline-flex" alignItems="center" cursor="pointer">
                                    See more
                                    <LineRightIcon />
                                </Text>
                            </Link>
                        </Flex>
                    )}
                </Box>
            </Flex>
        </Box>
    );
};

export default Albums;