import { Box, Avatar, Text, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { AiFillLike } from 'react-icons/ai';
import { TbMessageReport } from 'react-icons/tb';
import { MdAccessTime } from 'react-icons/md';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useEffect, useState } from 'react';
// import { Comment } from './index';

const Comment = ({ isSubComment = false, initLikeNumber = 11, liked = false, ...props }) => {
    const [isLiked, hasLike] = useState(liked);
    const [likeNumber, setLikeNumber] = useState(++initLikeNumber);
    const { comments, index } = props;
    const comment = comments[index];
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
                        {/* <Flex cursor={'pointer'} gap="2px" align={'center'}>
                            <TbMessageReport fontSize={'20px'} />
                            <span>Report</span>
                        </Flex> */}
                        <Flex
                            cursor={'pointer'}
                            gap="2px"
                            align={'center'}
                            boxSize={'34px'}
                            borderRadius={'full'}
                            justify="center"
                            _hover={{ background: 'hoverColor' }}
                        >
                            <BsThreeDotsVertical fontSize={'20px'} />
                        </Flex>
                        {/* more menu */}
                    </Flex>
                </Flex>
            </Box>
        </Flex>
    );
};

export default Comment;
