import useRecentlyPlayed from '../../hooks/useRecentlyPlayed';
import ListSongPreview from '../ListSongPreview';

export const RecentlyPlayed = () => {
    const { data, isLoading, isError } = useRecentlyPlayed();
    if (isError || isLoading || !data) return;
    return (
        <ListSongPreview
            songs={isLoading ? null : data?.map(({ value }) => value)}
            title="Recently Played"
            moreUrl=""
        />
    );
};
