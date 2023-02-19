import Song from '../Song';
import { Box, Heading, List, Flex, Text, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { LineRightIcon, LineDownIcon } from '../Icon';
import { useEffect, useState } from 'react';
import fetchAPI from '../../utils/fetchAPI';
import { ProfileSongSkeleton } from '../SquareSkeleton';
import { Link } from 'react-router-dom';

const FeaturedTracks = ({ currentUserId }) => {
    const [data, setData] = useState(null);
    const [paginate, setPaginate] = useState({ page: 1, totalPages: 1 });
    useEffect(() => {
        const fetchSong = async () => {
            try {
                const data = await fetchAPI(`/user/${currentUserId}/songs`);
                setData(data);
                setPaginate({page: 1, totalPages: Math.ceil(data.length / 5)})
            } catch (e) {}
        };
        fetchSong();
    }, [currentUserId]);

    const sortSongs = (typeSort) => {
        let sortFn;
        switch (typeSort) {
            case 'view':
                sortFn = (a, b) => b.playCount - a.playCount;
                break;
            case 'like':
                sortFn = (a, b) => b.likeNumber - a.likeNumber;
                break;
            default:
                sortFn = (a, b) => 0;
                break;
        }
        if (data) {
            let newData = [...data];
            newData.sort(sortFn);
            setData(newData);
        }
    };

    const handleSeeMore = () => {
        if (paginate.page === paginate.totalPages) return;
        const newPage = paginate.page + 1;
        setPaginate({...paginate, page: newPage});
    }

    return (
        <Box>
            <Flex justifyContent="space-between">
                {/* featured tracks heading */}
                <Heading fontSize={['1.5rem']}>Featured Tracks</Heading>
                {data?.length !== 0 && (
                    <Flex align={'center'}>
                        <Menu autoSelect="false">
                            <MenuButton as={Text} fontSize="md" cursor={'pointer'}>
                                <Flex align={'center'}>
                                    Sort <LineDownIcon />
                                </Flex>
                            </MenuButton>
                            <MenuList minW={24} border="none" fontSize="0.875rem">
                                <MenuItem
                                    onClick={() => {
                                        sortSongs('view');
                                    }}
                                >
                                    View
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        sortSongs('like');
                                    }}
                                >
                                    Like
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                )}
            </Flex>
            {/* featured tracks song list */}
            <List>
                {data
                    ? data.slice(0, 5 * (paginate.page - 1) + 5).map((song, index) => {
                          return (
                              <Song
                                  key={song.id}
                                  index={index}
                                  data={data}
                                  setData={setData}
                                  userName={'user name'}
                                  isLikeIcon={true}
                                  isViewIcon={true}
                                  borderBottom="1px solid rgba(255, 255, 255, 0.2)"
                              />
                          );
                      })
                    : [...Array(5).keys()].map((id) => <ProfileSongSkeleton key={id} />)}
            </List>
            {data?.length === 0 && <Text>The user currently has no songs</Text>}
            {data && data.length > 5 && (
                <Flex justifyContent="end" mt="4px">
                    <Link to="">
                        {paginate.page < paginate.totalPages && <Text mr="4px" fontSize="xs" display="inline-flex" alignItems="center" cursor="pointer" onClick={handleSeeMore}>
                            See more
                            <LineRightIcon />
                        </Text>}
                    </Link>
                </Flex>
            )}
        </Box>
    );
};

export default FeaturedTracks;
