import { Stack, Box, Heading, Text, Flex } from '@chakra-ui/core';
import React from 'react'
import { Post } from '../generated/graphql';
import { VoteHandler } from './VoteHandler';
function Feature({ title, desc, author, votes, ...rest }) {
    return (
        <Box p={5} shadow="md" borderWidth="1px" {...rest}>
            <Flex>
                <VoteHandler votes={votes}></VoteHandler>
                <Box flexBasis="100%">
                    <Flex justifyContent="space-between">
                        <Heading fontSize="xl">{title}</Heading>
                        <Heading size="xs">-{author}</Heading>
                    </Flex>

                    <Text mt={4}>{desc}</Text>
                </Box>
            </Flex>


        </Box>
    );
}

interface PostDisplayProps {
    post: Partial<Post>
}

export const PostDisplay: React.FC<PostDisplayProps> = ({ post }) => {
    return (
        <Stack mb={2} spacing={8} key={post.id}>
            <Feature
                votes={post.votes}
                title={post.title}
                author={post.creator!.username}
                desc={post.text.slice(0, 60)}
            />
        </Stack>
    );
}