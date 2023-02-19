import { AspectRatio, Skeleton, Stack } from '@chakra-ui/react';
export { default as ProfileSongSkeleton } from './ProfileSongSkeleton';
export { default as ProfileSkeleton } from './ProfileSkeleton';
export { default as PageHeaderSkeleton } from './PageHeaderSkeleton';

export default function SongSkeleton() {
    return (
        <Stack width="100%">
            <AspectRatio width="100%" ratio={1}>
                <Skeleton borderRadius={12} />
            </AspectRatio>
            <Skeleton height="16px" width="80%" borderRadius={12} />
            <Skeleton height="16px" width="50%" borderRadius={12} />
        </Stack>
    );
}
