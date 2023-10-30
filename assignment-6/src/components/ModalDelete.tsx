import { Dispatch, SetStateAction } from 'react'
import { Book } from '../types'

interface ModalDeleteProps {
  book: Book
  openModalDelete: boolean
  setModalDeleteOpen: Dispatch<SetStateAction<boolean>>
  handleDelete: (item: Book) => void
}

export default function ModalDelete({
  book,
  openModalDelete,
  setModalDeleteOpen,
  handleDelete,
}: ModalDeleteProps) {
  function closeModal() {
    setModalDeleteOpen(false)
  }

  function clickDelete(
    e,
    handleDelete: (book: Book) => void,
    setModalDelete: Dispatch<SetStateAction<boolean>>,
    book: Book,
  ) {
    e.preventDefault()
    setModalDelete(false)
    handleDelete(book)
  }

  return openModalDelete ? (
    <div className="modal modal-delete">
      <div className="form-wrapper">
        <div className="form delete-form">
          <h2 className="form-header">
            Delete book
            <button className="close" type="button" onClick={closeModal}>
              &#x2716;
            </button>
          </h2>
          <div className="form__content delete-item w-full text-center">
            Do you want to delete
            <span className=" text-red-500"> {book.name} </span>
            book?
          </div>
          <div className="form__btn flex w-1/4 justify-between">
            <button
              className="btn-delete"
              onClick={(e) =>
                clickDelete(e, handleDelete, setModalDeleteOpen, book)
              }
            >
              Delete
            </button>
            <button className="btn btn-cancel btn-primary" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null
}
