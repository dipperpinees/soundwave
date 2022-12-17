import { Box, Avatar, Text, Flex, Menu, MenuButton, MenuItem, MenuList, Icon } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { MdAccessTime, MdEdit } from 'react-icons/md';
import { TbMessageReport } from 'react-icons/tb';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useContext } from 'react';
import { UserContext } from '../../../stores';

const Comment = ({ comments, index }) => {
    const comment = comments[index];
    const user = useContext(UserContext)[0];

    let date = comment?.updated_at?.split('T').at(0);
    date = date && date.split('-').reverse().join('/');

    return (
        <Flex mt={'8px'} pt="8px" pr={'4px'} borderTop="1px solid" borderTopColor={'primaryBorderColor'}>
            <Avatar size={'md'} src={comment?.author?.avatar} mr={'16px'} />
            <Box flex={1} overflow="auto">
                <Flex justify={'space-between'}>
                    <Box>
                        <Box m={['0 0 8px']} lineHeight={'100%'} fontSize={'1.2rem'}>
                            {comment && <Link to={`/profile/${comment.author.id}`}>{comment.author.name}</Link>}
                        </Box>
                        <Flex gap="4px" align={'center'} color={'text'}>
                            <MdAccessTime fontSize={'12px'} />
                            <Text fontSize={'0.7rem'}>{date}</Text>
                        </Flex>
                    </Box>
                    {/* menu */}
                    <Flex
                        cursor={'pointer'}
                        align={'center'}
                        boxSize={'34px'}
                        borderRadius={'full'}
                        justify="center"
                        color={'whiteAlpha.600'}
                        _hover={{ background: 'hoverColor', color: 'white' }}
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
                            </MenuList>
                        </Menu>
                    </Flex>
                </Flex>
                <Text fontSize={'sm'} m={['8px 12px 8px 0', '12px 16px 12px 0']} color={'whiteAlpha.900'}>
                    {comment && comment.content}
                </Text>
            </Box>
        </Flex>
    );
};

export default Comment;
