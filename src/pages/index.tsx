import { NavBar } from "../components/NavBar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import { ssrExchange } from "urql";
import { PostDisplay } from "../components/PostDisplay";
import { Wrapper } from "../components/Wrapper";
import React, { useState } from "react";
import { Button, Flex } from "@chakra-ui/core";
const Index = () => {
  const [queryVars,setQueryVars] = useState({limit:10,cursor:null as null | string})
  const [{ data,fetching }] = usePostsQuery({variables:queryVars})
  console.log(data);
  
  //console.log(data,fetching);
  
  return (<>
    <NavBar/>
    <div>hello wodrld</div>
    <br/>
    <>
    <Wrapper>
      
    {!data && fetching ?(
      '..loading'
    ):(
      data.posts.posts && data.posts.posts.map(post=> {return <PostDisplay post={post}></PostDisplay>})
    )}
    {!data && !fetching &&" error"}
    {data?(
      <Flex>
        <Button isDisabled={!data.posts.hasMore} onClick={
          ()=>{
            setQueryVars({limit:queryVars.limit,cursor:data.posts.posts[data.posts.posts.length-1].createdAt})
            console.log();
            
          }
        } m="auto" my={4}>Load more</Button>
      </Flex>
    ):('Error')}

    </Wrapper>
    </>
  </> )
}

export default withUrqlClient(createUrqlClient,{ssr:true})(Index);
