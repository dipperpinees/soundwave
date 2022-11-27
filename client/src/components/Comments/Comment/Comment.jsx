import { Box, Avatar, Text, Button, Flex, Heading, Image, Link, HStack, color } from '@chakra-ui/react';
import { AiFillLike } from 'react-icons/ai';
import { TiArrowBack } from 'react-icons/ti';
import { TbMessageReport } from 'react-icons/tb';
import { MdAccessTime } from 'react-icons/md';
import { useEffect, useRef, useState } from 'react';
// import { Comment } from './index';

const Comment = ({ isSubComment = false, initLikeNumber = 11, liked = false, ...props }) => {
    const reply = useRef();
    // const [isWriteComment, hasWriteComment] = useState(false);
    // const [isLiked, hasLike] = useState(liked);
    // const [likeNumber, setLikeNumber] = useState(++initLikeNumber);
    const { comments, index } = props;
    const comment = comments[index];
    let date = comment?.updated_at?.split('T').at(0);
    date = date && date.split('-').reverse().join('/');

    // useEffect(() => {
    //     console.log('use effect');
    //     isLiked ? setLikeNumber(likeNumber + 1) : setLikeNumber(likeNumber - 1);
    // }, [isLiked]);

    return (
        <Flex mt={'8px'} pt="8px" pr={'16px'} borderTop="1px solid" borderTopColor={'primaryBorderColor'}>
            <Avatar size={'md'} src="comment?.author?.avatar" mr={'16px'} />
            <Box>
                <Text m={'0 0 8px'} lineHeight={'100%'} fontSize={'1.3rem'}>
                    {comment && comment.author.name}
                </Text>
                <Flex gap="4px" align={'center'} color={'text'}>
                    <MdAccessTime fontSize={'12px'} />
                    <Text fontSize={'0.7rem'}>{date}</Text>
                </Flex>
                <Text fontSize={'sm'} mt={'8px'} color={'rgba(255, 255, 255, 0.9)'}>
                    {comment && comment.content}
                </Text>
                <Flex justifyContent={'space-between'} flexDirection={'row-reverse'} color={'text'} mt={'16px'}>
                    <Flex justifySelf={'flex-end'} justify={'end'} gap="16px" mr={'16px'} fontSize={'sm'}>
                        {/* like */}
                        {/* <Flex gap="4px" align={'center'}>
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
                        </Flex> */}
                        {/* reply */}
                        <Flex
                            ref={reply}
                            // onClick={() => hasWriteComment(true)}
                            cursor={'pointer'}
                            align={'center'}
                            gap={'2px'}
                        >
                            <TiArrowBack fontSize={'20px'} />
                            <span>Reply</span>
                        </Flex>
                        {/* report */}
                        <Flex cursor={'pointer'} gap="2px" align={'center'}>
                            <TbMessageReport fontSize={'20px'} />
                            <span>Report</span>
                        </Flex>
                    </Flex>
                    {/* {!isWriteComment && (
                        <Flex fontSize={'sm'} cursor={'pointer'} _hover={{ color: 'white' }}>
                            See <Box m={'0 4px'}> 3 </Box> replies
                        </Flex>
                    )} */}
                </Flex>
                {/* {isSubComment && <Comment />}
                {isWriteComment && <WriteComment />} */}
            </Box>
        </Flex>
    );
};

export default Comment;
