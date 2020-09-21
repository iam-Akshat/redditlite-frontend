import { Button } from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import { InputField } from '../components/InputField';
import { Layout } from '../components/Layout';
import { useCreatePostMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { useIsAuth } from '../utils/useIsAuth';

interface createPostProps {

}

const createPost: React.FC<createPostProps> = ({}) => {
    const router = useRouter()
    useIsAuth();
    const [, createpost] = useCreatePostMutation();
        return (
            <Layout variant="small">
                <Formik
                initialValues={{title:"",text:""}}
                onSubmit={ async (values,{setErrors})=>{
                    if(!(values.text.length>6) || !(values.title.length>6)){
                        setErrors({text:"Must be greater than 6 chars",title:"Must be greater than 6 chars"})
                        return;
                    }
                    const {error}= await createpost({input:values});
                    if(!error){
                        router.push('/')
                    }
                    
                }}
                >
                    <Form>
                    <InputField name="title" placeholder="Nice Title" label="Title"/>
                    <InputField isTextArea name="text" placeholder="Be creative how else will ya get votes" label="Describe"/>
                    <Button mt={4} type="submit" variantColor="teal">create post</Button>
                    </Form>
                    
                </Formik>
            </Layout>
        );
}
export default withUrqlClient(createUrqlClient)(createPost);