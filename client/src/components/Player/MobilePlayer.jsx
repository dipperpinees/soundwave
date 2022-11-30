import { AspectRatio, Avatar, Flex, Icon, Progress, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { CgHeart } from 'react-icons/cg';
import { GiNextButton, GiPreviousButton } from 'react-icons/gi';
import { IoIosRepeat, IoMdClose } from 'react-icons/io';
import { MdPause, MdPlayArrow } from 'react-icons/md';
import { TiArrowShuffle } from 'react-icons/ti';
import { DEFAULT_SONG_THUMBNAIL } from '../../utils/image';

export default function MobilePlayer({
    isLiked,
    likeSong,
    handleTogglePlay,
    isPlayed,
    songPlayed,
    changeAutoPlay,
    nextSong,
    prevSong,
    autoPlay,
    songDuration,
    currentTime,
    isShow,
    onClose,
}) {
    return (
        <Flex
            position="fixed"
            top={0}
            left={0}
            right={0}
            height="100vh"
            bgColor="blackAlpha.900"
            align="center"
            justify="space-around"
            color="white"
            direction="column"
            className="mobile-player"
            pt="var(--header-height)"
            px={22}
            zIndex={1}
            as={motion.div}
            initial={{ top: '100vh' }}
            animate={{ top: isShow ? 0 : '100vh' }}
        >
            <Icon
                as={IoMdClose}
                onClick={() => onClose()}
                position="absolute"
                left={5}
                top="calc(var(--header-height) + 20px)"
                fontSize={32}
            />
            <AspectRatio maxW="560px" ratio={1} width="100%">
                <Avatar
                    name="thumbnail"
                    src={songPlayed?.thumbnail || DEFAULT_SONG_THUMBNAIL}
                    width="100%"
                    height="100%"
                />
            </AspectRatio>
            <Flex width="100%" align="center" justify="center" flexDirection="column" gap={4}>
                <Flex width="100%" justify="space-between" align="center">
                    <Flex justify="center" flexDirection="column">
                        <Text as="h4" fontSize={24} fontWeight={600}>
                            {songPlayed?.title}
                        </Text>
                        <Text>{songPlayed?.author.name}</Text>
                    </Flex>
                    <Icon as={CgHeart} fontSize={36} color={isLiked ? 'tomato' : 'white'} onClick={likeSong} />
                </Flex>
                <Progress
                    value={songDuration === 0 ? 0 : (currentTime / songDuration) * 100}
                    colorScheme="primary"
                    _hover={{ cursor: 'pointer' }}
                    display={{ base: 'inherit', md: 'none' }}
                    width="100%"
                    background="none"
                    height={1.5}
                    bgColor="whiteAlpha.600"
                />
                <Flex align="center" justify="space-between" width="100%">
                    <Icon
                        as={IoIosRepeat}
                        fontSize={28}
                        onClick={() => changeAutoPlay('repeat')}
                        className={autoPlay === 'repeat' && 'player-choose'}
                    />
                    <Icon as={GiPreviousButton} fontSize={32} onClick={prevSong} />
                    <Icon
                        as={isPlayed ? MdPause : MdPlayArrow}
                        width={16}
                        height={16}
                        padding={2}
                        borderRadius="50%"
                        bgColor="white"
                        color="blackAlpha.900"
                        border="1px solid white"
                        fontSize={32}
                        onClick={handleTogglePlay}
                    />
                    <Icon fontSize={32} as={GiNextButton} onClick={nextSong} />
                    <Icon
                        fontSize={28}
                        as={TiArrowShuffle}
                        onClick={() => changeAutoPlay('shuffle')}
                        className={autoPlay === 'shuffle' && 'player-choose'}
                    />
                </Flex>
            </Flex>
        </Flex>
    );
}
