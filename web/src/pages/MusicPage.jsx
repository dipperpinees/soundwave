import { Box, Flex } from '@chakra-ui/react';
import MusicPageHeader from '../components/MusicPageHeader';
import Comments from '../components/Comments';
import RelatedTracks from '../components/RelatedTracks/RelatedTracks';
import { useParams } from 'react-router-dom';
import { useState, useLayoutEffect } from 'react';
import fetchAPI from '../utils/fetchAPI';
import { Helmet } from 'react-helmet';
import { APP_NAME } from '../utils/constant';
import { PageHeaderSkeleton } from '../components/SquareSkeleton';

const MusicPage = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);

    // fetch data
    useLayoutEffect(() => {
        const getSong = async () => {
            try {
                const data = await fetchAPI(`/song/${id}`);
                setData(data);
            } catch (e) {}
        };
        if (id) getSong();
    }, [id]);

    return (
        <Box
            p={'calc(var(--header-height) + 24px) 0 0 var(--navbar-width) '}
            m={['0 24px', '0 24px', '0']}
            minH={'100vh'}
            color={'white'}
            pb={24}
        >
            <Helmet>
                <title>
                    {APP_NAME} - {data ? data.title : 'Music Page'}
                </title>
            </Helmet>
            <Box mb={['24px']}>{data ? <MusicPageHeader {...{ data }} /> : <PageHeaderSkeleton />}</Box>
            {data && (
                <>
                    <Flex wrap={'wrap'}>
                        {/* width = image width */}
                        <Box flex={['100%', '100%', '25%']} maxW={['100%', '100%', '25%']}>
                            <RelatedTracks id={data?.author?.id} />
                        </Box>
                        <Box
                            flex={['100%', '100%', '75%']}
                            maxW={['100%', '100%', '75%']}
                            p={['0 0 12px', '0 0 24px', '0 48px 24px']}
                        >
                            <Comments songId={id} />
                        </Box>
                    </Flex>
                </>
            )}
        </Box>
    );
};

export default MusicPage;
