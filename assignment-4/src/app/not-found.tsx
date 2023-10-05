import Link from "next/link"

export default function NotFound() {
  return(
    <div className="error-wrapper flex items-center justify-center h-screen flex-col">
      <h1 className=" text-9xl font-bold p-8">404</h1>
      <h2 className=" text-lg font-semibold">Page not found</h2>
      <Link href="/" className=" p-8 text-red-500 font-semibold text-xl">Back to home page</Link>
    </div>
  )    
}