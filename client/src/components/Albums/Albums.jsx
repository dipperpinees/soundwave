import Song from './Song';
import { Box, Heading, List, Text, Flex, Image, Link } from '@chakra-ui/react';
import { BsThreeDots } from 'react-icons/bs';
import { LineRightIcon, LikeIcon } from '../Icon';
import { useEffect, useState } from 'react';
import fetchAPI from '../../utils/fetchAPI';

const Albums = ({ userId }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const data = await fetchAPI(`/user/${userId}/songs`);
                setData(data);
            } catch (e) {}
        })();
    }, [userId]);

    return (
        <Box>
            <Heading fontSize="xl">Albums</Heading>
            <Flex justifyContent={'space-between'} mt={'16px'}>
                <Box flexBasis={'16%'}>
                    <Box boxSize="150px" bg="white" borderRadius="10px" overflow={'hidden'}>
                        {/* ảnh albums */}
                        <Image
                            src={
                                'https://images.macrumors.com/t/hi1_a2IdFGRGMsJ0x31SdD_IcRk=/1600x/article-new/2018/05/apple-music-note.jpg'
                            }
                            alt="song image"
                            boxSize="100%"
                            objectFit="cover"
                        />
                    </Box>
                    <Flex justify={'space-between'} align={'center'} mt="8px">
                        <LikeIcon />
                        <BsThreeDots />
                    </Flex>
                </Box>
                <Box width={['79%']} flexBasis={'79%'} ml={'16px'}>
                    <Heading as={'h2'} size={'sm'}>
                        Sense
                    </Heading>
                    <List>
                        {data &&
                            data.map((song, index) => {
                                /* hiển thị nhiều nhất 5 bài hát */
                                if (index >= 5) {
                                    return null;
                                }
                                return (
                                    <Song
                                        key={song.id}
                                        number={index}
                                        {...song}
                                        userName={'user name'}
                                        borderBottom="1px solid rgba(255, 255, 255, 0.2)"
                                    />
                                );
                            })}
                    </List>
                    {/* nhiều hơn 5 bài hát sẽ hiện nút xem thêm */}
                    {data && data.length > 5 && (
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
