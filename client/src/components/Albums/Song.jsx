import { Flex, Link, Box, Text } from '@chakra-ui/react';
import { BsThreeDots } from 'react-icons/bs';
import { LikeIcon } from '../Icon';

const Song = ({ ...props }) => {
    const { borderBottom, number } = props;
    const { id, title, url } = props;
    const [songName, singerName] = title.split(' - ');

    return (
        <Box width={'100%'} id={id} borderBottom={borderBottom} padding="4px 0">
            <Flex h="36px" overflow="hidden" justify={'space-between'} align={'center'}>
                <Flex overflow={'hidden'} width={'80%'} align={'end'}>
                    <Text fontSize="sm" mr={'16px'}>
                        {number + 1}
                    </Text>
                    <Link href={`../../music/${id}`} width={'90%'}>
                        <Text textOverflow={'ellipsis'} overflow="hidden" whiteSpace={'nowrap'} fontSize="sm">
                            {songName}
                        </Text>
                    </Link>
                </Flex>
                <Flex alignItems="center" margin="0 24px">
                    <LikeIcon />
                    <Box ml={'32px'}>
                        <BsThreeDots />
                    </Box>
                </Flex>
            </Flex>
        </Box>
    );
};

export default Song;
