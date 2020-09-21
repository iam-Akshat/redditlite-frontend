import React from "react";
import { Formik, Form} from "formik"
import { FormControl, FormLabel, Input, Button, Box, Link, Flex } from "@chakra-ui/core";
import { Wrapper } from "../components/Wrapper"
import { InputField } from "../components/InputField";
import { useMutation } from "urql";
import { useRouter } from "next/router"
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/errorToMap";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from 'next/link'
const Login: React.FC<{}> = ({ }) => {
    const router = useRouter();
    
    const [,login] = useLoginMutation()
    return (
        <Wrapper variant='small'> 
        <h1>Login</h1>
            <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={async (vals,{setErrors}) => {
                const response = await  login({options:vals});
                if(response.data?.login.errors){
                    setErrors(toErrorMap(response.data.login.errors))
                }else if(response.data?.login.user){
                    if(router.query.next){
                        router.push(router.query.next as string)
                    }else{
                        router.push('/');
                    }
                }
            }}>
            {({ isSubmitting }) => (
                <Form>
                    <InputField name="username" placeholder="Username" label="Username"/>
                    <Box mt={4}>
                    <InputField name="password" placeholder="Password" label="Password" type="password"/>
                    </Box>
                    <Flex mt={4} justifyContent="space-between">
                    <Button  type="submit" variantColor="teal" isLoading={isSubmitting}>Login</Button>
                    <Button > 
                    <NextLink href='/forgotpassword'>
                        <Link mr={5}>reset password</Link>
                    </NextLink></Button>
                    </Flex>
                    
                </Form>
            )}

        </Formik>
        </Wrapper>
        
    );
}

export default withUrqlClient(createUrqlClient)(Login);