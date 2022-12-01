import Song from './Song';
import { Box, Heading, List, Text, Flex, Image, AspectRatio } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { BsThreeDots } from 'react-icons/bs';
import { LineRightIcon, LikeIcon } from '../Icon';
import { useEffect, useState } from 'react';
import fetchAPI from '../../utils/fetchAPI';

const Albums = ({ currentUserId }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const data = await fetchAPI(`/user/${currentUserId}/songs`);
                setData(data);
            } catch (e) {}
        })();
    }, [currentUserId]);

    return (
        <Box>
            <Heading fontSize="xl">Albums</Heading>
            <Flex flexWrap={['wrap', 'initial', 'initial']} justifyContent={'space-between'} mt={'16px'}>
                <Box flex={['100%', '16%']}>
                    {/* ảnh albums */}
                    <AspectRatio maxW={'150px'} ratio={'1'} borderRadius={10}>
                        <Image
                            src={
                                'https://images.macrumors.com/t/hi1_a2IdFGRGMsJ0x31SdD_IcRk=/1600x/article-new/2018/05/apple-music-note.jpg'
                            }
                            borderRadius={10}
                            alt="song image"
                            boxSize="100%"
                            objectFit="cover"
                        />
                    </AspectRatio>
                    <Flex justify={'space-between'} align={'center'} mt="8px">
                        <LikeIcon showLikeNumber={false} />
                        <BsThreeDots />
                    </Flex>
                </Box>
                <Box mt={['16px', '0']} flex={['100%', '79%']} maxW={['100%', '79%']} ml={['0', '16px']}>
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
                                        index={index}
                                        data={data}
                                        setData={setData}
                                        userName={'user name'}
                                        borderBottom="1px solid rgba(255, 255, 255, 0.2)"
                                    />
                                );
                            })}
                    </List>
                    {/* nhiều hơn 5 bài hát sẽ hiện nút xem thêm */}
                    {data && data.length > 5 && (
                        <Flex justifyContent="end" mt="4px">
                            <Link to={''}>
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
