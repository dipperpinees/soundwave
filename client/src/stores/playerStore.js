import { createContext, useReducer, useRef } from 'react';
import fetchAPI from "../utils/fetchAPI";

const initialState = {
    isPlayed: false,
    songList: [],
    indexSongPlayed: 0,
    volume: 1,
    autoPlay: 'next', //next, repeat, shuffle or null
    songDuration: 0,
    currentTime: 0,
};

export const PlayerContext = createContext(initialState);

export function PlayerStore({ children }) {
    const audioRef = useRef(null);
    const playAudio = () => {
        audioRef.current.play();
    };
    const pauseAudio = () => {
        audioRef.current.pause();
    };
    const setCurrentTimeAudio = (currentTime) => {
        audioRef.current.currentTime = currentTime;
    };
    const setVolumeAudio = (volume) => {
        audioRef.current.volume = volume;
    };
    const incrementPlayCount = (songID) => {
        try {
            fetchAPI(`/song/play/${songID}`, {method: "POST"})
        } catch (e) {}
    }
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'Add': {
                const song = action.payload;
                incrementPlayCount(song.id);
                setTimeout(() => {
                    playAudio();
                    setCurrentTimeAudio(0);
                }, 100);
                return { ...state, indexSongPlayed: 0, isPlayed: true, currentTime: 0, songList: [song] };
            }
            case 'Toggle': {
                if (state.isPlayed) {
                    pauseAudio();
                    return { ...state, isPlayed: false };
                } else {
                    playAudio();
                    return { ...state, isPlayed: true };
                }
            }
            case 'Play': {
                playAudio();
                return { ...state, isPlayed: true };
            }
            case 'PlayPlaylist': {
                break;
            }
            case 'Pause': {
                pauseAudio();
                return { ...state, isPlayed: false };
            }
            case 'UpdateTime': {
                return { ...state, ...action.payload };
            }
            case 'ChangeTime': {
                setCurrentTimeAudio((action.payload / 100) * audioRef.current.duration);
                return { ...state, currentTime: action.payload };
            }
            case 'ChangeVolume': {
                setVolumeAudio(action.payload);
                return { ...state, volume: action.payload };
            }
            case 'ChangeAutoPlay': {
                return { ...state, autoPlay: action.payload };
            }
            case 'Repeat': {
                setTimeout(() => {
                    setCurrentTimeAudio(0);
                    playAudio();
                }, 100);
                return { ...state, currentTime: 0, isPlayed: true };
            }
            case 'NextSong': {
                const newState = { ...state, isPlayed: true };
                if (state.indexSongPlayed + 1 === state.songList.length) {
                    newState.indexSongPlayed = 0;
                    newState.currentTime = 0;
                } else {
                    ++newState.indexSongPlayed;
                    newState.currentTime = 0;
                }
                setTimeout(() => {
                    setCurrentTimeAudio(0);
                    playAudio();
                }, 100);
                return newState;
            }
            case 'PrevSong': {
                const newState = { ...state, isPlayed: true };
                if (state.indexSongPlayed === 0) {
                    newState.currentTime = 0;
                } else {
                    --newState.indexSongPlayed;
                    newState.currentTime = 0;
                }
                setTimeout(() => {
                    setCurrentTimeAudio(0);
                    playAudio();
                }, 100);
                return newState;
            }
            case 'Shuffle': {
                const indexSongPlayed = Math.floor(Math.random() * state.songList.length);
                return { ...state, indexSongPlayed };
            }
            default:
                return state;
        }
    }, initialState);
    const { songList, indexSongPlayed, autoPlay } = state;

    const handleEndedSong = async () => {
        switch (autoPlay) {
            case 'repeat': {
                dispatch({ type: 'Repeat' });
                break;
            }
            case 'shuffle': {
                dispatch({ type: 'Shuffle' });
                break;
            }
            case 'next': {
                dispatch({ type: 'NextSong' });
                break;
            }
            default: {
            }
        }
    };

    return (
        <PlayerContext.Provider value={[state, dispatch]}>
            {songList.length !== 0 && (
                <audio
                    controls
                    src={songList[indexSongPlayed].url}
                    ref={audioRef}
                    style={{ display: 'none' }}
                    onEnded={handleEndedSong}
                    onTimeUpdate={() => {
                        dispatch({
                            type: 'UpdateTime',
                            payload: {
                                currentTime: audioRef.current.currentTime,
                                songDuration: audioRef.current.duration,
                            },
                        });
                    }}
                ></audio>
            )}
            {children}
        </PlayerContext.Provider>
    );
}
