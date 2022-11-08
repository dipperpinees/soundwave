import Song from '../Song';
import { Box, Heading, List, Flex, Text, Link, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { data } from './dataTest';
import { useState } from 'react';
import { LineRightIcon, LineDownIcon, LineUpIcon } from '../Icon';

const FeaturedTracks = () => {
    const [isDownIcon, setDownIcon] = useState(true);

    // xử lý sắp xếp
    const handleSortSongList = (e) => {
        setDownIcon(!isDownIcon);
        console.log(e);
    };

    return (
        <Box>
            <Flex justifyContent="space-between">
                <Heading fontSize="xl">Featured Tracks</Heading>
                <Flex align={'center'}>
                    <Menu autoSelect="false">
                        <MenuButton
                            as={Text}
                            onClick={() => {
                                setDownIcon(!isDownIcon);
                            }}
                            fontSize="xs"
                        >
                            <Flex align={'center'}>Sort {isDownIcon ? <LineDownIcon /> : <LineUpIcon />}</Flex>
                        </MenuButton>
                        <MenuList bg={'#2d3748'} minW="20px">
                            <MenuItem
                                _hover={{
                                    'background-color': '#51555e',
                                }}
                                color={'#fff'}
                                onClick={() => {
                                    handleSortSongList('View');
                                }}
                            >
                                View
                            </MenuItem>
                            <MenuItem
                                _hover={{
                                    'background-color': '#51555e',
                                }}
                                color={'#fff'}
                                onClick={() => {
                                    handleSortSongList('Like');
                                }}
                            >
                                Like
                            </MenuItem>
                            <MenuItem
                                _hover={{
                                    'background-color': '#51555e',
                                }}
                                color={'#fff'}
                                onClick={() => {
                                    handleSortSongList('Download');
                                }}
                            >
                                Download
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </Flex>
            <List>
                {data.map((song, index) => {
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
    );
};

export default FeaturedTracks;
