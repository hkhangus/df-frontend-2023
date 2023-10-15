import Link from 'next/link'
import { useAuthSWR } from '../utils/hooks/apis/useAuthSWR'

export default function Header() {
  const {profile,logout} = useAuthSWR()
  return (
    <header className=" border-b-2 border-black">
      <nav className="navbar flex w-full items-center justify-between p-8">
        <Link href="/bookstore" id="bookstore" className=" text-5xl font-bold">
          Bookstore
        </Link>
        <div className="flex items-center gap-x-2">
          <img
            className="rounded-full"
            width={30}
            height={30}
            src="https://i.pinimg.com/736x/cc/80/f3/cc80f38579887963c2d71d7060081ea3.jpg"
            alt="avt"
            id="avt"
          />
          <span className=" text-lg">John Doe</span>
          <button onClick={logout} className=" text-lg text-red-500 underline">
            Log out
          </button>
        </div>
      </nav>
    </header>
  )
}
