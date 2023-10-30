import { Dispatch, SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Book, BookPayload, Topic } from '../types'

function generateRandomString() {
  return Number(Math.random().toString(36).substring(2, 15))
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
    register,
    handleSubmit,
  } = useForm<BookSchemaType>({
    defaultValues: {
      name: '',
      author: '',
    },
    resolver: zodResolver(BookSchema),
  })

  const TopicValues: Topic[] = [
    { id: 1, name: 'Programming', code: 'programming' },
    { id: 2, name: 'Databse', code: 'databse' },
    { id: 3, name: 'DevOps', code: 'devops' },
  ]

  const [topic, setTopic] = useState<Topic>(TopicValues[0])

  const onSubmit = handleSubmit(async (formValues) => {
    if (!errors.author && !errors.name) {
      const newBook: BookPayload = {
        name: formValues.name,
        author: formValues.author,
        topicId: topic.id,
      }
      setBooks(newBook)
      setTopic(TopicValues[0])
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
              <label htmlFor="input-name">
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
              </label>
            </div>
            <div className="input-wrap">
              <label htmlFor="input-author">
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
              </label>
            </div>
            <div className="input-wrap">
              <label htmlFor="input-topic">
                <h3 className="input-header">Topic</h3>
                <select
                  id="input-topic"
                  name="topic"
                  value={topic.name}
                  onChange={(e) => setTopic(TopicValues.filter((t) => t.name === e.target.value)[0])}
                >
                  <option value="Programming">Programming</option>
                  <option value="Databse">Databse</option>
                  <option value="DevOps">DevOps</option>
                </select>
              </label>
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
