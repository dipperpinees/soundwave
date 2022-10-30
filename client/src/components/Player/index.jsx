import { Avatar, Flex, Heading, Icon, Progress, Text } from '@chakra-ui/react';
import { useContext, useRef } from 'react';
import { BsFillPlayFill, BsPauseFill } from 'react-icons/bs';
import { CgHeart } from 'react-icons/cg';
import { GiNextButton, GiPreviousButton } from 'react-icons/gi';
import { IoIosRepeat } from 'react-icons/io';
import { MdPlaylistPlay } from 'react-icons/md';
import { TiArrowShuffle } from 'react-icons/ti';
import { useLocation } from 'react-router-dom';
import defaultPreview from '../../assets/song_preview.jpg';
import { PlayerContext } from '../../stores';
import { formatTime } from '../../utils/formatTime';
import SoundVolume from './SoundVolume';
import './styles.scss';

export default function Player() {
    const [{ songList, indexSongPlayed, isPlayed, currentTime, songDuration, autoPlay }, dispatch] =
        useContext(PlayerContext);
    const progressRef = useRef();
    const handleTogglePlay = () => {
        dispatch({ type: 'Toggle' });
    };
    const handleChangeProgress = (e) => {
        const progress = ((e.clientX - progressRef.current.offsetLeft) / progressRef.current.offsetWidth) * 100;
        dispatch({ type: 'ChangeTime', payload: progress });
    };

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

    return (
        <Flex className="player" color="white" gap={8} alignItems="center" justifyContent="space-between">
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
                <Avatar name="thumbnail" src={songList[indexSongPlayed]?.thumbnail || defaultPreview} />
                <div>
                    <Heading color="white" fontSize={12} as="h4">
                        {songList[indexSongPlayed]?.title}
                    </Heading>
                    <Text color="white" fontSize={10}>
                        {songList[indexSongPlayed]?.author?.name}
                    </Text>
                </div>
            </Flex>
            <Flex className="player-play" display={{ base: 'none', md: 'flex' }}>
                <Icon as={GiPreviousButton} onClick={() => dispatch({ type: 'PrevSong' })} />
                <button onClick={handleTogglePlay}>{isPlayed ? <BsPauseFill /> : <BsFillPlayFill />}</button>
                <GiNextButton onClick={() => dispatch({ type: 'NextSong' })} />
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
                <IoIosRepeat
                    onClick={() => changeAutoPlay('repeat')}
                    className={autoPlay === 'repeat' && 'player-choose'}
                />
                <TiArrowShuffle
                    onClick={() => changeAutoPlay('shuffle')}
                    className={autoPlay === 'shuffle' && 'player-choose'}
                />
                <CgHeart />
                <MdPlaylistPlay />
                <SoundVolume />
            </Flex>

            {/* mobile */}
            <Flex gap={4} display={{ base: 'flex', md: 'none' }}>
                <CgHeart />
                <button onClick={handleTogglePlay}>{isPlayed ? <BsPauseFill /> : <BsFillPlayFill />}</button>
            </Flex>
        </Flex>
    );
}
