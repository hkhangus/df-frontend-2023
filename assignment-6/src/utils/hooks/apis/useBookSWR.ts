'use client'

import useSWR, { SWRConfiguration } from 'swr'
import { bookApi } from '../../../services/book_api'
import { Book, BookPayload, ListParams, Pagination } from '../../../types'

import { isSSR } from '../../functions'

export interface UseBookSWRProps {
  options?: SWRConfiguration
  params?: Partial<ListParams>
  bookId?: number | string
}

const defaultParams = {
  page: 1,
  pageSize: 5,
}

export function useBookSWR({
  options,
  params = defaultParams,
  bookId,
}: UseBookSWRProps = {}) {
  const { data, error, isLoading, mutate } = useSWR(
    ['book-list', params],
    () => bookApi.getAll(params),
    {
      keepPreviousData: true,
      isPaused: () => (isSSR() ? true : Boolean(bookId)),
      ...options,
    },
  )
  // console.log(params)
  console.log('bookID:', bookId)
  const {
    data: detailData,
    isLoading: isDetailLoading,
    mutate: detailMutate,
  } = useSWR(['book-detail', bookId], () => bookApi.get(+bookId!), {
    isPaused: () => (isSSR() ? true : Boolean(!bookId)),
    ...options,
  })
  console.log('bookDetail', data)

  async function addNewBook(payload: BookPayload) {
    try {
      const newBook = await bookApi.add({
        ...payload,
        topicId: +payload.topicId,
      })

      mutate()
    } catch (error) {
      console.log(error)
    }
  }

  async function updateBook(id: string | number, payload: BookPayload) {
    try {
      const updatedBook = await bookApi.update(id, {
        ...payload,
        topicId: +payload.topicId,
      })

      if (bookId) {
        detailMutate()
      } else {
        mutate()
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function deleteBook(deletedBook: Book) {
    try {
      await bookApi.delete(deletedBook.id)

      mutate()
    } catch (error) {
      console.log(error)
    }
  }

  return {
    books: data?.data ?? [],
    metaData: (data?.metadata as Pagination) ?? {},
    bookDetail: detailData?.data,
    handleAddBook: addNewBook,
    handleUpdateBook: updateBook,
    handleDeleteBook: deleteBook,
    isLoading,
    isDetailLoading,
    isError: error,
  }
}
