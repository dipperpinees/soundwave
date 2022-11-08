import { Flex, Image, Box, Text, Link } from '@chakra-ui/react';
import { LikeIcon } from '../Icon';

const Song = ({ ...props }) => {
    const { isLikeIcon } = props;
    const { borderBottom } = props;
    const { id, url_img, songName, singerName, userName } = props;

    return (
        <Box id={id} borderBottom={borderBottom} padding="12px 0">
            <Flex h="42px" overflow="hidden">
                <Box boxSize="42px" bg="white" padding="4px">
                    <Image src={url_img} alt="song image" boxSize="100%" objectFit="cover" borderRadius="full" />
                </Box>
                <Box ml={2} flex="1">
                    {/* Song name */}
                    <Link href={'#'}>
                        <Text
                            textOverflow={'ellipsis'}
                            overflow="hidden"
                            whiteSpace={'nowrap'}
                            width={'280px'}
                            fontSize="md"
                        >
                            {songName}
                        </Text>
                    </Link>
                    <Flex fontSize="xs" overflow="hidden" whiteSpace={'nowrap'} width={'260px'}>
                        <Link href={'#'}>{userName}</Link>
                        <Text m="0 4px">-</Text>
                        <Link href={'#'} overflow="hidden" textOverflow={'ellipsis'}>
                            {singerName}
                        </Link>{' '}
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
