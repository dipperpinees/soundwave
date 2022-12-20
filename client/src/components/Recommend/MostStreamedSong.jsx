import useSongs from '../../hooks/useSongs';
import ListSongPreview from '../ListSongPreview';

export const MostStreamedSong = () => {
    const { data: mostStreamedSong, isLoading } = useSongs('limit=4&orderBy=listen');
    return (
        <ListSongPreview
            songs={isLoading ? null : mostStreamedSong.data}
            title="Most-streamed songs"
            moreUrl="/search?order=listen"
        />
    );
};
