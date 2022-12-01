import { Avatar, Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import Describe from './Describe';

const Profile = ({ data, ...props }) => {
    const { setIsEditProfile } = props;
    const { userId } = props;

    return (
        <Box maxW={['100%', '100%', '180px']}>
            <Flex flexDirection="column" justifyContent="center" alignItems="center">
                <Avatar mt={[0, 0, '24px']} mb="16px" size="xl" name={data?.name} src={data?.avatar} />
                <Heading class="user-name" fontSize="xl" mb="16px">
                    {data?.name}
                </Heading>
                <Text mb="16px">{data?.followerNumber} Followers</Text>
                <Flex flexDirection="column">
                    {userId !== data?.id ? (
                        <Button textColor="#000" borderRadius="20px" margin="8px 0">
                            Following
                        </Button>
                    ) : (
                        <Button
                            textColor="#000"
                            borderRadius="20px"
                            margin="8px 0"
                            onClick={() => setIsEditProfile(true)}
                        >
                            Edit Profile
                        </Button>
                    )}
                    {/* <Button
                        colorScheme="whiteAlpha"
                        variant="outline"
                        textColor="#fff"
                        borderRadius="20px"
                        margin="8px 0"
                        padding="4px 48px"
                    >
                        Message
                    </Button> */}
                </Flex>
            </Flex>
            <Box>
                <Describe data={data} />
            </Box>
        </Box>
    );
};

export default Profile;
