import { Flex, Progress } from '@chakra-ui/react';
import { useContext, useRef } from 'react';
import { HiOutlineSpeakerWave, HiOutlineSpeakerXMark } from 'react-icons/hi2';
import { PlayerContext } from '../../stores';

export default function SoundVolume() {
    const [{ volume }, dispatch] = useContext(PlayerContext);
    const progressRef = useRef(null);
    const handleChangeProgress = (e) => {
        const progress = (e.clientX - progressRef.current.offsetLeft) / progressRef.current.offsetWidth;
        dispatch({ type: 'ChangeVolume', payload: progress });
    };
    return (
        <Flex alignItems="center" gap={1}>
            {volume >= 0.1 ? (
                <HiOutlineSpeakerWave onClick={() => dispatch({ type: 'ChangeVolume', payload: 0 })} />
            ) : (
                <HiOutlineSpeakerXMark onClick={() => dispatch({ type: 'ChangeVolume', payload: 1 })} />
            )}
            <div onClick={handleChangeProgress} ref={progressRef}>
                <Progress
                    height={0.5}
                    _hover={{ height: 1.5, cursor: 'pointer' }}
                    colorScheme="primary"
                    size="xs"
                    value={volume * 100}
                    width={24}
                />
            </div>
        </Flex>
    );
}
