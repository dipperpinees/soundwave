import { Box, Flex, Select } from '@chakra-ui/react';
import WriteComment from './WriteComment';
import Comment from './Comment/Comment';
import { useEffect } from 'react';
import fetchAPI from '../../utils/fetchAPI';
import { useState } from 'react';

const Comments = ({ songId }) => {
    const [comments, setComments] = useState(null);

    useEffect(() => {
        const getComments = async () => {
            try {
                const response = await fetchAPI(`/song/${songId}/comment`);
                setComments(response.reverse());
            } catch (e) {}
        };
        songId !== undefined && getComments();
    }, [songId]);

    const sortComments = (typeSort) => {
        let sortFn;
        switch (typeSort) {
            case 'latest':
                sortFn = (a, b) => b.updated_at.localeCompare(a.updated_at);
                break;
            case 'oldest':
                sortFn = (a, b) => a.updated_at.localeCompare(b.updated_at);
                break;
            default:
                sortFn = (a, b) => 0;
                break;
        }
        if (comments) {
            const newComments = [...comments];
            newComments.sort(sortFn);
            setComments(newComments);
        }
    };

    return (
        <Box>
            <Box>
                <Flex mb={'16px'} justify={'space-between'}>
                    <Box fontSize={'lg'}>
                        <span>{comments?.length}</span> Comments
                    </Box>
                    <Select
                        borderRadius={'5px'}
                        size={'sm'}
                        maxW={'100px'}
                        onChange={(e) => sortComments(e.target.value)}
                        fontSize={'0.875rem'}
                    >
                        <option value="latest">Latest</option>
                        <option value="oldest">Oldest</option>
                        {/* <option value="like">Like</option> */}
                    </Select>
                </Flex>
                <Box mb={'16px'}>
                    <WriteComment songId={songId} {...{ comments, setComments }} />
                </Box>
                {comments && comments.map((comment, index) => <Comment index={index} comments={comments} />)}
            </Box>
        </Box>
    );
};

export default Comments;
