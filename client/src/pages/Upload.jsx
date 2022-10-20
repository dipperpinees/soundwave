import { Button, Container, Flex, Image, Input, Select, Stack, Text } from '@chakra-ui/react';
import { BsPauseFill } from 'react-icons/bs';

export default function Upload() {
    return (
        <Container centerContent padding={8} width={600}>
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
            >
                <Stack>
                    <Text fontSize="lg">Drag your songs here</Text>
                    <Text fontSize="sm" color="gray" textAlign="center">
                        .mp3 or .wav
                    </Text>
                </Stack>
                <Text fontSize="sm" color="gray">
                    or
                </Text>
                <Button color="black">Select Files</Button>
            </Flex>
            <Flex justifyContent="space-between" width="100%" margin={8} gap={8}>
                <Image
                    src="https://cly.1cdn.vn/2021/06/22/twice-1-.jpg"
                    boxSize="200px"
                    borderRadius={8}
                    objectFit="cover"
                    alt="Dan Abramov"
                />
                <Stack flex={1}>
                    <Flex alignItems="center" marginLeft="-8px">
                        <BsPauseFill fontSize={32} />
                        <Text>ABCD.mp3</Text>
                    </Flex>
                    <Input placeholder="Name" />
                    <Select placeholder="Select option" colorScheme="primary    ">
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                    </Select>
                </Stack>
            </Flex>
        </Container>
    );
}
