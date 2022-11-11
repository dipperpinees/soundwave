import { Box, Avatar, Textarea, Flex, InputGroup, Input, InputRightElement } from '@chakra-ui/react';
import { useRef } from 'react';
import { MdSend } from 'react-icons/md';

const WriteComment = () => {
    const input = useRef();

    const handleSendComment = () => {
        const comment = input.current.value;
        input.current.value = '';
        input.current.focus();
    };

    return (
        <Flex width={'100%'} align={'center'} m={'8px 0'}>
            <Avatar size={'md'} src="" mr={'16px'} />
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
            <InputGroup size={'md'}>
                <Input
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSendComment();
                    }}
                    ref={input}
                    placeholder="Write a comment"
                    borderRadius="full"
                />

                <InputRightElement>
                    <MdSend
                        cursor={'pointer'}
                        onClick={() => {
                            handleSendComment();
                        }}
                        fontSize={'24px'}
                    />
                </InputRightElement>
            </InputGroup>
        </Flex>
    );
};

export default WriteComment;
