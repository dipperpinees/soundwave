import useSongs from '../../hooks/useSongs';
import ListSongPreview from '../ListSongPreview';

export const LastestSongs = () => {
    const { data: lastestSongs, isLoading } = useSongs('limit=4');
    return <ListSongPreview songs={isLoading ? null : lastestSongs.data} title="Lastest songs" moreUrl="/search" />;
};
