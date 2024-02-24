import { useState } from "react";

export default function useFormValidation() {
   const [values, setValues] = useState({})
   const [errors, setErrors] = useState({})
   const [isValid, setIsValid] = useState(false)

   function handleChange(e) {
      const input = e.target;
      const name = input.name;
      const value = input.value;
  
      setValues({...values, [name]: value});
      setErrors({...errors, [name]: input.validationMessage});
      setIsValid(input.closest('form').checkValidity());
    };



   return { values, errors, isValid, handleChange }
}