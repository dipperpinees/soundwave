import { Box, Avatar, Textarea, Flex, InputGroup, Input, InputRightElement } from '@chakra-ui/react';
import { useRef } from 'react';
import { MdSend } from 'react-icons/md';
import fetchAPI from '../../../utils/fetchAPI';

const WriteComment = ({ songId, getComments }) => {
    const input = useRef();

    const handlePostComment = () => {
        const content = input.current.value;
        input.current.value = '';
        input.current.focus();
        const PostComment = async () => {
            const formData = new FormData();
            formData.append('content', content);
            try {
                await fetchAPI(`/song/${songId}/comment`, {
                    method: 'POST',
                    body: JSON.stringify({ content, replyID: '' }),
                });
                getComments();
            } catch (error) {}
        };
        PostComment();
    };

    return (
        <Flex width={'100%'} align={'center'} m={'8px 0'}>
            <Avatar size={'md'} src="" mr={'16px'} />
            {/* text area comment */}
            {/* <Flex width={'100%'} position={'relative'} size={'sm'} alignItems={'center'}>
                <Textarea
                    scrollBehavior={'none'}
                    ref={input}
                    resize={'none'}
                    size={'sm'}
                    placeholder="Write a comment"
                    borderRadius="20px"
                    pr={'48px'}
                />
                <Box position={'absolute'} right="16px">
                    <MdSend
                        cursor={'pointer'}
                        onClick={() => {
                            handleSendComment();
                        }}
                        fontSize={'24px'}
                    />
                </Box>
            </Flex> */}
            {/* input comment */}
            <InputGroup size={'md'}>
                <Input
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handlePostComment();
                    }}
                    ref={input}
                    placeholder="Write a comment"
                    borderRadius="full"
                />

                <InputRightElement>
                    <MdSend
                        cursor={'pointer'}
                        onClick={() => {
                            handlePostComment();
                        }}
                        fontSize={'24px'}
                    />
                </InputRightElement>
            </InputGroup>
        </Flex>
    );
};

export default WriteComment;
