/* eslint-disable @next/next/no-img-element */
'use client';
import apiHandler from "@/api/searchHandler";
import { Rating } from "@mui/material";
import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("One Up on Wall Street");
  const [books, setBooks] = useState(null);
  const [loading, setLoading] = useState(false);

  const getBooks = async () => {
    try {
      let title = query.replace(/ /g, "+");
      setLoading(true);
      const { data } = await apiHandler(title);
      setBooks(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:px-12 px-4 bg-background font-poppins items-center min-h-screen">
      <h1 className="md:text-6xl text-4xl font-bold text-primary mt-10">
        <span className="text-active">Books</span> Search
      </h1>
      <h2 className="text-primary text-2xl font-light mt-6 font-ebas">
        Books searching using google books API
      </h2>
      <form
        className="sm:mx-auto mt-10 justify-center sm:w-full sm:flex"
        onSubmit={(e) => {
          getBooks();
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <input
          type="text"
          className="flex w-full sm:w-1/3 rounded-lg px-5 py-3 text-base text-background font-semibold focus:outline-none focus:ring-2 focus:ring-active"
          placeholder="Enter the book's title"
          defaultValue={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setBooks(null);
          }}
        />

        <div className="mt-4 sm:mt-0 sm:ml-3">
          <button
            className="block w-full rounded-lg px-5 py-3 bg-active text-base text-primary font-bold hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary sm:px-10"
            type="submit"
          >
            {loading ? (
              <span className="animate-pulse">Loading..</span>
            ) : (
              <>Search</>
            )}
          </button>
        </div>
      </form>

      {books && (
        <div className="mt-10">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-3">
            {books['items'].map((book) => {
              return (
                <div key={book.id} className="pt-6">
                  <div className="flow-root bg-light rounded-lg px-4 pb-8">
                    <div className="-mt-6">
                      <div className="flex items-center justify-center">
                        <img
                          src={
                            // Removes compression to get higher quality
                            book.volumeInfo.imageLinks && book.volumeInfo.imageLinks['thumbnail'] 
                            && 
                            book.volumeInfo.imageLinks['thumbnail'] .replace(/._SX50_|._SY75_/gi, "") ||
                            "https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149341898.jpg?w=2000"
                          }
                          className="p-2 w-64 rounded-lg"
                          alt={book.volumeInfo.title}
                        />
                      </div>
                      <div className="text-center justify-center items-center">
                        <h3 className="mt-4 text-lg font-bold w-full break-words overflow-x-auto text-primary tracking-tight">
                          {book.volumeInfo.title}
                        </h3>
                        <p className="mt-2 text-base leading-relaxed text-secondary">
                          {book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : "-"} ({book.volumeInfo.publishedDate || <span className="text-secondary">No Information</span>})
                        </p>
                        <span className="font-bold text-secondary">
                          Rating: {
                          book.volumeInfo.averageRating ?
                          <div style={{ display: "flex", justifyContent: "center", marginTop: ".5rem" }}>
                            <Rating 
                            name="read-only"
                            value={book.volumeInfo.averageRating}
                            precision={0.1}
                            readOnly 
                          /> ({book.volumeInfo.averageRating})
                          </div>
                          :
                          <div style={{ display: "flex", justifyContent: "center", marginTop: ".5rem" }}>
                            <Rating name="read-only" value={0.3} precision={0.1} readOnly /> (Not Found)
                          </div>
                        }
                        </span>
                        <a
                          href={book.volumeInfo.previewLink}
                          className="mt-4 block text-active underline"
                        >
                          Read More
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-20 mb-10 text-center">
        <p className="text-primary text-xs">
          Handrafted with ❤{" "}
          <a
            className="hover:text-active"
            href="https://www.linkedin.com/in/m-faisal-adi-soesatyo-2b27611b6/"
          >
            Muhammad Faisal Adi Soesatyo
          </a>
        </p>
      </div>
    </div>
  );
}
