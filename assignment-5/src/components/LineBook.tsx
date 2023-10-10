'use client'

import Link from 'next/link'
import { Dispatch, SetStateAction } from 'react'
import { Book } from '../types'

interface LineBookProps {
  book: Book
  setModalDeleteOpen: Dispatch<SetStateAction<boolean>>
  setDeleteBook: Dispatch<SetStateAction<Book>>
  setModalEditOpen: Dispatch<SetStateAction<boolean>>
  setEditBook: Dispatch<SetStateAction<Book>>
  
}

export default function LineBook({
  book,
  setModalDeleteOpen,
  setDeleteBook,
  setModalEditOpen,
  setEditBook
}: LineBookProps) {
  function handleOpenDelete(e, book) {
    e.preventDefault()
    setModalDeleteOpen(true)
    setDeleteBook(book)
  }

  function handleOpenEdit(e,book){
    e.preventDefault()
    setModalEditOpen(true)
    setEditBook(book)
  }

  return (
    <tr key={book.id}>
      <td>{book.name}</td>
      <td>{book.author}</td>
      <td>{book.topic}</td>
      <td className="delete-click">
        <button
          className=" border-r-2 border-solid border-red-500 pr-2 text-red-500 underline"
          onClick={(e) => handleOpenDelete(e, book)}
        >
          Delete
        </button>
        <button className="border-r-2 border-solid border-red-500 pl-2 pr-2 text-red-500 underline">
          <Link href={`./${book.id}`}>View</Link>
        </button>
        <button
          className=" pl-2 text-red-500 underline"
          onClick={(e) => handleOpenEdit(e, book)}
        >
          Edit
        </button>
      </td>
    </tr>
  )
}
