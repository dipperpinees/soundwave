import { Box, Avatar, Text, Flex, Menu, MenuButton, MenuItem, MenuList, Icon } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { AiFillLike } from 'react-icons/ai';
import { MdAccessTime, MdEdit } from 'react-icons/md';
import { TbMessageReport } from 'react-icons/tb';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../../stores';

const Comment = ({ isSubComment = false, initLikeNumber = 11, liked = false, ...props }) => {
    const [isLiked, hasLike] = useState(liked);
    const [likeNumber, setLikeNumber] = useState(++initLikeNumber);
    const { comments, index } = props;
    const comment = comments[index];
    const user = useContext(UserContext)[0];

    let date = comment?.updated_at?.split('T').at(0);
    date = date && date.split('-').reverse().join('/');

    useEffect(() => {
        isLiked ? setLikeNumber(likeNumber + 1) : setLikeNumber(likeNumber - 1);
    }, [isLiked]);

    return (
        <Flex mt={'8px'} pt="8px" pr={'16px'} borderTop="1px solid" borderTopColor={'primaryBorderColor'}>
            <Avatar size={'md'} src={comment?.author?.avatar} mr={'16px'} />
            <Box flex={1} overflow="auto">
                <Box m={'0 0 8px'} lineHeight={'100%'} fontSize={'1.3rem'}>
                    {comment && <Link to={`/profile/${comment.author.id}`}>{comment.author.name}</Link>}
                </Box>
                <Flex gap="4px" align={'center'} color={'text'}>
                    <MdAccessTime fontSize={'12px'} />
                    <Text fontSize={'0.7rem'}>{date}</Text>
                </Flex>
                <Text width={'100%'} fontSize={'sm'} mt={'8px'} color={'rgba(255, 255, 255, 0.9)'}>
                    {comment && comment.content}
                </Text>
                <Flex justifyContent={'flex-end'} color={'text'} mt={'16px'} flex={'1'}>
                    <Flex justify={'end'} gap="16px" fontSize={'sm'}>
                        {/* like */}
                        <Flex gap="4px" align={'center'}>
                            <Box onClick={() => hasLike(!isLiked)} cursor={'pointer'} mb={'4px'}>
                                {isLiked ? (
                                    <AiFillLike fontSize={'16px'} color={'white'} />
                                ) : (
                                    <AiFillLike fontSize={'16px'} />
                                )}
                            </Box>
                            {isLiked ? (
                                <Box minW={'16px'} color={'white'}>
                                    {likeNumber}
                                </Box>
                            ) : (
                                <Box minW={'16px'}>{likeNumber}</Box>
                            )}
                        </Flex>
                        <Flex
                            cursor={'pointer'}
                            gap="2px"
                            align={'center'}
                            boxSize={'34px'}
                            borderRadius={'full'}
                            justify="center"
                            _hover={{ background: 'hoverColor' }}
                        >
                            <Menu autoSelect="false">
                                <MenuButton fontSize="md" cursor={'pointer'}>
                                    <BsThreeDotsVertical fontSize={'20px'} />
                                </MenuButton>
                                <MenuList zIndex={'1000'} minW="20px" mt={'8px'} fontSize={'0.875rem'}>
                                    {!!user.id && user.id === comment.author.id ? (
                                        <MenuItem onClick={() => {}}>
                                            <Icon as={MdEdit} fontSize={'16px'} mr={'2px'} />
                                            edit
                                        </MenuItem>
                                    ) : (
                                        <MenuItem onClick={() => {}}>
                                            <Icon as={TbMessageReport} fontSize={'18px'} mr={'2px'} />
                                            report
                                        </MenuItem>
                                    )}
                                    {/* <MenuItem display={['initial', 'initial', 'none']}>Download</MenuItem> */}
                                </MenuList>
                            </Menu>
                        </Flex>
                        {/* more menu */}
                    </Flex>
                </Flex>
            </Box>
        </Flex>
    );
};

export default Comment;
