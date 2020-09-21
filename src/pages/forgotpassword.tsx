import React, { useState } from 'react'
import { Wrapper } from '../components/Wrapper';
import { Formik, Form } from 'formik';
import { InputField } from '../components/InputField';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { Button, Box } from '@chakra-ui/core';
import { validateEmail } from '../utils/validator';
import { useForgotPasswordMutation } from '../generated/graphql';

interface forgotpasswordProps {

}

 const forgotpassword: NextPage = ({}) => {
     const [,sendReset] = useForgotPasswordMutation()
     const [sentMail,setSentMail] =useState(true)
        return (
            <Wrapper variant="small">
                <Formik
                initialValues={{email:""}}
                onSubmit={async ({email},{setErrors})=>{
                    const isNotValidemail= validateEmail(email)
                    if(isNotValidemail){
                        setErrors({'email':isNotValidemail})
                        return
                    }
                    const {data} = await sendReset({email});
                    setSentMail(!data.forgotPassword)
                }}
                >
                    <Box>
                    {sentMail && <Form>
                        <InputField name="email" placeholder="Email" label="Email"/>
                        <Button type="submit" mt={4}>Reset Password</Button>
                    </Form>}
                    {!sentMail &&
                    <p>Email sent sucessfully</p>
                    }
                    </Box>
                </Formik>
            </Wrapper>
        );
}
export default withUrqlClient(createUrqlClient)(forgotpassword);