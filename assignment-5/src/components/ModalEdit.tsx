import { Dispatch, SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Book } from '../types'

const BookSchema = z.object({
  name: z.string().min(5, { message: 'Must be 5 or more characters long' }),
  author: z
    .string()
    .regex(/^[a-zA-Z\s]+$/, { message: 'Only letters and spaces' }),
})

type BookSchemaType = z.infer<typeof BookSchema>

interface ModalEditProps {
  setModalEditOpen: Dispatch<SetStateAction<boolean>>
  // setBooks,
  book: Book
  editBook
}

export default function ModalEdit({
  setModalEditOpen,
  book,
  editBook,
}: ModalEditProps) {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<BookSchemaType>({
    defaultValues: {
      name: book.name,
      author: book.author,
    },
    resolver: zodResolver(BookSchema),
  })

  const [topic, setTopic] = useState<string>(book.topic)

  const handleEditBook = handleSubmit(async (formValues) => {
    if (!errors.author && !errors.name) {
      const newBook: Book = {
        ...book,
        name: formValues.name,
        author: formValues.author,
        topic,
      }
      editBook(book, newBook)
      setModalEditOpen(false)
    }
  })

  return (
    <div className="modal modal-add">
      <div className="form-wrapper">
        <div className="form add-form">
          <h2 className="form-header">
            Edit book
            <button
              className="close"
              type="button"
              onClick={() => setModalEditOpen(false)}
            >
              &#x2716;
            </button>
          </h2>
          <form className="form__content">
            <div className="input-wrap">
              <h3 className="input-header">Name</h3>
              <input
                {...register('name')}
                className="input"
                type="text"
                placeholder="text"
                id="input-name"
                name="name"
                required
              />
              {errors.name && (
                <span className=" text-red-500">{errors.name.message}</span>
              )}
            </div>
            <div className="input-wrap">
              <h3 className="input-header">Author</h3>
              <input
                {...register('author')}
                className="input"
                type="text"
                placeholder="text"
                id="input-author"
                name="author"
                required
              />
              {errors.author && (
                <span className=" text-red-500">{errors.author.message}</span>
              )}
            </div>
            <div className="input-wrap">
              <h3 className="input-header">Topic</h3>
              <select
                id="input-topic"
                name="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              >
                <option value="Programming">Programming</option>
                <option value="Databse">Databse</option>
                <option value="DevOps">DevOps</option>
              </select>
            </div>
            <div className="form__btn">
              <button
                className="btn btn-create btn-primary float-right"
                type="submit"
                onClick={(e) => {
                  e.preventDefault()
                  handleEditBook()
                }}
              >
                Edit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
