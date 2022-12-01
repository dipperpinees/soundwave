import { Box, Flex, Text, List, ListItem, HStack } from '@chakra-ui/react';
import ItemDescribe from './ItemDescribe';

const Describe = ({ data }) => {
    return (
        <Box>
            {data.description !== '' && (
                <Box borderTop={'1px solid #fff'} borderBottom={'1px solid #fff'} margin="12px 0">
                    <Text>{data.description}</Text>
                </Box>
            )}
            <List width={'100%'}>
                <ItemDescribe name={'Songs'} amount={data.trackNumber} />
                <ItemDescribe name={'Followers'} amount={data.followerNumber} />
                <ItemDescribe name={'Following'} amount={data.followingNumber} />
            </List>
        </Box>
    );
};

export default Describe;
