import { Rating } from "@smastrom/react-rating";
import { Link } from "react-router-dom";

const TableView = ({allBooks}) => {
    const Row = ({ book }) => {
        const { _id, authorName, bookName, image_url:img, quantity, category, rating } = book;

        return (
            <tr className="border-b border-gray-700 hover:bg-base-200">
                <td className="p-4">
                    <img src={img} className="max-w-16 lg:max-w-20" />
                </td>
                <td className="px-5 py-4 font-semibold">
                    {bookName}
                </td>
                <td className="px-5 py-4 font-semibold">
                    {authorName}
                </td>
                <td className="px-5 py-4 font-semibold">
                    {category}
                </td>
                <td className={`px-5 py-4 font-semibold ${quantity < 1 ? 'text-red-500' : 'text-green-500'}`}>
                    {quantity}
                </td>
                <td className="px-5 py-4 font-semibold">
                    <span className="text-red-700">
                        <Rating
                            className='!inline-flex !align-bottom'
                            style={{ maxWidth: 120 }}
                            value={rating}
                            readOnly
                        />
                    </span>
                </td>
                <td className="px-5 py-4">
                    <Link to={`/updatebook/${_id}`} className="btn font-medium bg-blue-500 text-white">Update</Link>
                </td>
            </tr>
        )
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-4">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs bg-base-300 uppercase text-gray-500">
                    <tr>
                        <th scope="col" className="px-5 py-4">
                            Image
                        </th>
                        <th scope="col" className="px-5 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-5 py-3">
                            Author
                        </th>
                        <th scope="col" className="px-5 py-3">
                            Category
                        </th>
                        <th scope="col" className="px-5 py-3">
                            Quantity
                        </th>
                        <th scope="col" className="px-5 py-3">
                            Rating
                        </th>
                        <th scope="col" className="px-5 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allBooks.map((book, idx) => <Row key={idx} book={book}></Row>)
                    }

                </tbody>
            </table>
        </div>

    );
};

export default TableView;