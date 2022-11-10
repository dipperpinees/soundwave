import { Box, Button, Flex, Heading, Image, Link, Select, HStack } from '@chakra-ui/react';
import WriteComment from './WriteComment';
import Comment from './Comment/Comment';
const Comments = () => {
    const setValue = (value) => {
        console.log(value);
    };
    return (
        <Box m={'0 48px 24px'}>
            <Box>
                <Flex mb={'16px'} justify={'space-between'}>
                    <Box fontSize={'lg'}>
                        <span>150</span> Comments
                    </Box>
                    <Select borderRadius={'5px'} size={'sm'} maxW={'80px'} onChange={(e) => setValue(e.target.value)}>
                        <option value="new">New</option>
                        <option value="old">Old</option>
                        <option value="like">Like</option>
                    </Select>
                </Flex>
                <Box mb={'16px'}>
                    <WriteComment />
                </Box>
                <Comment />
                <Comment />
                <Comment />
                <Comment />
            </Box>
        </Box>
    );
};

export default Comments;
