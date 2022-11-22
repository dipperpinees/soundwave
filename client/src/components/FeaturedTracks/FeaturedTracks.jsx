import Song from '../Song';
import { Box, Heading, List, Flex, Text, Link, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { LineRightIcon, LineDownIcon } from '../Icon';
import { useEffect, useState } from 'react';
import fetchAPI from '../../utils/fetchAPI';

const FeaturedTracks = ({ userId }) => {
    const [data, setData] = useState(null);
    const [typeSort, setTypeSort] = useState();

    useEffect(() => {
        (async () => {
            try {
                const data = await fetchAPI(`/user/${userId}/songs`);
                setData(data);
            } catch (e) {}
        })();
    }, [userId]);

    useEffect(() => {
        let sortFn;
        switch (typeSort) {
            case 'view':
                sortFn = (a, b) => b.view - a.view;
                break;
            case 'like':
                sortFn = (a, b) => b.like - a.like;
                break;
            // case 'download'
            //     sortFunction = (a, b) => a.download > b.download;
            default:
                sortFn = (a, b) => 0;
                break;
        }
        data.sort(sortFn);
    }, [typeSort]);

    return (
        <Box>
            <Flex justifyContent="space-between">
                <Heading fontSize="xl">Featured Tracks</Heading>
                <Flex align={'center'}>
                    <Menu autoSelect="false">
                        <MenuButton as={Text} fontSize="xs">
                            <Flex align={'center'}>
                                Sort <LineDownIcon />
                            </Flex>
                        </MenuButton>
                        <MenuList minW="20px">
                            <MenuItem
                                onClick={() => {
                                    setTypeSort('view');
                                }}
                            >
                                View
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    setTypeSort('like');
                                }}
                            >
                                Like
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    setTypeSort('download');
                                }}
                            >
                                Download
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
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
                                {...song}
                                userName={'user name'}
                                isLikeIcon={true}
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
