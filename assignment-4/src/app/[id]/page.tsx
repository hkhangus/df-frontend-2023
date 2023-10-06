'use client'

import Link from 'next/link'
import { useParams, notFound, redirect, useRouter } from 'next/navigation'
import { ModalDelete } from '../../components'
import { DEFAULT_BOOK } from '../../data/data'
import { useState } from 'react'
import { useBook } from '../../context/BookContext'



export default function BookDetail() {

  const {books,deleteBookContext} = useBook()

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)

  const router = useRouter()
  const params = useParams()

  const bookDetail = books.find((book) => `${book.id}` === params.id)

  if (!bookDetail) return notFound()

  function handleOpen(e) {
    e.preventDefault()
    setDeleteModalOpen(true)
  }

  return (
      <div className="app__container bg-color h-screen w-full bg-zinc-200 p-6 ">
        <Link href={'./'} className="  text-red-500 text-xl mb-10 block">
          Back
        </Link>
        <h1 className=' font-bold text-2xl mb-10'>{bookDetail?.name}</h1>
        <div className=' text-xl'>
          <h2 className=' font-bold'>Author: <span className=' font-normal'>{bookDetail.author}</span></h2>
          
        </div>
        <div className=' text-xl'>
          <h2 className=' font-bold'>Topic: <span className=' font-normal'>{bookDetail.topic}</span></h2>
        </div>

        <button
          className="  text-red-500 underline mt-10 text-xl"
          onClick={(e) => handleOpen(e)}
        >
          Delete
        </button>

        <ModalDelete
        openModalDelete={isDeleteModalOpen}
        setModalDeleteOpen={setDeleteModalOpen}
        book={bookDetail}
        handleDelete={(item) => {
          deleteBookContext(item)
          router.back()
        }} 
      />
      </div>
  )
}
