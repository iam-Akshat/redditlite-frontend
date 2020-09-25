import { Stack, Box, Heading, Text, Flex } from '@chakra-ui/core';
import React from 'react'
import { Post } from '../generated/graphql';
function Feature({ title, desc, author, ...rest }) {
    return (
        <Box p={5} shadow="md" borderWidth="1px" {...rest}>
            <Flex justifyContent="space-between">
                <Heading fontSize="xl">{title}</Heading>
                <Heading size="xs">-{author}</Heading>
            </Flex>
            
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
                author={post.creator!.username}
                desc={post.text.slice(0, 60)}
            />
        </Stack>
    );
}