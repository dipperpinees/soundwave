// import { useState, useCallback, Fragment } from 'react';
// import { RiHeartLine, RiHeartFill } from 'react-icons/ri';
// import { Text } from '@chakra-ui/react';

// const ViewIcon = ({ playCount }) => {
//     const [viewNumber, setViewNumber] = useState(playCount);

//     const toggleLike = useCallback(() => {
//         handleLikeEvent && (isLike ? handleLikeEvent(likeNumber - 1) : handleLikeEvent(likeNumber + 1));
//         setLike(!isLike);
//     });

//     return (
//         <Fragment>
//             {isLike ? (
//                 <Fragment>
//                     <RiHeartFill color="#e53e3e" fontSize="24px" onClick={() => toggleLike()} />
//                 </Fragment>
//             ) : (
//                 <Fragment>
//                     <RiHeartLine fontSize="24px" onClick={() => toggleLike()} />
//                 </Fragment>
//             )}
//             <Text minW={'30px'} ml={'4px'}>
//                 {likeNumber && likeNumber}
//             </Text>
//         </Fragment>
//     );
// };

// export { LikeIcon };
