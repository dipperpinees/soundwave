import { useState, useEffect, Fragment } from 'react';
import { RiHeartLine, RiHeartFill } from 'react-icons/ri';
import { Text } from '@chakra-ui/react';
import fetchAPI from '../../utils/fetchAPI';

const LikeIcon = ({ showLikeNumber = true, ...props }) => {
    const [isLiked, setLiked] = useState(false);
    const [likeNumber, setLikeNumber] = useState(props.likeNumber);

    // console.log('like icon', props.id, isLiked);

    const toggleLike = async () => {
        try {
            setLiked(!isLiked);
            setLikeNumber && (!isLiked ? setLikeNumber(likeNumber + 1) : setLikeNumber(likeNumber - 1));
            await fetchAPI(`/song/like/${props.id}`, {
                method: isLiked ? 'DELETE' : 'POST',
            });
        } catch (e) {}
    };

    useEffect(() => {
        const fetchSong = async () => {
            try {
                const song = await fetchAPI(`/song/${props.id}`);
                setLiked(song.isLiked);
            } catch (e) {}
        };
        props.id && fetchSong();
    }, [props.id]);

    return (
        <Fragment>
            {isLiked ? (
                <Fragment>
                    <RiHeartFill color="#e53e3e" fontSize="24px" onClick={() => toggleLike()} />
                </Fragment>
            ) : (
                <Fragment>
                    <RiHeartLine fontSize="24px" onClick={() => toggleLike()} />
                </Fragment>
            )}
            {showLikeNumber && (
                <Text minW={'30px'} ml={'4px'}>
                    {likeNumber}
                </Text>
            )}
        </Fragment>
    );
};

export { LikeIcon };
