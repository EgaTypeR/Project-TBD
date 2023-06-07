import React, { useState, useEffect } from "react";
import axios from "axios";

export const Modal = ({ closeModal, defaultValue }) => {
  const [formState, setFormState] = useState({
    book_title: "",
    isbn_13: "",
    release_year: 0,
    num_pages: 0,
    publisher_name: "",
    language_name: "",
  });
  const [errors, setErrors] = useState("");

  useEffect(() => {
    if (defaultValue) {
      setFormState(defaultValue);
    }
  }, [defaultValue]);

  const validateForm = () => {
    const { title, isbn, year, pages, publisher, language } = formState;
    if (title && isbn && year && pages && publisher && language) {
      setErrors("");
      return true;
    } else {
      const errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const onSubmit = async (formState) =>{
    handleSubmit();
  }
  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await axios.post('http://localhost:5000/api/v1/book', formState);
      console.log("123")
      setFormState(response.data)
      
    } catch (error) {
      console.log(error);
    }

    // closeModal();
  };

  return (
    <div
      className="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-40"
      onClick={(e) => {
        if (
          e.target.className ===
          "fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-40"
        )
          closeModal();
      }}
    >
      <div className="bg-white p-8 rounded-md w-64">
        <form>
          <div className="flex flex-col mb-4">
            <label htmlFor="name" className="font-semibold">
              Book Title
            </label>
            <input
              name="book_title"
              onChange={handleChange}
              value={formState.book_title}
              className="border border-black rounded-md p-1 text-base"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="email" className="font-semibold">
              ISBN
            </label>
            <input
            name="isbn_13"
              onChange={handleChange}
              value={formState.isbn_13}
              className="border border-black rounded-md p-1 text-base"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="title" className="font-semibold">
              Release Year
            </label>
            <input
              name="release_year"
              type="number"
              onChange={handleChange}
              value={formState.release_year}
              className="border border-black rounded-md p-1 text-base"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="department" className="font-semibold">
              Pages
            </label>
            <input
              name="num_pages"
              type="number"
              onChange={handleChange}
              value={formState.num_pages}
              className="border border-black rounded-md p-1 text-base"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="status" className="font-semibold">
              Publisher
            </label>
            <input
              name="publisher_name"
              onChange={handleChange}
              value={formState.publisher_name}
              className="border border-black rounded-md p-1 text-base"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="role" className="font-semibold">
              Language
            </label>
            <input
              name="language_name"
              onChange={handleChange}
              value={formState.language_name}
              className="border border-black rounded-md p-1 text-base"
            />
          </div>
          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <button
            type="submit"
            className="mt-4 border-none bg-blue-600 text-white py-2 px-4 rounded-lg cursor-pointer shadow-md"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};