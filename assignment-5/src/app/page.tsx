'use client'

import { Button } from "../components"

export default function Login() {
  return (
    <div className=" modal">
      <div className="form-wrapper">
        <div className="form delete-form h-3/5 w-2/6">
            <div className=" form-header text-red-500 text-4xl">
                Login in to Bookstore
            </div>
            <form action="">
                <label htmlFor="Email">Email</label>
                <div className="input-wrap">
                    <input type="text" name="Email" required/>
                    <span className=" text-red-500">*Invalid email</span>
                </div>
                
                <label htmlFor="Password">Password</label>
                <div className="input-wrap">
                    <input type="text" name="Password" required/>
                </div>
            </form>
            <Button children={'Login'} className="btn-primary"/>
        </div>
      </div>
    </div>
  )
}
