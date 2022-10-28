import { useState, useCallback, Fragment } from 'react';
import { RiHeartLine, RiHeartFill } from 'react-icons/ri';

const LikeIcon = () => {
    const [isLike, setLike] = useState(false);

    const toggleLike = useCallback(() => {
        setLike(!isLike);
    });

    return (
        <Fragment>
            {isLike ? (
                <RiHeartFill fontSize="24px" onClick={() => toggleLike()} />
            ) : (
                <RiHeartLine fontSize="24px" onClick={() => toggleLike()} />
            )}
        </Fragment>
    );
};

export { LikeIcon };
