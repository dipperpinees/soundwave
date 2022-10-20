import { createContext, useEffect, useReducer, useRef } from 'react';

const initialState = {
    isPlayed: false,
    songList: [
        {
            id: 1,
            url: 'https://res.cloudinary.com/uethehe/video/upload/v1665674536/int3306/tjiwqfiigglgyqyhnbqd.mp3',
            thumbnail:
                'https://media.npr.org/assets/music/news/2010/09/maroon-e9cb8c5b25b4d1f3e68aa26e6a0ce51cf2ae59d8-s1100-c50.jpg',
            title: 'Sugar',
            author: {
                name: 'Maroon 5',
            },
        },
        {
            id: 2,
            url: 'https://res.cloudinary.com/uethehe/video/upload/v1665026251/int3306/mqzz0ajalesaiznwxucs.mp3',
            thumbnail:
                'https://media.npr.org/assets/music/news/2010/09/maroon-e9cb8c5b25b4d1f3e68aa26e6a0ce51cf2ae59d8-s1100-c50.jpg',
            title: 'HiepNK',
            author: {
                name: 'Maroon 5',
            },
        },
    ],
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
    }
    const pauseAudio = () => {
        audioRef.current.pause();
    }
    const setCurrentTimeAudio = (currentTime) => {
        audioRef.current.currentTime = currentTime;
    }
    const setVolumeAudio = (volume) => {
        audioRef.current.volume = volume;
    }
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
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
                return {...state, isPlayed: true}
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
                setCurrentTimeAudio(0);
                setTimeout(() => {
                    playAudio();
                }, 100)
                return { ...state, currentTime: 0 };
            }
            case 'NextSong': {
                const newState = { ...state };
                if (state.indexSongPlayed + 1 === state.songList.length) {
                    newState.indexSongPlayed = 0;
                    newState.currentTime = 0;
                } else {
                    ++newState.indexSongPlayed;
                    newState.currentTime = 0;
                }
                setTimeout(() => {
                    playAudio();
                }, 100)
                return newState;
            }
            case 'PrevSong': {
                const newState = { ...state };
                if (state.indexSongPlayed === 0) {
                    setCurrentTimeAudio(0);
                    newState.currentTime = 0;
                } else {
                    --newState.indexSongPlayed;
                    newState.currentTime = 0;
                }
                setTimeout(() => {
                    playAudio();
                }, 100)
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
    const { songList, indexSongPlayed, autoPlay, isPlayed } = state;

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
            default: {}
        }
    };

    return (
        <PlayerContext.Provider value={[state, dispatch]}>
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
            {children}
        </PlayerContext.Provider>
    );
}
