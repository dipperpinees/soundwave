import { Avatar, Box, Button, Flex, Icon, Text, useToast } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { BsCheckCircleFill } from 'react-icons/bs';
import { FaUserPlus } from 'react-icons/fa';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../stores';
import fetchAPI from '../../utils/fetchAPI';
import Describe from './Describe';
import EditProfile from './EditProfile/EditProfile';

const Profile = ({ data, ...props }) => {
    const { userId } = props;
    const [isFollowed, setisFollowed] = useState(data?.isFollowed);
    const [isEditProfile, setIsEditProfile] = useState(false);
    const toast = useToast();
    const [user] = useContext(UserContext);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    useEffect(() => {
        setisFollowed(!!data?.isFollowed);
    }, [data]);

    const toggleFollow = () => {
        if (!user.id) {
            navigate('/signin');
            return;
        }
        const callAPI = async (type) => {
            try {
                await fetchAPI(`/user/${type}/${data.id}`, {
                    method: 'POST',
                });
                isFollowed ? --data.followerNumber : ++data.followerNumber;
                setisFollowed(!isFollowed);
            } catch (e) {
                toast({
                    position: 'top',
                    title: e.message,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        };
        queryClient.removeQueries(['profile', Number(userId)]);
        isFollowed ? callAPI('unfollow') : callAPI('follow');
    };

    return (
        <Box maxW={['100%', '100%', '180px']}>
            {<EditProfile {...{ isEditProfile, setIsEditProfile }} data={data} />}
            <Flex flexDirection="column" justifyContent="center" alignItems="center">
                <Avatar
                    mt={[0, '24px']}
                    mb={['8px', '16px']}
                    size={['2xl', '2xl', 'xl']}
                    name={data?.name}
                    src={data?.avatar}
                />
                <Flex align="center" gap={2}>
                    <Text class="user-name" fontSize={['lg']} fontWeight={700}>
                        {data?.name}
                    </Text>
                    {data?.isVerified && <Icon as={BsCheckCircleFill} />}
                </Flex>

                {/* <Text mb="16px">{data?.followerNumber} Followers</Text> */}
                <Flex w={['100%', '40%', '100%']} flexDirection="column">
                    {userId !== data?.id ? (
                        <Button
                            colorScheme="whiteAlpha"
                            variant="outline"
                            textColor={!isFollowed ? 'white' : 'var(--primary-color)'}
                            borderRadius="20px"
                            margin="8px 0"
                            onClick={toggleFollow}
                            leftIcon={!isFollowed && <FaUserPlus style={{ 'margin-bottom': '2px' }} />}
                        >
                            {isFollowed ? 'Following' : 'Follow'}
                        </Button>
                    ) : (
                        <Button
                            colorScheme="whiteAlpha"
                            variant="outline"
                            textColor="white"
                            borderRadius="20px"
                            margin="8px 0"
                            onClick={() => setIsEditProfile(true)}
                        >
                            Edit Profile
                        </Button>
                    )}
                </Flex>
            </Flex>
            <Box>
                <Describe data={data} />
            </Box>
        </Box>
    );
};

export default Profile;
