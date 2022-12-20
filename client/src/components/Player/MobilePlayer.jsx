import { AspectRatio, Avatar, Flex, Icon, Progress, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useCallback, useRef } from 'react';
import { CgHeart } from 'react-icons/cg';
import { GiNextButton, GiPreviousButton } from 'react-icons/gi';
import { IoIosRepeat, IoMdClose } from 'react-icons/io';
import { MdDownload, MdPause, MdPlayArrow, MdPlaylistPlay } from 'react-icons/md';
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
    url,
    songDuration,
    currentTime,
    isShow,
    onClose,
    changeTimePlay,
    openNextUp,
}) {
    const progressRef = useRef();

    const handleChangeProgress = useCallback(
        (e) => {
            const progress = ((e.clientX - progressRef.current.offsetLeft) / progressRef.current.offsetWidth) * 100;
            changeTimePlay(progress);
        },
        [changeTimePlay]
    );

    const download = useCallback(() => {
        window.open(url.replace('/upload/', '/upload/fl_attachment/'), '_blank');
    }, [url]);

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
            zIndex={6}
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
                fontSize="2rem"
                zIndex={2}
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
                    <Flex justify="center" flexDirection="column" maxWidth="80%">
                        <Text as="h4" fontSize="1.5rem" fontWeight={600} className="one-line-title" maxWidth="100%">
                            {songPlayed?.title}
                        </Text>
                        <Text className="one-line-title" maxWidth="100%">
                            {songPlayed?.author.name}
                        </Text>
                    </Flex>
                    <Icon as={CgHeart} fontSize="2.25rem" color={isLiked ? 'tomato' : 'white'} onClick={likeSong} />
                </Flex>
                <div style={{ flex: 1, width: '100%' }} onClick={handleChangeProgress} ref={progressRef}>
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
                </div>
                <Flex align="center" justify="space-between" width="100%">
                    <Icon
                        as={IoIosRepeat}
                        fontSize="1.75rem"
                        onClick={() => changeAutoPlay('repeat')}
                        className={autoPlay === 'repeat' && 'player-choose'}
                    />
                    <Icon as={GiPreviousButton} fontSize="2rem" onClick={prevSong} />
                    <Icon
                        as={isPlayed ? MdPause : MdPlayArrow}
                        width={16}
                        height={16}
                        padding={2}
                        borderRadius="50%"
                        bgColor="white"
                        color="blackAlpha.900"
                        border="1px solid white"
                        fontSize="2rem"
                        onClick={handleTogglePlay}
                    />
                    <Icon fontSize="2rem" as={GiNextButton} onClick={nextSong} />
                    <Icon
                        fontSize="1.75rem"
                        as={TiArrowShuffle}
                        onClick={() => changeAutoPlay('shuffle')}
                        className={autoPlay === 'shuffle' && 'player-choose'}
                    />
                </Flex>
                <Flex align="center" justify="space-between" width="100%">
                    <Icon fontSize="1.5rem" as={MdDownload} onClick={download} />
                    <Icon fontSize="1.75rem" as={MdPlaylistPlay} onClick={openNextUp} />
                </Flex>
            </Flex>
        </Flex>
    );
}
