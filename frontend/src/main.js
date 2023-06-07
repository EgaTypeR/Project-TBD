import { useState } from "react";
import Fetch from "./fetch"
import { Modal } from "./components/Modal";





function Main() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rowToEdit, setRowToEdit] = useState(null);
  const handleEditRow = (index) => {
    setModalOpen(true);
  };
  return (
    <>
      <div className="justify-center items-center py-20 lg:py-10 px-3 lg:px-28 h-screen">
        <div className="text-4xl font-bold text-blue my-12 mx-auto">
          <h1 className="text-3xl sm:text-5xl font-bold mb-12 text-dark-blue">
            {" "}
            Good Reading Bookstore{" "}
          </h1>
        </div>
        <div>
          <Fetch 
            editRow={handleEditRow}
          />
          <button
            onClick={() => setModalOpen(true)}
            className="mt-4 mx-auto border-none bg-blue-600 text-white py-2 px-4 rounded-lg cursor-pointer shadow-md"
          >
            Add
          </button>
          {modalOpen && (
            <Modal
              closeModal={() => {
                setModalOpen(false);
              }}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Main;