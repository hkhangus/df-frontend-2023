'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

const LoginSchema = z.object({
  email: z.string().email({message:"*Invalid email"}),
  password: z.string().regex(/^(?=.*[A-Z])(?=.*\W)(?=.*\d)[a-zA-Z0-9\W]{8,}$/,{message: "*Invalid password. Minimum of 8 characters with at least 1 uppercase and 1 symbol"}),
})

type LoginSchemaType = z.infer<typeof LoginSchema>

export default function Login() {
  const router = useRouter()
  const {
    formState: { errors },
    watch,
    register,
    handleSubmit,
  } = useForm<LoginSchemaType>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(LoginSchema),
  })

  const onSubmit =
    handleSubmit(async () => {
      if (!errors.email && !errors.password) {
        router.push('./bookstore')
      }
    })

  return (
    <div className=" modal modal-add">
      <div className="form-wrapper">
        <div className="form delete-form h-3/5 w-2/6">
          <div className=" form-header text-4xl text-red-500">
            Login in to Bookstore
          </div>
          <form action="" id="login" className=' p-10'>
            <label htmlFor="Email">Email</label>
            <div className="input-wrap">
              <input type="text" required {...register('email')} />
              {errors.email && (
                <span className=" text-red-500">{errors.email.message}</span>
              )}
            </div>

            <label htmlFor="Password">Password</label>
            <div className="input-wrap">
              <input type="text" required {...register('password')} />
              {errors.password && (
                <span className=" text-red-500">{errors.password.message}</span>
              )}
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
