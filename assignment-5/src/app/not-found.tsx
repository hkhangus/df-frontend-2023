import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="error-wrapper flex h-screen flex-col items-center justify-center">
      <h1 className=" p-8 text-9xl font-bold">404</h1>
      <h2 className=" text-lg font-semibold">Page not found</h2>
      <Link href="/" className=" p-8 text-xl font-semibold text-red-500">
        Back to home page
      </Link>
    </div>
  )
}
