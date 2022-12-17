import Song from '../Song';
import { Box, Heading, List, Flex, Text, Link, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { LineRightIcon, LineDownIcon } from '../Icon';
import { useEffect, useState } from 'react';
import { ProfileSongSkeleton } from '../SquareSkeleton';

const PlaylistSongList = ({ songs, isLoading }) => {
    const [data, setData] = useState();

    useEffect(() => {
        setData(songs);
    }, [songs]);

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
            const newData = [...data];
            newData.sort(sortFn);
            setData(newData);
        }
    };

    return (
        <Box>
            <Flex justifyContent="space-between">
                <Heading fontSize={['1.2rem']}>Song List</Heading>
                {!isLoading && data?.length !== 0 && (
                    <Flex justifyItems={'flex-end'} align={'center'}>
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
                            </MenuList>
                        </Menu>
                    </Flex>
                )}
            </Flex>
            {!isLoading && data?.length === 0 && <Text>The playlist currently has no songs</Text>}
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
                {isLoading && [...Array(5).keys()].map((id) => <ProfileSongSkeleton key={id} />)}
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

export default PlaylistSongList;
