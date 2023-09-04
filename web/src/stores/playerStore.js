import { createContext, useCallback, useEffect, useReducer, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Player from '../components/Player';
import fetchAPI from '../utils/fetchAPI';

const defaultState = {
    isPlayed: false,
    songList: [],
    songPlayed: {},
    volume: 1,
    autoPlay: 'next', //next, repeat, shuffle or null
    songDuration: 0,
    currentTime: 0,
    playlistID: 0,
};

const initialState = { ...defaultState };

export const PlayerContext = createContext(initialState);

export function PlayerStore({ children }) {
    const location = useLocation();
    const audioRef = useRef(null);

    const playAudio = useCallback(() => {
        audioRef.current?.play();
    }, []);

    const pauseAudio = useCallback(() => {
        audioRef.current?.pause();
    }, []);

    const setCurrentTimeAudio = useCallback((currentTime) => {
        audioRef.current.currentTime = currentTime;
    }, []);

    const setVolumeAudio = useCallback((volume) => {
        audioRef.current.volume = volume;
    }, []);

    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'Add': {
                const song = action.payload;
                // incrementPlayCount(song.id);
                setTimeout(() => {
                    playAudio();
                    setCurrentTimeAudio(0);
                }, 100);
                return { ...state, songPlayed: song, isPlayed: true, currentTime: 0, songList: [song] };
            }
            case 'AddToNextUp': {
                if (state.songList.find(({ id }) => id === action.payload.id)) return state;
                return { ...state, songList: [...state.songList, action.payload] };
            }
            case 'PlayPlaylist': {
                const newState = { ...state };
                newState.songList = action.payload.songs;
                newState.playlistID = action.payload.id;
                newState.songPlayed = newState.songList[0];
                // incrementPlayCount(newState.songPlayed.id);
                newState.isPlayed = true;
                setTimeout(() => {
                    playAudio();
                    setCurrentTimeAudio(0);
                }, 100);
                return newState;
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
            case 'Pause': {
                pauseAudio();
                return { ...state, isPlayed: false };
            }
            case 'UpdateTime': {
                return { ...state, ...action.payload };
            }
            case 'ChangeTime': {
                if (!state.currentTime) return;
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
            case 'ChangeIndexSong': {
                setTimeout(() => {
                    setCurrentTimeAudio(0);
                    playAudio();
                }, 100);
                const newState = { ...state };
                newState.songPlayed = newState.songList.find(({ id }) => id === action.payload);
                newState.isPlayed = true;
                return newState;
            }
            case 'RemoveFromNextUp': {
                const newState = { ...state };
                newState.songList = newState.songList.filter(({ id }) => id !== action.payload);
                if (newState.songPlayed.id === action.payload) {
                    pauseAudio();
                    newState.isPlayed = false;
                    newState.songPlayed = newState.songList.length ? newState.songList[0] : {};
                } else {
                    newState.songPlayed = newState.songList.find(({ id }) => id === newState.songPlayed.id);
                }
                return newState;
            }
            case 'Repeat': {
                setTimeout(() => {
                    setCurrentTimeAudio(0);
                    playAudio();
                }, 100);
                return { ...state, currentTime: 0, isPlayed: true };
            }
            case 'NextSong': {
                const currentIndex = state.songList.indexOf(state.songPlayed);
                const newState = { ...state, isPlayed: true };
                if (currentIndex + 1 === state.songList.length) {
                    newState.songPlayed = newState.songList[0];
                    newState.currentTime = 0;
                } else {
                    newState.songPlayed = newState.songList[currentIndex + 1];
                    newState.currentTime = 0;
                }
                setTimeout(() => {
                    setCurrentTimeAudio(0);
                    playAudio();
                }, 100);
                return newState;
            }
            case 'PrevSong': {
                const currentIndex = state.songList.indexOf(state.songPlayed);
                const newState = { ...state, isPlayed: true };
                if (currentIndex === 0) {
                    newState.currentTime = 0;
                } else {
                    newState.songPlayed = newState.songList[currentIndex - 1];
                    newState.currentTime = 0;
                }
                setTimeout(() => {
                    setCurrentTimeAudio(0);
                    playAudio();
                }, 100);
                return newState;
            }
            case 'Shuffle': {
                const newIndexSong = Math.floor(Math.random() * state.songList.length);
                setTimeout(() => {
                    setCurrentTimeAudio(0);
                    playAudio();
                }, 100);
                const newState = { ...state };
                newState.songPlayed = newState.songList[newIndexSong];
                return newState;
            }
            case 'Clear': {
                return { ...defaultState };
            }
            default:
                return state;
        }
    }, initialState);
    const { songList, songPlayed, autoPlay } = state;

    const handleEndedSong = useCallback(async () => {
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
                dispatch({type: 'Pause'})
            }
        }
    }, [dispatch, autoPlay]);

    //increment number of listens
    useEffect(() => {
        try {
            if (!songPlayed.id) return;
            let recentlyPlayed = localStorage.getItem('recently_played')
                ? JSON.parse(localStorage.getItem('recently_played'))
                : [];
            recentlyPlayed = recentlyPlayed.filter((id) => id !== songPlayed.id);
            recentlyPlayed.unshift(songPlayed.id);
            localStorage.setItem('recently_played', JSON.stringify(recentlyPlayed));
            fetchAPI(`/song/play/${songPlayed.id}`, { method: 'POST' });
        } catch (e) {}
    }, [songPlayed]);

    useEffect(() => {
        if (['/signin', '/signup', '/admin'].includes(location.pathname)) dispatch({ type: 'Pause' });
    }, [location]);

    return (
        <PlayerContext.Provider value={[state, dispatch]}>
            {songList.length !== 0 && (
                <audio
                    controls
                    src={songPlayed?.url}
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
            <Player {...{ ...state, dispatch }} />
            {children}
        </PlayerContext.Provider>
    );
}
