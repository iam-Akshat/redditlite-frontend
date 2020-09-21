import { Stack, Box, Heading, Text } from '@chakra-ui/core';
import React from 'react'
import { Post } from '../generated/graphql';
function Feature({ title, desc, ...rest }) {
    return (
        <Box p={5} shadow="md" borderWidth="1px" {...rest}>
            <Heading fontSize="xl">{title}</Heading>
            <Text mt={4}>{desc}</Text>
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
                title={post.title}
                desc={post.text.slice(0, 60)}
            />
        </Stack>
    );
}