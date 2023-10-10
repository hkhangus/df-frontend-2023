import { Dispatch, SetStateAction, useState } from 'react'
import { Book } from '../types'

function generateRandomString() {
  return Math.random().toString(36).substring(2, 15)
}

interface ModalEditProps {
  setModalEditOpen: Dispatch<SetStateAction<boolean>>
  // setBooks,
  book: Book,
  editBook
}

export default function ModalEdit({ setModalEditOpen, book, editBook }: ModalEditProps) {
  const [name, setName] = useState<string>(book.name)
  const [author, setAuthor] = useState<string>(book.author)
  const [topic, setTopic] = useState<string>(book.topic)

  function handleEditBook() {
    const newBook :Book = {
      ...book,
      name: name,
      author: author,
      topic: topic
    }
    editBook(book,newBook)
    setModalEditOpen(false)
  }

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
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input"
                type="text"
                placeholder="text"
                id="input-name"
                name="name"
                required
              />
            </div>
            <div className="input-wrap">
              <h3 className="input-header">Author</h3>
              <input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="input"
                type="text"
                placeholder="text"
                id="input-author"
                name="author"
                required
              />
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
