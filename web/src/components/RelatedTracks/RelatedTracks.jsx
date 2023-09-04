import { Box, Flex, Heading, Icon, List } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import Slider from 'react-slick';
import fetchAPI from '../../utils/fetchAPI';
import Song from '../Song';
import SongPreview from '../SongPreview';
import { ProfileSongSkeleton } from '../SquareSkeleton';

const RelatedTracks = ({ id }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const getListSong = async () => {
            try {
                const data = await fetchAPI(`/user/${id}/songs`);
                setData(data);
            } catch (e) {}
        };
        if (id !== undefined) getListSong();
    }, [id]);

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: (
            <Icon _hover={{ color: 'var(--primary-color)' }} boxSize={'20px'} as={AiOutlineRight} color={'white'} />
        ),
        prevArrow: (
            <Icon _hover={{ color: 'var(--primary-color)' }} boxSize={'20px'} as={AiOutlineLeft} color={'white'} />
        ),
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                },
            },
        ],
    };

    return (
        <Box>
            <Flex justifyContent="space-between" align={'center'}>
                <Heading lineHeight={'100%'} fontSize="lg">
                    Related Tracks
                </Heading>
            </Flex>
            <List display={['none', 'none', 'block']}>
                {data
                    ? data.map((song, index) => {
                          if (index >= 5) {
                              return null;
                          }
                          return <Song key={song.id} index={index} setData={setData} data={data} />;
                      })
                    : [...Array(5).keys()].map((id) => <ProfileSongSkeleton key={id} />)}
            </List>
            <Box p={'24px 0'} display={['block', 'block', 'none']}>
                {data &&
                    (data.length > 3 ? (
                        <Box p={['0 20px']}>
                            <Slider {...settings}>
                                {data &&
                                    data.map((song, index) => {
                                        if (index >= 5) {
                                            return null;
                                        }
                                        return (
                                            <Box p={['0 4px', '0 8px']}>
                                                <SongPreview key={index} song={song} />
                                            </Box>
                                        );
                                    })}
                            </Slider>
                        </Box>
                    ) : (
                        <Flex gap={['12px', '24px']}>
                            {data.map((song, index) => (
                                <Box flex={['33.33%']} maxWidth={'33.33%'}>
                                    <SongPreview key={index} song={song} />
                                </Box>
                            ))}
                        </Flex>
                    ))}
            </Box>
        </Box>
    );
};

export default RelatedTracks;
