import React from "react";
import { Formik, Form} from "formik"
import { FormControl, FormLabel, Input, Button, Box } from "@chakra-ui/core";
import { Wrapper } from "../components/Wrapper"
import { InputField } from "../components/InputField";
import { useMutation } from "urql";
import { useRouter } from "next/router"
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/errorToMap";

const Login: React.FC<{}> = ({ }) => {
    const router = useRouter();
    const [,login] = useLoginMutation()
    return (
        <Wrapper variant='small'> 
            <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={async (vals,{setErrors}) => {
                const response = await  login({options:vals});
                if(response.data?.login.errors){
                    setErrors(toErrorMap(response.data.login.errors))
                }else if(response.data?.login.user){
                    router.push('/') 
                }
            }}>
            {({ isSubmitting }) => (
                <Form>
                    <InputField name="username" placeholder="Username" label="Username"/>
                    <Box mt={4}>
                    <InputField name="password" placeholder="Password" label="Password" type="password"/>
                    </Box>
                    
                    <Button mt={4} type="submit" variantColor="teal" isLoading={isSubmitting}>Login</Button>
                </Form>
            )}

        </Formik>
        </Wrapper>
        
    );
}

export default Login;