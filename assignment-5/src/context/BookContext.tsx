'use client'

import { createContext, useContext, useMemo } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { Book, BookList } from '../types'
import { DEFAULT_BOOK } from '../data/data'

interface BookContextType {
  books: BookList
  deleteBookContext: (deletebook: Book) => void
  addBookContext: (book: Book) => void
  editBookContext: (oldBook: Book, newBook: Book) => void
}

const BookContext = createContext<BookContextType | null>(null)

export const useBook = () => {
  const currentContext = useContext(BookContext)

  if (!currentContext) {
    throw new Error('Not found BookContext')
  }

  return currentContext
}

export default function BookProvider(props) {
  const [books, setBookList] = useLocalStorage<BookList>('books', DEFAULT_BOOK)

  const handleDelete = (deletebook: Book) => {
    setBookList(books.filter((book) => book !== deletebook))
  }

  const handleAdd = (book: Book) => {
    setBookList([...books, book])
  }

  const handleEdit = (oldBook: Book, newBook: Book) => {
    setBookList(
      books.map((book) => {
        if (book === oldBook) return newBook
        else return book
      }),
    )
  }

  const value = useMemo(
    () => ({
      books,
      deleteBookContext: handleDelete,
      addBookContext: handleAdd,
      editBookContext: handleEdit,
    }),
    [books, handleDelete, handleAdd, handleEdit],
  )

  return <BookContext.Provider value={value} {...props} />
}
