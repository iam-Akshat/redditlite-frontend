import React from 'react'
import { NextPage } from 'next';
import { RegularUserFragmentDoc, useChangePasswordMutation } from '../../generated/graphql';
import { Formik, Form } from 'formik';
import { InputField } from '../../components/InputField';
import { Wrapper } from '../../components/Wrapper';
import { Button } from '@chakra-ui/core';
import { validatePassword } from '../../utils/validator';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { toErrorMap } from '../../utils/errorToMap'
import { useRouter } from 'next/router';


export const ChangePassword: NextPage= () => {
        const router  = useRouter() 
        const  [,change] = useChangePasswordMutation()
        return (
        <Wrapper variant="small">
            <Formik initialValues={{p1:"",p2:""}} 
            onSubmit={async ({p1,p2},{setErrors})=>{
                const isNotValidP = validatePassword(p1)
                if(isNotValidP){
                    setErrors({p1:`${isNotValidP}`})
                    return;
                }
                if(p1!==p2){
                    setErrors({p1:'password dont match',p2:"password dont match"})
                    return;
                }
                const {data} = await change({token:router.query.token as string,password:p1})
                if(data.changePassword.errors){
                    setErrors({p1:"Invalid Link",p2:"Invalid link"})
                    return;
                }
                
                
                router.push('/login')
            }}
            ><Form>
                <InputField type="password" name="p1" placeholder="Your new Password" label="New Password"></InputField>
                <InputField type="password" name="p2" placeholder="Confirm your new Password" label="Confirm new Password"></InputField>
                <Button mt="4" type="submit">Change Password</Button>
            </Form>
                
            </Formik>
        </Wrapper>
        );
}
export default withUrqlClient(createUrqlClient)(ChangePassword);