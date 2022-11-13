import { Box, Flex, Text, List, ListItem, HStack } from '@chakra-ui/react';
import ItemDescribe from './ItemDescribe';

const Describe = (props) => {
    const { trackNumber, followerNumber, followingNumber } = props;

    return (
        <Box borderTop={'1px solid #fff'}>
            <Box margin="12px 0">
                <Text>
                    The Stack component and the Flex component have their children spaced out evenly but the key
                </Text>
            </Box>
            <List borderTop={'1px solid #fff'} width={'100%'}>
                <ItemDescribe name={'Songs'} amount={trackNumber} />
                <ItemDescribe name={'Followers'} amount={followerNumber} />
                <ItemDescribe name={'Following'} amount={followingNumber} />
            </List>
        </Box>
    );
};

export default Describe;
