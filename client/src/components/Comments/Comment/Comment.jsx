import { Box, Avatar, Text, Button, Flex, Heading, Image, Link, HStack, color } from '@chakra-ui/react';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import { TiArrowBack } from 'react-icons/ti';
import { TbMessageReport } from 'react-icons/tb';
import { useCallback, useEffect, useState } from 'react';
import WriteComment from '../WriteComment';
// import { Comment } from './index';

const Comment = ({ isSubComment, initLikeNumber = 11, liked = false }) => {
    const [isWriteComment, hasWriteComment] = useState(false);
    let [isLiked, hasLike] = useState(liked);
    const [likeNumber, setLikeNumber] = useState(++initLikeNumber);

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
            <Avatar size={'md'} src="" mr={'16px'} />
            <Box>
                <Text m={'4px 0'} lineHeight={'100%'} fontSize={'lg'}>
                    use name
                </Text>
                <Text lineHeight={'100%'} fontSize={'xs'}>
                    3 tháng trước
                </Text>
                <Text fontSize={'sm'} mt={'8px'}>
                    hiện tại txt rất xấu, có thể k đúng 100% nên các đạo hữu đọc thấy sai sai ở đâu thì báo t sửa nhé
                    :lau hiện tại txt rất xấu, có thể k đúng 100% nên các đạo hữu đọc thấy sai sai ở đâu thì báo t sửa
                    nhé :lau hiện tại txt rất xấu, có thể k đúng 100% nên các đạo hữu đọc thấy sai sai ở đâu thì báo t
                    sửa nhé :lau
                </Text>
                <Flex color={'text'} justify={'space-between'} mt={'16px'}>
                    {!isWriteComment && (
                        <Flex fontSize={'sm'} cursor={'pointer'}>
                            See <Box m={'0 4px'}> 3 </Box> replies
                        </Flex>
                    )}
                    <Flex justifySelf={'end'} justify={'end'} gap="16px" mr={'16px'} fontSize={'sm'}>
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
                        <Flex onClick={() => hasWriteComment(true)} cursor={'pointer'} align={'center'} gap={'2px'}>
                            <TiArrowBack fontSize={'20px'} />
                            <span>Reply</span>
                        </Flex>
                        {/* report */}
                        <Flex cursor={'pointer'} gap="2px" align={'center'}>
                            <TbMessageReport fontSize={'20px'} />
                            <span>Report</span>
                        </Flex>
                    </Flex>
                </Flex>
                {/* {isSubComment && <Comment />} */}
                {isWriteComment && <WriteComment />}
            </Box>
        </Flex>
    );
};

export default Comment;
