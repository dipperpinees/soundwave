import Song from './Song';
import { useState, useCallback } from 'react';
import { Box, Heading, List, Text, Flex, Image } from '@chakra-ui/react';
import { RiHeartLine, RiHeartFill } from 'react-icons/ri';
import { BsThreeDots } from 'react-icons/bs';
import { data } from '../FeaturedTracks/dataTest';

const Albums = () => {
    const [likeIcon, setLikeIcon] = useState(false);

    const toggleLikeSong = useCallback(() => {
        setLikeIcon(!likeIcon);
    });

    return (
        <Box>
            <Heading fontSize="xl">Albums</Heading>
            <Flex justifyContent={'space-between'} mt={'16px'}>
                <Box flexBasis={'10%'}>
                    <Box boxSize="100px" bg="white" padding="4px">
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
                        <Box>
                            {likeIcon ? (
                                <RiHeartFill fontSize="24px" onClick={() => toggleLikeSong()} />
                            ) : (
                                <RiHeartLine fontSize="24px" onClick={() => toggleLikeSong()} />
                            )}
                        </Box>
                        <BsThreeDots />
                    </Flex>
                </Box>
                <Box flexBasis={'85%'}>
                    <Heading as={'h2'} size={'sm'}>
                        Sense
                    </Heading>
                    <List>
                        {data.map((song) => {
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
                </Box>
            </Flex>
        </Box>
    );
};

export default Albums;
