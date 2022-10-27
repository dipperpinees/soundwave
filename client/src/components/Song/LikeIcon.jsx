import { useState, useCallback } from 'react';
import { Flex } from '@chakra-ui/react';
import { RiHeartLine, RiHeartFill } from 'react-icons/ri';

const LikeIcon = () => {
    const [isLike, setLike] = useState(false);

    const toggleLike = useCallback(() => {
        setLike(!isLike);
    });

    return (
        <Flex alignItems="center" margin="0 24px">
            {isLike ? (
                <RiHeartFill fontSize="24px" onClick={() => toggleLike()} />
            ) : (
                <RiHeartLine fontSize="24px" onClick={() => toggleLike()} />
            )}
        </Flex>
    );
};

export default LikeIcon;
