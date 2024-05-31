import '@smastrom/react-rating/style.css'
import { useState } from 'react';
import { useLoaderData } from "react-router-dom";
import BookCard from '../components/BookCard';
import TableView from '../components/TableView';
import axios from 'axios';

const AllBooks = () => {
    const loadAllBooks = useLoaderData();
    const [allBooks, setAllBooks] = useState(loadAllBooks);
    const [isGridView, setIsGridView] = useState(true);

    const handleAvailable = (e) => {
        const isChecked = e.target.checked;

        if (isChecked) {
            const filtered = allBooks.filter(book => book.quantity > 0);
            setAllBooks(filtered)
        } else {
            setAllBooks(loadAllBooks)
        }
    }

    const handleSearch = e => {
        const value = e.target.value;
        console.log(value);

        axios.get(`https://intellishelf-server.vercel.app/books?search=${value}`)
            .then(res => {
                setAllBooks(res.data)
            })
    }

    return (
        <div className="container p-2 mx-auto sm:p-4">
            <h2 className="mb-4 text-3xl font-semibold leading-tight text-center">All Books</h2>
            <p className="mb-8 text-center">Welcome to our extensive collection of books covering a wide range of topics. Whether you are interested in science, business, computer science, or health, you will find something to pique your curiosity and expand your horizons. Start your journey of exploration and discovery today!</p>
            <div className='p-4 mb-4 border-2 rounded-lg'>
                <h1 className='text-2xl text-center border-b'>Filters</h1>
                <div className='grid grid-flow-col place-items-center'>
                    <div>
                        <label className="flex items-center gap-2 input input-bordered">
                            <input onChange={handleSearch} type="text" className="grow" placeholder="Search" />
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                        </label>

                    </div>
                    <div className="form-control">
                        <label className="cursor-pointer label">
                            <span className="label-text">Show available books</span>
                            <input type="checkbox" onChange={handleAvailable} className="ml-1 checkbox checkbox-accent" />
                        </label>
                    </div>
                    <details className="dropdown">
                        <summary className="m-1 btn">View type</summary>
                        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                            <li><button onClick={() => setIsGridView(true)}>Card View</button></li>
                            <li><button onClick={() => setIsGridView(false)}>Table View</button></li>
                        </ul>
                    </details>
                </div>
            </div>
            {
                isGridView ? (
                    <div className="gap-6 md:grid md:grid-cols-2 lg:grid-cols-3 place-items-center">
                        {
                            allBooks.map((book, idx) => <BookCard book={book} key={idx}></BookCard>)
                        }
                    </div>
                ) : (
                    <TableView allBooks={allBooks}></TableView>
                )
            }



        </div>
    );
};

export default AllBooks;