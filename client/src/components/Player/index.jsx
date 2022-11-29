import { Avatar, Flex, Heading, Icon, Progress, Text, useMediaQuery } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useContext, useEffect, useRef, useState } from 'react';
import { BsFillPlayFill, BsPauseFill } from 'react-icons/bs';
import { CgHeart } from 'react-icons/cg';
import { GiNextButton, GiPreviousButton } from 'react-icons/gi';
import { IoIosRepeat } from 'react-icons/io';
import { MdPause, MdPlayArrow, MdPlaylistPlay } from 'react-icons/md';
import { TiArrowShuffle } from 'react-icons/ti';
import { useLocation } from 'react-router-dom';
import { PlayerContext } from '../../stores';
import fetchAPI from '../../utils/fetchAPI';
import { formatTime } from '../../utils/formatTime';
import { DEFAULT_SONG_THUMBNAIL } from '../../utils/image';
import MobilePlayer from './MobilePlayer';
import { NextUp } from './NextUp';
import SoundVolume from './SoundVolume';
import './styles.scss';

export default function Player() {
    const [{ songList, indexSongPlayed, isPlayed, currentTime, songDuration, autoPlay }, dispatch] =
        useContext(PlayerContext);
    const [showPlaylist, setShowPlaylist] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const progressRef = useRef();
    const handleTogglePlay = () => dispatch({ type: 'Toggle' });
    const [isMobile] = useMediaQuery('(max-width: 48em)');

    const handleChangeProgress = (e) => {
        const progress = ((e.clientX - progressRef.current.offsetLeft) / progressRef.current.offsetWidth) * 100;
        dispatch({ type: 'ChangeTime', payload: progress });
    };

    useEffect(() => {
        setIsLiked(songList?.[indexSongPlayed]?.isLiked || false);
    }, [songList, indexSongPlayed]);

    //dont show on signin signup page
    const location = useLocation();
    if (
        location.pathname === '/signin' ||
        location.pathname === '/signup' ||
        location.pathname === '/upload' ||
        !songList.length
    )
        return null;

    const changeAutoPlay = (type) => {
        if (autoPlay === type) {
            dispatch({ type: 'ChangeAutoPlay', payload: 'next' });
        } else {
            dispatch({ type: 'ChangeAutoPlay', payload: type });
        }
    };

    const likeSong = async () => {
        try {
            const { isLiked, id } = songList[indexSongPlayed];
            setIsLiked(!isLiked);
            await fetchAPI(`/song/like/${id}`, {
                method: isLiked ? 'DELETE' : 'POST',
            });
        } catch (e) {}
    };

    return (
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
        >
            {/* mobile progress bar */}
            <Progress
                value={songDuration === 0 ? 0 : (currentTime / songDuration) * 100}
                colorScheme="primary"
                _hover={{ cursor: 'pointer' }}
                display={{ base: 'inherit', md: 'none' }}
                position="absolute"
                top="-1px"
                left="0px"
                right="0px"
                width="100%"
                background="none"
                height={0.5}
            />

            <Flex alignItems="center" gap={2}>
                <Avatar name="thumbnail" src={songList[indexSongPlayed]?.thumbnail || DEFAULT_SONG_THUMBNAIL} />
                <div>
                    <Heading color="white" fontSize={12} as="h4">
                        {songList[indexSongPlayed]?.title}
                    </Heading>
                    <Text color="white" fontSize={10}>
                        {songList[indexSongPlayed]?.author?.name}
                    </Text>
                </div>
            </Flex>
            <Flex className="player-play" display={{ base: 'none', md: 'flex' }} gap={4}>
                <Icon fontSize={20} as={GiPreviousButton} onClick={() => dispatch({ type: 'PrevSong' })} />
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
                <Icon fontSize={20} as={GiNextButton} onClick={() => dispatch({ type: 'NextSong' })}></Icon>
            </Flex>
            <Flex flex={1} alignItems="center" gap={1} display={{ base: 'none', md: 'flex' }}>
                <Text fontSize={10} color="white">
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
                <Text fontSize={10} color="white">
                    {formatTime(songDuration)}
                </Text>
            </Flex>

            <Flex gap={4} display={{ base: 'none', md: 'flex' }}>
                <Icon
                    fontSize={20}
                    onClick={() => changeAutoPlay('repeat')}
                    as={IoIosRepeat}
                    className={autoPlay === 'repeat' && 'player-choose'}
                />
                <Icon
                    fontSize={20}
                    as={TiArrowShuffle}
                    onClick={() => changeAutoPlay('shuffle')}
                    className={autoPlay === 'shuffle' && 'player-choose'}
                />
                <Icon fontSize={20} as={CgHeart} color={isLiked ? 'tomato' : 'white'} onClick={likeSong} />
                <Icon fontSize={20} as={MdPlaylistPlay} onClick={() => setShowPlaylist(true)} />
                <Icon fontSize={20} as={SoundVolume} />
            </Flex>

            {isMobile && (
                <>
                    <MobilePlayer {...{handleTogglePlay, isPlayed, songPlayed: songList?.[indexSongPlayed]}}/>
                    <Flex gap={4}>
                        <Icon as={CgHeart} color={isLiked ? 'tomato' : 'white'} onClick={likeSong} />
                        <button onClick={handleTogglePlay}>{isPlayed ? <BsPauseFill /> : <BsFillPlayFill />}</button>
                    </Flex>
                </>
            )}

            <NextUp isOpen={showPlaylist} toggleOpen={() => setShowPlaylist(!showPlaylist)} />
        </Flex>
    );
}
