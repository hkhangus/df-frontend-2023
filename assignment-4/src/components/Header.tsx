import Link from "next/link"

export default function Header() {
  return (
    <header className=" border-b-2 border-black">
      <nav className="navbar flex w-full justify-between items-center p-8">
        <Link href="./" id="bookstore" className=" font-bold text-5xl">
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
        </div>
      </nav>
    </header>
  )
}
