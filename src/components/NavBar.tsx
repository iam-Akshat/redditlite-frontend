import React from 'react'
import { Box, Flex, Link, Button } from '@chakra-ui/core';
import NextLink from 'next/link'
import { useMeQuery, useLoginMutation, useLogoutMutation } from '../generated/graphql';
interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({}) => {
    const [{fetching:logoutFetching},logout] = useLogoutMutation()
     const [{data,fetching}] = useMeQuery();
     let body= null;
     if(fetching){

     }else if(!data?.me){                     // user not legged in
        body=(<>
            <NextLink href='/login'>
                        <Link mr={5}> Login</Link>
                    </NextLink>
                    <NextLink href='/register'>
                        <Link mr={5}> Register</Link>
                    </NextLink>
        </>)
     }else{
        body=(
        <Flex>
            <Box>{data.me.username}</Box>   
            <Button
            onClick={()=>{
                logout()
            }}
            ml={3} mr={3}
            variant="link">Logout</Button>
        </Flex>
        )
     }
        return (
            <Flex bg='tomato' padding={3}>
                <Box ml={'auto'}>
                    {body}
                </Box>
            </Flex>
        );
}