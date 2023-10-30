'use client'

import React, { useState, useMemo } from 'react'
import { Book, BookList } from '../../types'
import { useBookSWR } from '../../utils/hooks/apis/useBookSWR'
import {
  Button,
  LineBook,
  ModalAdd,
  ModalDelete,
  ModalEdit,
  Pagination,
} from '../../components'


export default function BookHome() {
  const PAGE_SIZE = 5

  const {books, handleAddBook, handleDeleteBook, handleUpdateBook} = useBookSWR()
  console.log('books',books)
  const [isAddModalOpen, setAddModalOpen] = useState(false)
  // Deletebook
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
  const [deleteBook, setDeleteBook] = useState(books[1])
  // Editbook
  const [isEditModalOpen, setEditModalOpen] = useState(false)
  const [editBook, setEditBook] = useState(books[1])

  // For search book
  const [isSearch, setIsSearch] = useState<boolean>(false)
  const [searchValue, setSeachValue] = useState<string>('')
  const [resultSearchBooks, setResultBooks] = useState<BookList>(books)

  const [page, setPage] = useState<number>(1)

  const displayBook = useMemo<BookList>(() => {
    const firstPageIndex = (page - 1) * PAGE_SIZE
    const lastPageIndex = firstPageIndex + PAGE_SIZE
    return books.slice(firstPageIndex, lastPageIndex)
  }, [page, books])

  function handleSearch(e) {
    setSeachValue(e.target.value)
    if (e.target.value === '') {
      setIsSearch(false)
      return
    }
    setIsSearch(true)
    setResultBooks(
      books.filter((book) => book.name.toLowerCase().includes(searchValue)),
    )
  }

  const handlePageChange = (page: number) => {
    setPage(page)
  }

  return (
    <>
      <div className="app__container bg-color h-screen w-full bg-zinc-200">
        <div className="control flex justify-between p-8 text-lg">
          <label htmlFor="search" className=" w-15 h-12">
            <input
              type="search"
              value={searchValue}
              name="search"
              className="search h-full w-full rounded-xl border-2 border-solid border-zinc-400"
              placeholder="Search books"
              onChange={(e) => handleSearch(e)}
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
              {isSearch
                ? resultSearchBooks.map((book) => (
                    <LineBook
                      key={book.id}
                      book={book}
                      setModalDeleteOpen={setDeleteModalOpen}
                      setDeleteBook={setDeleteBook}
                      setModalEditOpen={setEditModalOpen}
                      setEditBook={setEditBook}
                    />
                  ))
                : displayBook.map((book) => (
                    <LineBook
                      key={book.id}
                      book={book}
                      setModalDeleteOpen={setDeleteModalOpen}
                      setDeleteBook={setDeleteBook}
                      setModalEditOpen={setEditModalOpen}
                      setEditBook={setEditBook}
                    />
                  ))}
            </tbody>
          </table>
        </div>

        {!isSearch ? (
          <div className="pagination__wrapper">
            <Pagination
              totalItems={books.length}
              itemsPerPage={PAGE_SIZE}
              currentPage={page}
              onPageChange={handlePageChange}
            />
          </div>
        ) : null}
      </div>

      {isAddModalOpen ? (
        <ModalAdd setModalAddOpen={setAddModalOpen} setBooks={handleAddBook} />
      ) : null}

      <ModalDelete
        openModalDelete={isDeleteModalOpen}
        setModalDeleteOpen={setDeleteModalOpen}
        book={deleteBook}
        handleDelete={(item: Book) => {
          handleDeleteBook(item)
          if (isSearch && resultSearchBooks.includes(deleteBook)) {
            setResultBooks(
              resultSearchBooks.filter((book) => book.id !== item.id),
            )
          }
        }}
      />

      {isEditModalOpen ? (
        <ModalEdit
          setModalEditOpen={setEditModalOpen}
          book={editBook}
          editBook={handleUpdateBook}
        />
      ) : null}
    </>
  )
}
