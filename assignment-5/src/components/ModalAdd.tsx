import { Dispatch, SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Book } from '../types'

function generateRandomString() {
  return Math.random().toString(36).substring(2, 15)
}

const BookSchema = z.object({
  name: z.string().min(5, { message: 'Must be 5 or more characters long' }),
  author: z
    .string()
    .regex(/^[a-zA-Z\s]+$/, { message: 'Only letters and spaces' }),
})

type BookSchemaType = z.infer<typeof BookSchema>

interface ModalAddProps {
  setModalAddOpen: Dispatch<SetStateAction<boolean>>
  setBooks
}

export default function ModalAdd({ setModalAddOpen, setBooks }: ModalAddProps) {
  const {
    formState: { errors },
    watch,
    register,
    handleSubmit,
  } = useForm<BookSchemaType>({
    defaultValues: {
      name: '',
      author: '',
    },
    resolver: zodResolver(BookSchema),
  })

  const [topic, setTopic] = useState<string>('Programming')

  const onSubmit = handleSubmit(async (formValues) => {
    console.log(formValues)
    if (!errors.author && !errors.name) {
      const newBook: Book = {
        id: generateRandomString(),
        name: formValues.name,
        author: formValues.author,
        topic: topic,
      }
      setBooks(newBook)
      setTopic('Programming')
    }
  })

  return (
    <div className="modal modal-add">
      <div className="form-wrapper">
        <div className="form add-form">
          <h2 className="form-header">
            Add book
            <button
              className="close"
              type="button"
              onClick={() => setModalAddOpen(false)}
            >
              &#x2716;
            </button>
          </h2>
          <form className="form__content" id="AddBook">
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
              <label htmlFor="author">
                <h3 className="input-header">Author</h3>
              </label>
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
              <label htmlFor="topic">
                <h3 className="input-header">Topic</h3>
              </label>
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
                form="AddBook"
                onClick={(e) => {
                  e.preventDefault()
                  onSubmit()
                }}
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
