import React from "react";
import { Formik, Form } from "formik"
import {  Button, Box } from "@chakra-ui/core";
import { Wrapper } from "../components/Wrapper"
import { InputField } from "../components/InputField";
import { useRouter } from "next/router"
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/errorToMap";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { validateEmail, validateRegisterCred } from "../utils/validator";
interface registerProps {

}
const Register: React.FC<registerProps> = ({ }) => {
    const router = useRouter();
    const [,register] = useRegisterMutation()
    return (
        <Wrapper variant='small'> 
            <h1>Sign Up</h1>
            <Formik
            initialValues={{ username: "", password: "", email:"" }}
            onSubmit={async (vals,{setErrors}) => {
                const err=validateRegisterCred(vals.email,vals.password,vals.username);
                if(err){
                    console.log(err);
                    setErrors(toErrorMap(err))
                    return;
                }

                const {data} = await  register(vals);
                if(data?.register.errors){
                    setErrors(toErrorMap(data.register.errors))
                }else if(data?.register.user){
                    router.push('/') 
                }
            }}>
            {({ isSubmitting }) => (
                <Form>
                    <InputField name="username" placeholder="Username" label="Username"/>
                    <Box mt={4}>
                        <InputField name="password" placeholder="Password" label="Password" type="password"/>
                    </Box>
                    <Box mt={4}>
                        <InputField name="email" placeholder="Email" label="Email" type="email"/>
                    </Box>
                    <Button mt={4} type="submit" variantColor="teal" isLoading={isSubmitting}>Register</Button>
                </Form>
            )}

        </Formik>
        </Wrapper>
        
    );
}

export default withUrqlClient(createUrqlClient)(Register);