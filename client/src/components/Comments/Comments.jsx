import { Box, Button, Flex, Heading, Image, Link, Select, HStack } from '@chakra-ui/react';
import WriteComment from './WriteComment';

const Comments = () => {
    const setValue = (value) => {
        console.log(value);
    };
    return (
        <Box m={'0 48px'}>
            <Box>
                <Flex mb={'16px'} justify={'space-between'}>
                    <Box fontSize={'x-large'}>
                        <span>150</span> Comments
                    </Box>
                    <Select maxW={'100px'} onChange={(e) => setValue(e.target.value)}>
                        <option value="new">New</option>
                        <option value="old">Old</option>
                        <option value="like">Like</option>
                    </Select>
                </Flex>
                <WriteComment />
            </Box>
        </Box>
    );
};

export default Comments;
