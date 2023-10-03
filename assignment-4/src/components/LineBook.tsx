'use client'

import { Dispatch, SetStateAction } from 'react'
import { Book } from '../types'

interface LineBookProps {
  book: Book
  // setModalDelete: Dispatch<SetStateAction<boolean>>
  // setDeleteBook: Dispatch<SetStateAction<Book>>
}

export default function LineBook({
  book,
  // setModalDelete,
  // setDeleteBook,
}: LineBookProps) {
  // function handleOpen(e, book) {
  //   e.preventDefault()
  //   setModalDelete(true)
  //   setDeleteBook(book)
  // }

  return (
    <tr key={book.id}>
      <td>{book.name}</td>
      <td>{book.author}</td>
      <td>{book.topic}</td>
      <td className="delete-click">
        <button className=" border-r-2 border-solid border-red-500 pr-2 text-red-500">
          Delete
        </button>
        <button className="pl-2 text-red-500">View</button>
      </td>
    </tr>
  )
}
