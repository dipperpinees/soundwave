import Song from '../Song';
import { Box, Heading, List, Flex, Text, Link, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { LineRightIcon, LineDownIcon } from '../Icon';
import { useLayoutEffect, useState } from 'react';
import fetchAPI from '../../utils/fetchAPI';

const FeaturedTracks = ({ currentUserId }) => {
    const [data, setData] = useState(null);

    useLayoutEffect(() => {
        const fetchSong = async () => {
            try {
                const data = await fetchAPI(`/user/${currentUserId}/songs`);
                setData(data);
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
            // case 'download'
            //     sortFunction = (a, b) => a.download > b.download;
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

    return (
        <Box>
            <Flex justifyContent="space-between">
                <Heading fontSize="xl">Featured Tracks</Heading>
                {data.length !== 0 && (
                    <Flex align={'center'}>
                        <Menu autoSelect="false">
                            <MenuButton as={Text} fontSize="md" cursor={'pointer'}>
                                <Flex align={'center'}>
                                    Sort <LineDownIcon />
                                </Flex>
                            </MenuButton>
                            <MenuList minW="20px">
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
                                {/* <MenuItem
                                onClick={() => {
                                    setTypeSort('download');
                                }}
                            >
                                Download
                            </MenuItem> */}
                            </MenuList>
                        </Menu>
                    </Flex>
                )}
            </Flex>
            <List>
                {data &&
                    data.map((song, index) => {
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
                                isLikeIcon={true}
                                isViewIcon={true}
                                borderBottom="1px solid rgba(255, 255, 255, 0.2)"
                            />
                        );
                    })}
            </List>
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
    );
};

export default FeaturedTracks;
