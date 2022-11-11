import { Box, Avatar, Text, Button, Flex, Heading, Image, Link, HStack, color } from '@chakra-ui/react';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import { TiArrowBack } from 'react-icons/ti';
import { TbMessageReport } from 'react-icons/tb';
import { MdAccessTime } from 'react-icons/md';
import { useCallback, useEffect, useRef, useState } from 'react';
import WriteComment from '../WriteComment';
// import { Comment } from './index';

const Comment = ({ isSubComment = false, initLikeNumber = 11, liked = false }) => {
    const reply = useRef();
    const [isWriteComment, hasWriteComment] = useState(false);
    const [isLiked, hasLike] = useState(liked);
    const [likeNumber, setLikeNumber] = useState(++initLikeNumber);
    let fontSize = '1.3rem';
    let avatarSize = 'md';

    if (isSubComment) {
        fontSize = '1.1rem';
        avatarSize = 'sm';
    }

    useEffect(() => {});

    useEffect(() => {
        console.log('use effect');
        isLiked ? setLikeNumber(likeNumber + 1) : setLikeNumber(likeNumber - 1);
    }, [isLiked]);

    // const handleLike = () => {
    //     hasLike((isLiked) => !isLiked);
    //     !isLiked ? setLikeNumber(likeNumber + 1) : setLikeNumber(likeNumber - 1);
    // };

    return (
        <Flex mt={'8px'} pt="8px" pr={'16px'} borderTop="1px solid" borderTopColor={'primaryBorderColor'}>
            <Avatar size={avatarSize} src="" mr={'16px'} />
            <Box>
                <Text m={'0 0 8px'} lineHeight={'100%'} fontSize={fontSize}>
                    use name
                </Text>
                <Flex gap="4px" align={'center'} color={'text'}>
                    <MdAccessTime fontSize={'12px'} />
                    <Text fontSize={'0.7rem'}>3 tháng trước</Text>
                </Flex>
                <Text fontSize={'sm'} mt={'8px'} color={'rgba(255, 255, 255, 0.9)'}>
                    hiện tại txt rất xấu, có thể k đúng 100% nên các đạo hữu đọc thấy sai sai ở đâu thì báo t sửa nhé
                    :lau hiện tại txt rất xấu, có thể k đúng 100% nên các đạo hữu đọc thấy sai sai ở đâu thì báo t sửa
                    nhé :lau hiện tại txt rất xấu, có thể k đúng 100% nên các đạo hữu đọc thấy sai sai ở đâu thì báo t
                    sửa nhé :lau
                </Text>
                <Flex justifyContent={'space-between'} flexDirection={'row-reverse'} color={'text'} mt={'16px'}>
                    <Flex justifySelf={'flex-end'} justify={'end'} gap="16px" mr={'16px'} fontSize={'sm'}>
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
                        {/* reply */}
                        <Flex
                            ref={reply}
                            onClick={() => hasWriteComment(true)}
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
                    {!isWriteComment && (
                        <Flex fontSize={'sm'} cursor={'pointer'} _hover={{ color: 'white' }}>
                            See <Box m={'0 4px'}> 3 </Box> replies
                        </Flex>
                    )}
                </Flex>
                {isSubComment && <Comment />}
                {isWriteComment && <WriteComment />}
            </Box>
        </Flex>
    );
};

export default Comment;
