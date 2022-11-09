import { Box, Avatar, Button, Flex, Image, Link, InputGroup, Input, InputRightElement } from '@chakra-ui/react';
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
        <Flex width={'100%'} align={'center'} pb="24px" borderBottom="1px solid rgba(255, 255, 255, 0.2)">
            <Avatar src="" mr={'16px'} />
            <InputGroup size={'lg'}>
                <Input
                    // onKeyDown={(e) => {
                    //     if (e.key === 'Enter') handleSendComment();
                    // }}
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
