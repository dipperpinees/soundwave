import { AspectRatio, Avatar, Button, Flex, Icon, Progress, Text } from '@chakra-ui/react';
import { BsPauseFill } from 'react-icons/bs';
import { CgHeart } from 'react-icons/cg';
import { GiNextButton, GiPreviousButton } from 'react-icons/gi';
import { IoIosRepeat } from 'react-icons/io';
import { MdPause } from 'react-icons/md';
import { TiArrowShuffle } from 'react-icons/ti';
import { DEFAULT_SONG_THUMBNAIL } from '../../utils/image';

export default function MobilePlayer({handleTogglePlay, isPlayed, songPlayed}) {
    return (
        <Flex
            position="fixed"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bgColor="blackAlpha.900"
            align="center"
            justify="space-around"
            color="white"
            direction="column"
            className="mobile-player"
            pt="var(--header-height)"
            px={22}
        >
            <AspectRatio maxW="560px" ratio={1} width="100%">
                <Avatar name="thumbnail" src={songPlayed?.thumbnail || DEFAULT_SONG_THUMBNAIL} width="100%" height="100%" />
            </AspectRatio>
            <Flex width="100%" align="center" justify="center" flexDirection="column" gap={4}>
                <Flex width="100%" justify="space-between" align="center">
                    <Flex justify="center" flexDirection="column">
                        <Text as="h4" fontSize={24} fontWeight={600}>
                            {songPlayed?.title}
                        </Text>
                        <Text>{songPlayed?.author.name}</Text>
                    </Flex>
                    <Icon as={CgHeart} fontSize={36}/>
                </Flex>
                <Progress
                    // value={songDuration === 0 ? 0 : (currentTime / songDuration) * 100}
                    colorScheme="primary"
                    _hover={{ cursor: 'pointer' }}
                    display={{ base: 'inherit', md: 'none' }}
                    width="100%"
                    background="none"
                    height={0.5}
                    bgColor="whiteAlpha.600"
                />
                <Flex align="center" justify="space-between" width="100%">
                    <Icon as={IoIosRepeat} fontSize={28} />
                    <Icon as={GiPreviousButton} fontSize={32} />
                    <Icon
                        as={MdPause}
                        width={16}
                        height={16}
                        padding={2}
                        borderRadius="50%"
                        bgColor="white"
                        color="blackAlpha.900"
                        border="1px solid white"
                        fontSize={32}
                    />
                    <Icon fontSize={32} as={GiNextButton} />
                    <Icon fontSize={28} as={TiArrowShuffle} />
                </Flex>
            </Flex>
        </Flex>
    );
}
