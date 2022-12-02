import { Box, Button, Flex, Heading, Image, Link, Select, HStack } from '@chakra-ui/react';
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
                setComments(response);
            } catch (e) {}
        };
        songId !== undefined && getComments();
    }, [songId]);

    const sortComments = (typeSort) => {
        let sortFn;
        switch (typeSort) {
            case 'new':
                sortFn = (a, b) => b.playCount - a.playCount;
                break;
            case 'old':
                sortFn = (a, b) => b.likeNumber - a.likeNumber;
                break;
            // case 'like'
            //     sortFunction = (a, b) => a.download > b.download;
            default:
                sortFn = (a, b) => 0;
                break;
        }
        if (comments) {
            let newComments = [...Comments];
            newComments.sort(sortFn);
            setComments(newComments);
        }
    };

    return (
        <Box p={['0 12px 12px', '0 24px 24px', '0 48px 24px']}>
            <Box>
                <Flex mb={'16px'} justify={'space-between'}>
                    <Box fontSize={'lg'}>
                        <span>{comments?.length}</span> Comments
                    </Box>
                    <Select
                        borderRadius={'5px'}
                        size={'sm'}
                        maxW={'80px'}
                        onChange={(e) => sortComments(e.target.value)}
                    >
                        <option value="new">New</option>
                        <option value="old">Old</option>
                        <option value="like">Like</option>
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
