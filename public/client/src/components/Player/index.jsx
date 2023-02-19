import { Avatar, Flex, Heading, Icon, Progress, Text, useMediaQuery } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { BsFillPlayFill, BsPauseFill } from 'react-icons/bs';
import { CgHeart } from 'react-icons/cg';
import { GiNextButton, GiPreviousButton } from 'react-icons/gi';
import { IoIosRepeat } from 'react-icons/io';
import { MdPause, MdPlayArrow, MdPlaylistPlay } from 'react-icons/md';
import { TiArrowShuffle } from 'react-icons/ti';
import { Link, useLocation } from 'react-router-dom';
import fetchAPI from '../../utils/fetchAPI';
import { formatTime } from '../../utils/formatTime';
import { DEFAULT_SONG_THUMBNAIL } from '../../utils/image';
import MobilePlayer from './MobilePlayer';
import { NextUp } from './NextUp';
import SoundVolume from './SoundVolume';
import './styles.scss';

export default function Player({ songList, songPlayed, isPlayed, currentTime, songDuration, autoPlay, dispatch }) {
    const [showPlaylist, setShowPlaylist] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const progressRef = useRef();
    const handleTogglePlay = () => dispatch({ type: 'Toggle' });
    const [isMobile] = useMediaQuery('(max-width: 48em)');
    const location = useLocation();
    const [showMobilePlayer, setShowMobilePlayer] = useState(false);

    useEffect(() => {
        setIsLiked(songPlayed?.isLiked || false);
    }, [songPlayed]);

    const changeTimePlay = useCallback(
        (progress) => {
            dispatch({ type: 'ChangeTime', payload: progress });
        },
        [dispatch]
    );

    const handleChangeProgress = useCallback(
        (e) => {
            const progress = ((e.clientX - progressRef.current.offsetLeft) / progressRef.current.offsetWidth) * 100;
            changeTimePlay(progress);
        },
        [changeTimePlay]
    );

    const changeAutoPlay = useCallback(
        (type) => {
            if (autoPlay === type) {
                dispatch({ type: 'ChangeAutoPlay', payload: 'next' });
            } else {
                dispatch({ type: 'ChangeAutoPlay', payload: type });
            }
        },
        [dispatch, autoPlay]
    );

    const likeSong = useCallback(async () => {
        try {
            const { isLiked, id } = songPlayed;
            setIsLiked(!isLiked);
            await fetchAPI(`/song/like/${id}`, {
                method: isLiked ? 'DELETE' : 'POST',
            });
        } catch (e) {}
    }, [songPlayed]);

    const nextSong = useCallback(() => {
        dispatch({ type: 'NextSong' });
    }, [dispatch]);

    const prevSong = useCallback(() => {
        dispatch({ type: 'PrevSong' });
    }, [dispatch]);

    const handleShowMobilePlayer = useCallback(
        (e) => {
            if (isMobile && !e.target.closest('#mobile-settings')) setShowMobilePlayer(true);
        },
        [isMobile]
    );

    const openNextUp = useCallback(() => {
        setShowPlaylist(true);
    }, []);

    //dont show on signin signup page
    if (['/signin', '/signup', '/admin'].includes(location.pathname) || !songList.length) return null;

    return (
        <>
            <Flex
                className="player"
                color="white"
                gap={6}
                alignItems="center"
                justifyContent="space-between"
                as={motion.div}
                initial={{ marginBottom: 'calc(var(--player-height) * -1)' }}
                animate={{ marginBottom: 0 }}
                transition={{ duration: 1 }}
                zIndex={1000}
                onClick={handleShowMobilePlayer}
            >
                {isMobile && (
                    <Progress
                        value={songDuration === 0 ? 0 : (currentTime / songDuration) * 100}
                        colorScheme="primary"
                        _hover={{ cursor: 'pointer' }}
                        position="absolute"
                        top="-1px"
                        left="0px"
                        right="0px"
                        width="100%"
                        background="none"
                        height={0.5}
                    />
                )}

                <Flex alignItems="center" gap={2} width={{ base: '80%', md: '16%' }}>
                    <Link to={`/music/${songPlayed?.id}`}>
                        <Avatar name="thumbnail" src={songPlayed?.thumbnail || DEFAULT_SONG_THUMBNAIL} />
                    </Link>
                    <Flex direction="column" flex={1} overflow="hidden">
                        <Link to={`/music/${songPlayed?.id}`}>
                            <Heading
                                color="white"
                                fontSize="0.75rem"
                                as="h4"
                                whiteSpace="nowrap"
                                className="one-line-title"
                            >
                                {songPlayed?.title}
                            </Heading>
                        </Link>
                        <Link to={`/profile/${songPlayed?.author?.id}`}>
                        <Text color="white" fontSize="0.675rem">
                            {songPlayed?.author?.name}
                        </Text>
                        </Link>
                    </Flex>
                </Flex>
                <Flex className="player-play" display={{ base: 'none', md: 'flex' }} gap={4}>
                    <Icon fontSize="1.25rem" as={GiPreviousButton} onClick={prevSong} />
                    <Icon
                        width={8}
                        height={8}
                        padding={1}
                        borderRadius="50%"
                        bgColor="white"
                        color="blackAlpha.900"
                        border="1px solid white"
                        onClick={handleTogglePlay}
                        as={isPlayed ? MdPause : MdPlayArrow}
                    ></Icon>
                    <Icon fontSize="1.25rem" as={GiNextButton} onClick={nextSong}></Icon>
                </Flex>
                <Flex flex={1} alignItems="center" gap={1} display={{ base: 'none', md: 'flex' }}>
                    <Text fontSize="0.625rem" color="white">
                        {formatTime(currentTime)}
                    </Text>
                    <div style={{ flex: 1 }} onClick={handleChangeProgress} ref={progressRef}>
                        <Progress
                            value={songDuration === 0 ? 0 : (currentTime / songDuration) * 100}
                            size="xs"
                            colorScheme="primary"
                            _hover={{ cursor: 'pointer' }}
                        />
                    </div>
                    <Text fontSize="0.625rem" color="white">
                        {formatTime(songDuration)}
                    </Text>
                </Flex>

                <Flex gap={4} display={{ base: 'none', md: 'flex' }}>
                    <Icon
                        fontSize="1.25rem"
                        onClick={() => changeAutoPlay('repeat')}
                        as={IoIosRepeat}
                        className={autoPlay === 'repeat' && 'player-choose'}
                    />
                    <Icon
                        fontSize="1.25rem"
                        as={TiArrowShuffle}
                        onClick={() => changeAutoPlay('shuffle')}
                        className={autoPlay === 'shuffle' && 'player-choose'}
                    />
                    <Icon fontSize="1.25rem" as={CgHeart} color={isLiked ? 'tomato' : 'white'} onClick={likeSong} />
                    <Icon fontSize="1.25rem" as={MdPlaylistPlay} onClick={openNextUp} />
                    <Icon fontSize="1.25rem" as={SoundVolume} />
                </Flex>

                <NextUp isOpen={showPlaylist} toggleOpen={() => setShowPlaylist(!showPlaylist)} />
                {isMobile && (
                    <Flex gap={4} id="mobile-settings">
                        <Icon as={CgHeart} color={isLiked ? 'tomato' : 'white'} onClick={likeSong} />
                        <button onClick={handleTogglePlay}>{isPlayed ? <BsPauseFill /> : <BsFillPlayFill />}</button>
                    </Flex>
                )}
            </Flex>
            {isMobile && (
                <>
                    <MobilePlayer
                        {...{
                            handleTogglePlay,
                            isLiked,
                            likeSong,
                            isPlayed,
                            songPlayed,
                            changeAutoPlay,
                            prevSong,
                            nextSong,
                            autoPlay,
                            currentTime,
                            songDuration,
                            isShow: showMobilePlayer,
                            onClose: () => setShowMobilePlayer(false),
                            changeTimePlay,
                            openNextUp,
                            url: songPlayed.url,
                        }}
                    />
                </>
            )}
        </>
    );
}
