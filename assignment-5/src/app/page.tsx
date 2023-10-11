'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'


export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {
    formState: { errors },
    watch,
    register,
    handleSubmit,
  } = useForm();

  const onSubmit = handleSubmit(async (formValues) => {
    console.log(formValues)
  })

  return (
    <div className=" modal">
      <div className="form-wrapper">
        <div className="form delete-form h-3/5 w-2/6">
          <div className=" form-header text-4xl text-red-500">
            Login in to Bookstore
          </div>
          <form action="" id="login">
            <label htmlFor="Email">Email</label>
            <div className="input-wrap">
              <input
                type="text"
                
                required
                {...register("email")}
              />
              <span className=" text-red-500">*Invalid email</span>
            </div>

            <label htmlFor="Password">Password</label>
            <div className="input-wrap">
              <input
                type="text"
                
                required
                {...register("password")}
              />
            </div>
          </form>
          <button
            type="submit"
            children={'Login'}
            className="btn-primary"
            form="login"
            onClick={(e) => onSubmit(e)}
          />
        </div>
      </div>
    </div>
  )
}
