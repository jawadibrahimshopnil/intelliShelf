import { Rating } from "@smastrom/react-rating";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
    const { _id, authorName, bookName, image_url: img, category, rating, shortDescription, quantity } = book;

    return (
        <div className="card max-w-md h-80 card-compact card-side bg-base-100 shadow-xl border border-gray-400 overflow-hidden mx-auto max-md:mb-4">
            <img className='w-2/5' src={img} alt="Movie" />
            <div className="card-body">
                <h2 className="card-title">{bookName}</h2>
                <p className='text-base'>{shortDescription}</p>
                <div className='text-base'>
                    <p><span className='font-semibold'>Author: </span> {authorName}</p>
                    <p><span className='font-semibold'>Category: </span> {category}</p>
                    <p className={`${quantity < 1 ? 'text-red-500' : 'text-green-500'}`}><span className="font-semibold ">Quantity: </span> {quantity}</p>
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
                    <Link to={`/updatebook/${_id}`} className="btn bg-blue-500 text-white">Update</Link>
                </div>
            </div>
        </div>
    )
}

export default BookCard;