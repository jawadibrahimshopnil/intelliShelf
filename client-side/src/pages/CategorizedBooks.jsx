import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { Link, useLoaderData } from "react-router-dom";

const BookCard = ({book}) => {
    const {_id, authorName, bookName, image_url:img, category, rating, shortDescription, quantity} = book;

    return (
        <div className="card max-w-md h-80 card-compact card-side bg-base-100 shadow-xl border border-gray-400 overflow-hidden mx-auto max-md:mb-4">
            <img className='w-2/5' src={img} alt="Movie" />
            <div className="card-body">
                <h2 className="card-title">{bookName}</h2>
                <p className='text-base'>{shortDescription}</p>
                <div className='text-base'>
                    <p><span className='font-semibold'>Author: </span> {authorName}</p>
                    <p><span className='font-semibold'>Category: </span> {category}</p>
                    <p className={`${quantity<1 ? 'text-red-500' : 'text-green-500'}`}><span className="font-semibold ">Quantity: </span> {quantity}</p>
                    <div>
                        <span className='font-semibold'>Rating: </span>
                        <Rating
                            className='!inline-flex !align-bottom'
                            style={{ maxWidth: 120 }}
                            value={rating}
                            readOnly
                        />
                    </div>
                </div>
                <div className="card-actions">
                    <Link to={`/book/${_id}`} className="btn bg-blue-500 text-white">Details</Link>
                </div>
            </div>
        </div>
    )
}

const CategorizedBooks = () => {
    const allBooks = useLoaderData();

    return (
        <div className="container p-2 mx-auto sm:p-4">
            <h2 className="mb-4 text-3xl font-semibold leading-tight text-center">Books of Specific Category</h2>
            <p className="text-center mb-8">Welcome to our extensive collection of books covering a wide range of topics. Whether you are interested in science, business, computer science, or health, you will find something to pique your curiosity and expand your horizons. Start your journey of exploration and discovery today!</p>
            <div className="md:grid md:grid-cols-2 lg:grid-cols-3 place-items-center gap-6">
                {
                    allBooks.map((book, idx) => <BookCard book={book} key={idx}></BookCard>)
                }
            </div>


        </div>
    );
};

export default CategorizedBooks;