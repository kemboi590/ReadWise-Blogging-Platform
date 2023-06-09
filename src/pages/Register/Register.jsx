import React from 'react'
import './register.css'

import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'


const schema = yup.object().shape({
  fullname: yup.string().required('Full name is required'),
  email: yup.string().email('Email is invalid').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm password is required')
})

function Register() {

  const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(schema) })

  const sendDataToServer = (data) => {
    console.log(data)
    reset()
  }


  return (
    <div className="registrationPage">
      <h2 className='registrationTitle'>REGISTER</h2>

      <form onSubmit={handleSubmit(sendDataToServer)}>
        <>
          <input type="text" placeholder='Your full name' {...register("fullname")} />
          <p>{errors.fullname?.message}</p>
        </>
        <>
          <input type="email" placeholder='Your email' {...register("email")} />
          <p>{errors.email?.message}</p>
        </>
        <>
          <input type="password" placeholder='Your password' {...register("password")} />
          <p>{errors.password?.message}</p>
        </>
        <>
          <input type="password" placeholder='Confirm your password' {...register("confirmPassword")} />
          <p>{errors.confirmPassword?.message}</p>
        </>
           <input type="submit" value="REGISTER" className='submitbtn' />
      </form>
      
    </div>
  )
}

export default Register