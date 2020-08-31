import React, { InputHTMLAttributes } from 'react'
import { FormControl, FormLabel, Input, FormErrorMessage } from '@chakra-ui/core';
import { useField } from 'formik';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    label:string,
    placeholder :string,
    name: string,
};

export const InputField:  React.FC<InputFieldProps> = ({label,size:_,...props}) => {
    const [field, { error }] = useField(props);
 return(
     <FormControl isInvalid={!!error}>
         <FormLabel htmlFor={field.name}>{label}</FormLabel>
         <Input {...field} {...props} id={field.name} placeholder={props.placeholder}/>
         {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
     </FormControl>
 );
}

