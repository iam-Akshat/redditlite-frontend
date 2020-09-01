import React from "react";
import { Formik, Form } from "formik"
import {  Button, Box } from "@chakra-ui/core";
import { Wrapper } from "../components/Wrapper"
import { InputField } from "../components/InputField";
import { useRouter } from "next/router"
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/errorToMap";
interface registerProps {

}
const Register: React.FC<registerProps> = ({ }) => {
    const router = useRouter();
    const [,register] = useRegisterMutation()
    return (
        <Wrapper variant='small'> 
            <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={async (vals,{setErrors}) => {
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
                    <Button mt={4} type="submit" variantColor="teal" isLoading={isSubmitting}>Register</Button>
                </Form>
            )}

        </Formik>
        </Wrapper>
        
    );
}

export default Register;