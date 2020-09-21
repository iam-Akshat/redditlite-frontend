import React, { InputHTMLAttributes } from 'react'
import { FormControl, FormLabel, Input, FormErrorMessage, Textarea } from '@chakra-ui/core';
import { useField } from 'formik';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    label:string,
    placeholder :string,
    name: string,
    isTextArea?:Boolean
};

export const InputField:  React.FC<InputFieldProps> = ({label,isTextArea,size:_,...props}) => {
    let C;
    if(isTextArea){
        C=Textarea
    }else{
        C=Input
    }
    const [field, { error }] = useField(props);
 return(
     <FormControl isInvalid={!!error}>
         <FormLabel htmlFor={field.name}>{label}</FormLabel>
         <C {...field} {...props} id={field.name} placeholder={props.placeholder}/>
         {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
     </FormControl>
 );
}

