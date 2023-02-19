import { useState, useEffect, Fragment } from 'react';
import { RiHeartLine, RiHeartFill } from 'react-icons/ri';
import { Text } from '@chakra-ui/react';
import fetchAPI from '../../utils/fetchAPI';

const LikeIcon = ({ showLikeNumber = true, ...props }) => {
    const { data, setData } = props;
    const song = data?.at(props?.index);
    const [isLiked, setLiked] = useState();
    const [likeNumber, setLikeNumber] = useState();

    // update changes from current song
    useEffect(() => {
        setLiked(song?.isLiked);
        setLikeNumber(song?.likeNumber);
    }, [song]);

    const toggleLike = async () => {
        try {
            setLiked(!isLiked);
            if (setLikeNumber) {
                if (!isLiked) {
                    setLikeNumber(likeNumber + 1);
                    ++song.likeNumber;
                } else {
                    setLikeNumber(likeNumber - 1);
                    --song.likeNumber;
                }
            }
            data[props.index] = song;
            setData && setData(data);
            await fetchAPI(`/song/like/${song?.id}`, {
                method: isLiked ? 'DELETE' : 'POST',
            });
        } catch (e) {}
    };

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
                <Text minW={'34px'} ml={'4px'} fontSize={12}>
                    {likeNumber}
                </Text>
            )}
        </Fragment>
    );
};

export { LikeIcon };
