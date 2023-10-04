'use client'

import React, { useEffect, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'
// import Image from 'next/image'
import { Book, BookList } from '../types'
import { Button, LineBook, ModalAdd, ModalDelete } from '../components'

const DEFAULT_BOOK: BookList = [
  {
    id: 1,
    name: 'Refactoring',
    author: 'Martin Fowler',
    topic: 'Programming',
  },
  {
    id: 2,
    name: 'Design Data-Intensive Applications',
    author: 'Martin Kleppman',
    topic: 'Database',
  },
  {
    id: 3,
    name: 'The Phoenix Project',
    author: 'Gene Kim',
    topic: 'DevOps',
  },
  {
    id: 4,
    name: 'The Pragmatic Programmer: Your Journey to Mastery',
    author: 'Andrew Hunt, David Thomas',
    topic: 'Software Development',
  },
  {
    id: 5,
    name: 'Effective Java',
    author: 'Joshua Bloch',
    topic: 'Java Programming',
  },
  {
    id: 6,
    name: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    topic: 'Literature',
  },
  {
    id: 7,
    name: '1984',
    author: 'George Orwell',
    topic: 'Science Fiction',
  },
  {
    id: 8,
    name: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    topic: 'Literature',
  },
]

export default function Home() {
  // const [books, setBooks] = useLocalStorage('books', DEFAULT_BOOK)

  const [books, setBooks] = useState(DEFAULT_BOOK)

  
  const [ isAddModalOpen, setAddModalOpen ] = useState(false)
  // Deletebook
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
  const [deleteBook, setDeleteBook] = useState(books[1])

  // useEffect(() => )

  // const books = DEFAULT_BOOK

  return (
    <>
      <div className="app__container bg-color h-screen w-full bg-zinc-200">
        <div className="control flex justify-between p-8 text-lg">
          <label htmlFor="search" className=" w-150">
            <input
              type="search"
              // value={searchValue}
              name="search"
              className="search h-full w-full rounded-xl border-2 border-solid border-zinc-400"
              placeholder="Search books"
              // onChange={(e) => handleSearch(e)}
            />
          </label>
          <Button
            className=" btn-primary"
            onClick={() => {
              setAddModalOpen(true)
            }}
          >
            Add book
          </Button>
        </div>

        <div className="table w-full p-5">
          <table className="table__content table-auto">
            <thead className="table__header">
              <tr>
                <th>Name</th>
                <th>Author</th>
                <th>Topic</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* <tr>
                <td>dsadas</td>
                <td>sdada</td>
                <td>Programming</td>
                <td className="delete-click">
                  <button className=" border-r-2 border-solid border-red-500 pr-2 text-red-500">
                    Delete
                  </button>
                  <button className="pl-2 text-red-500">View</button>
                </td>
              </tr>
              <tr>
                <td>Refactoring</td>
                <td>Martin Fowler</td>
                <td>Programming</td>
                <td className="delete-click">
                  <button className=" border-r-2 border-solid border-red-500 pr-2 text-red-500">
                    Delete
                  </button>
                  <button className="pl-2 text-red-500">View</button>
                </td>
              </tr> */}
              {books.map((book) => (
                <LineBook book={book} setModalDeleteOpen={setDeleteModalOpen} setDeleteBook={setDeleteBook}/>
              ))}
            </tbody>
          </table>
        </div>
        {/* {!isSearch ? (
          <div className="pagination__wrapper">
            <Pagination
              totalItems={books.length}
              itemsPerPage={PageSize}
              currentPage={page}
              onPageChange={handlePageChange}
            />
          </div>
        ) : null} */}
      </div>

      {isAddModalOpen ? (
        <ModalAdd  books={books} setModalAddOpen={setAddModalOpen} setBooks={setBooks}/>
      ) : null}
        
      <ModalDelete
        openModalDelete={isDeleteModalOpen}
        setModalDeleteOpen={setDeleteModalOpen}
        book={deleteBook}
        handleDelete={(item: Book) => 
        {
          setBooks(books.filter((book) => book.id !== item.id))
          // if (resultSearchBooks.includes(deleteBook)) {
          //   setResultBooks(resultSearchBooks.filter((book) => book.id !== item.id))
          // }
        }}
      />
    </>
  )
}