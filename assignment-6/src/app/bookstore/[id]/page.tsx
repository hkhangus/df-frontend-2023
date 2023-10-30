'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useParams, notFound, useRouter } from 'next/navigation'
import { ModalDelete } from '../../../components'
import { useBookSWR } from '../../../utils/hooks/apis/useBookSWR'
import useSWR from 'swr'


export default function BookDetail() {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)

  const router = useRouter()
  const params = useParams()
  const bookId = Number(params?.id as string)
  console.log(params, bookId)
  const {bookDetail, handleDeleteBook,books} = useBookSWR({bookId,})
  console.log('books',books)
  // const { data, error, isLoading } = useSWR(['book-detail', bookId], () => bookApi.get(bookId))
  // const bookDetail = data?.data
  // const {handleDeleteBook} = useBookSWR()
  // console.log(bookDetail)
  

  console.log(bookDetail)
  if (!bookDetail) return notFound()

  function handleOpen(e) {
    e.preventDefault()
    setDeleteModalOpen(true)
  }

  return (
    <div className="app__container bg-color h-screen w-full bg-zinc-200 p-6 ">
      <Link href="./" className="  mb-10 block text-xl text-red-500">
        Back
      </Link>
      <h1 className=" mb-10 text-2xl font-bold">{bookDetail?.name}</h1>
      <div className=" text-xl">
        <h2 className=" font-bold">
          Author: <span className=" font-normal">{bookDetail.author}</span>
        </h2>
      </div>
      <div className=" text-xl">
        <h2 className=" font-bold">
          Topic: <span className=" font-normal">{bookDetail.topic.name}</span>
        </h2>
      </div>

      <button
        className="  mt-10 text-xl text-red-500 underline"
        onClick={(e) => handleOpen(e)}
      >
        Delete
      </button>

      <ModalDelete
        openModalDelete={isDeleteModalOpen}
        setModalDeleteOpen={setDeleteModalOpen}
        book={bookDetail}
        handleDelete={(item) => {
          handleDeleteBook(item)
          router.back()
        }}
      />
    </div>
  )
}
