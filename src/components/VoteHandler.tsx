import { Box, Flex, IconButton } from '@chakra-ui/core';
import React from 'react'

interface VoteHandlerProps {
votes:number
}

export const VoteHandler: React.FC<VoteHandlerProps> = ({votes}) => {
        return (
        <Box mr={4}>
            <Flex direction="column" justifyContent="center" alignItems="center">
                <IconButton 
                aria-label="Up vote"
                icon="chevron-up"
                onClick={()=>{
                    console.log('up');
                }}/>
                <Box>{votes}</Box>
                <IconButton 
                aria-label="Down vote"
                icon="chevron-down"
                onClick={()=>{
                    console.log('down');
                }}/>
            </Flex>
        </Box>);
}