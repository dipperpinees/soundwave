import { Flex, Image, Box, Text, Link } from '@chakra-ui/react';
import { LikeIcon } from '../Icon';

const Song = ({ ...props }) => {
    const { isLikeIcon } = props;
    const { borderBottom } = props;
    const { id, title, url, thumbnail, author, likeNumber, playCount, genre } = props;
    const [songName, singerName] = title.split(' - ');

    return (
        <Box id={id} borderBottom={borderBottom} padding="12px 0">
            <Flex h="42px" overflow="hidden">
                <Box boxSize="42px" bg="white" overflow={'hidden'} borderRadius={'2px'}>
                    <Image src={thumbnail} alt="song image" boxSize="100%" />
                </Box>
                <Box ml={2} flex="1" width={'70%'}>
                    {/* Song name */}
                    <Link href={`../../music/${id}`}>
                        <Text
                            textOverflow={'ellipsis'}
                            overflow="hidden"
                            whiteSpace={'nowrap'}
                            width={'90%'}
                            fontSize="md"
                        >
                            {songName}
                        </Text>
                    </Link>
                    <Flex fontSize="xs" overflow="hidden" whiteSpace={'nowrap'} width={'80%'}>
                        <Link href={`../../profile/${author?.id}`}>{author?.name}</Link>
                        <Text m="0 4px">-</Text>
                        <Link href="#" overflow="hidden" textOverflow={'ellipsis'}>
                            {singerName}
                        </Link>
                        {/* singer */}
                    </Flex>
                </Box>
                {isLikeIcon && (
                    <Flex alignItems="center" margin="0 24px">
                        <LikeIcon />
                    </Flex>
                )}
            </Flex>
        </Box>
    );
};

export default Song;
