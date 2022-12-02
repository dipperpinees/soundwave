import { Box, Avatar, Textarea, Flex, InputGroup, Input, InputRightElement } from '@chakra-ui/react';
import { useContext, useRef } from 'react';
import { MdSend } from 'react-icons/md';
import { UserContext } from '../../../stores';
import fetchAPI from '../../../utils/fetchAPI';

const WriteComment = ({ songId, comments, setComments }) => {
    const input = useRef();
    const [user] = useContext(UserContext);

    const handlePostComment = () => {
        const content = input.current.value;
        input.current.value = '';
        input.current.focus();
        const PostComment = async () => {
            const formData = new FormData();
            formData.append('content', content);
            try {
                const response = await fetchAPI(`/song/${songId}/comment`, {
                    method: 'POST',
                    body: JSON.stringify({ content, replyID: '' }),
                });
                setComments([response, ...comments]);
            } catch (error) {}
        };
        PostComment();
    };

    return (
        <Flex width={'100%'} align={'center'} m={'8px 0'}>
            <Avatar size={'md'} src={user.avatar} mr={'16px'} />
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
