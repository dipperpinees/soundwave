import { Avatar, Flex, InputGroup, Input, InputRightElement, useToast } from '@chakra-ui/react';
import { useContext, useRef } from 'react';
import { MdSend } from 'react-icons/md';
import { UserContext } from '../../../stores';
import fetchAPI from '../../../utils/fetchAPI';

const WriteComment = ({ songId, comments, setComments }) => {
    const toast = useToast();
    const input = useRef();
    const [user] = useContext(UserContext);

    const handlePostComment = () => {
        const content = input.current.value;
        input.current.value = '';
        input.current.focus();
        const postComment = async () => {
            if (content === '') {
                return;
            }

            if (!user.id) {
                toast({
                    position: 'top',
                    title: 'You need to login to comment!',
                    status: 'warning',
                    duration: 2000,
                    isClosable: true,
                });
                return;
            }

            const formData = new FormData();
            formData.append('content', content);
            try {
                const response = await fetchAPI(`/song/${songId}/comment`, {
                    method: 'POST',
                    body: JSON.stringify({ content, replyID: '' }),
                });
                setComments([response, ...comments]);
            } catch (error) {
                toast({
                    position: 'top',
                    title: error.message,
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                });
            }
        };
        postComment();
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
