import { Box, Button, Center, Container, Flex, Icon, Image, Input, Select, Stack, Text } from '@chakra-ui/react';
import * as _buffer from 'buffer';
import { motion } from 'framer-motion';
import * as musicMetadata from 'music-metadata-browser';
import * as process from 'process';
import { useContext, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { AiFillCamera } from 'react-icons/ai';
import { BsFillPlayFill, BsPauseFill } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { API_ENDPOINT } from '../config';
import { GenreContext } from '../stores';
import { LoadingContext } from '../stores/loadingStore';

window.process = process;
window.global = window;
window.Buffer = _buffer.Buffer;

export default function Upload() {
    const audioRef = useRef(null);
    const [playAudio, setPlayAudio] = useState(false);
    const [thumbnail, setThumbnail] = useState({
        src: '',
        file: null,
    });
    const [title, setTitle] = useState('');
    const [fileName, setFileName] = useState('');
    const [genres] = useContext(GenreContext);
    const [genre, setGenre] = useState('');
    const setLoading = useContext(LoadingContext)[1];
    const [audioFile, setAudioFile] = useState(null);

    const onDrop = (acceptedFiles) => {
        if (!acceptedFiles || !acceptedFiles[0]) return;

        const file = acceptedFiles[0];
        const fileName = file.name;
        setFileName(fileName);
        setTitle(fileName.substring(0, fileName.lastIndexOf('.mp3')));
        getMetaTagsFromAudio(file);
        setPlayAudio(false);
        setAudioFile(file);
        var reader = new FileReader();
        reader.onload = function () {
            audioRef.current.src = this.result;
        };
        reader.readAsDataURL(file);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'audio/*': ['.mp3', '.wav', '.m4a'],
        },
    });
    const toggleAudio = () => {
        if (playAudio) {
            audioRef.current.pause();
            setPlayAudio(false);
        } else {
            audioRef.current.play();
            setPlayAudio(true);
        }
    };

    const getMetaTagsFromAudio = (file) => {
        musicMetadata.parseBlob(file, { native: true }).then((metadata) => {
            if (metadata.common.picture) {
                setThumbnail({
                    src: `data:${metadata.common.picture[0].format};base64,${Buffer.from(
                        metadata.common.picture[0].data
                    ).toString('base64')}`,
                    file: new Blob([metadata.common.picture[0].data], { type: metadata.common.picture[0].format }),
                });
            } else {
                setThumbnail({ src: '', file: null });
            }

            if (metadata.common.genre) {
                const genre = genres.find(({ name }) => name === metadata.common.genre[0])?.id;
                setGenre(genre);
            } else {
                setGenre(null);
            }
        });
    };

    const handleChangeThumbnail = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.onchange = (e) => {
            const file = e.target.files[0];
            var reader = new FileReader();
            reader.onload = function () {
                setThumbnail({ src: this.result, file });
            };
            reader.readAsDataURL(file);
        };
        input.click();
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', audioFile);
        formData.append('title', title);
        formData.append('thumbnail', thumbnail.file);
        formData.append('genreID', genre);

        setLoading(true);
        const response = await fetch(API_ENDPOINT + '/song/', {
            method: 'POST',
            credentials: 'include',
            body: formData,
        });
        const responseJSON = await response.json();
        console.log(responseJSON);
        if (response.ok) {
            toast("Upload song successfully.");
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleUpload} className="white-color">
            <Container
                centerContent
                padding={8}
                width={600}
                position="fixed"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
            >
                <Flex
                    alignItems="center"
                    borderWidth={1}
                    borderColor="gray"
                    borderStyle="dashed"
                    borderRadius={12}
                    paddingTop={6}
                    paddingBottom={6}
                    paddingRight={16}
                    paddingLeft={16}
                    justifyContent="space-between"
                    width="100%"
                    as={motion.div}
                    {...getRootProps()}
                >
                    <input {...getInputProps()} />
                    <Stack>
                        <Text fontSize="lg">Drag your songs here</Text>
                        <Text fontSize="sm" color="gray" textAlign="center">
                            .mp3 or .wav or .m4a
                        </Text>
                    </Stack>
                    <Text fontSize="sm" color="gray">
                        or
                    </Text>
                    <Button color="black">Select Files</Button>
                </Flex>
                {audioFile && (
                    <Flex
                        as={motion.div}
                        justifyContent="space-between"
                        width="100%"
                        margin={8}
                        gap={8}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <Box
                            position="relative"
                            _hover={{ opacity: 0.6, cursor: 'pointer' }}
                            onClick={handleChangeThumbnail}
                        >
                            <Image
                                src={thumbnail.src || DEFAULT_THUMBNAIL}
                                boxSize="180px"
                                borderRadius={8}
                                objectFit="cover"
                                alt="Dan Abramov"
                            />
                            <Center position="absolute" top={0} bottom={0} left={0} right={0}>
                                <AiFillCamera fontSize={24} />
                            </Center>
                        </Box>
                        <Stack flex={1}>
                            <Flex alignItems="center" marginLeft="-8px">
                                <Icon
                                    onClick={toggleAudio}
                                    fontSize={32}
                                    as={playAudio ? BsPauseFill : BsFillPlayFill}
                                    _hover={{ cursor: 'pointer' }}
                                />
                                <Text width="300px" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
                                    {fileName}
                                </Text>
                            </Flex>
                            <Input
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                            <Select
                                placeholder="Select Genre"
                                value={genre}
                                onChange={(e) => setGenre(e.target.value)}
                                required
                            >
                                {genres.map(({ id, name }) => (
                                    <option key={id} value={id}>
                                        {name}
                                    </option>
                                ))}
                            </Select>
                            <Button type="submit" colorScheme="primary">
                                Save
                            </Button>
                        </Stack>
                    </Flex>
                )}
                <audio id="sound" ref={audioRef}></audio>
            </Container>
        </form>
    );
}

const DEFAULT_THUMBNAIL =
    'https://img.freepik.com/free-vector/music-speaker-grungy-art_1394-1262.jpg?w=826&t=st=1666428737~exp=1666429337~hmac=aa488f2233ab9f5026c70b416a721c14a128eb71c1bdaee61c6ce8fbc6b4d7a2';
