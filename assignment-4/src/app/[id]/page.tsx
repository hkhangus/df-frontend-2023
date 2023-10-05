'use client'

import Link from "next/link"
import { useParams, notFound } from "next/navigation"
import { Button ,ModalDelete } from '../../components'

import { DEFAULT_BOOK } from "../page"
import NotFound from "../not-found"


export default function BookDetail(){
    const params = useParams()

    const bookDetail = DEFAULT_BOOK.find((book) => book.id === params.slug)

    if (!bookDetail) return notFound()

    function handleOpen(e, book) {
        e.preventDefault()
        // setModalDeleteOpen(true)
        // setDeleteBook(book)
      }

    return (
        <>
            <Link href={'./'}>Back</Link>
            <h1>${bookDetail?.name}</h1>
            <div>
                <h2>Author:</h2>
                <span>${bookDetail.author}</span>
            </div>
            <div>
                <h2>Topic:</h2>
                <span>${bookDetail.topic}</span>
            </div>

            <button className=" border-r-2 border-solid border-red-500 pr-2 text-red-500 underline" onClick={(e)=>handleOpen(e,bookDetail)}>
          Delete
        </button>

        {/* <ModalDelete
        openModalDelete={isDeleteModalOpen}
        setModalDeleteOpen={setDeleteModalOpen}
        book={deleteBook}
        handleDelete={(item: Book) => {
          setBooks(books.filter((book) => book.id !== item.id))
          
        }}
      /> */}
        </>
    )
}