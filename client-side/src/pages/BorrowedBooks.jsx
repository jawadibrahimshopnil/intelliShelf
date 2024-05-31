import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../routers/AuthProvider";
import { toast } from "react-toastify";
import useAxiosSecure from './../hooks/useAxiosSecure';

const BorrowedBooks = () => {
    const Row = ({ book, borrowBooks, setBorrowBooks }) => {
        const { _id, bookCollectionId, borrowedDate, bookName, returnDate, img, category } = book;
        const axiosSecure = useAxiosSecure();

        const handleReturn = (id) => {
            console.log(bookCollectionId)
            fetch(`https://intellishelf-server.vercel.app/returnbook/${_id}`,{
                method: "DELETE",
                headers: {
                    'content-type': 'application/json'
                },
                credentials: "include",
                body: JSON.stringify({bookCollectionId}),
            })
            .then(res=>res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        toast.success("Returned Successfully");
                        const remaining = borrowBooks.filter(book => book._id !== id);
                        setBorrowBooks(remaining);
                    } else {
                        console.log('not deleted')
                    }
                })
                .catch(err => console.log(err))

        }

        return (
            <tr className="border-b border-gray-700 hover:bg-base-200">
                <td className="p-4">
                    <img src={img} className="max-w-16 lg:max-w-20" />
                </td>
                <td className="px-6 py-4 font-semibold">
                    {bookName}
                </td>
                <td className="px-6 py-4 font-semibold">
                    {category}
                </td>
                <td className="px-6 py-4 font-semibold">
                    {borrowedDate}
                </td>
                <td className="px-6 py-4 font-semibold">
                    <span className="text-red-700">{returnDate}</span>
                </td>
                <td className="px-6 py-4">
                    <button onClick={() => handleReturn(_id)} className="btn font-medium bg-blue-500 text-white">Return</button>
                </td>
            </tr>
        )
    }
    
    const [borrowBooks, setBorrowBooks] = useState([]);
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get(`https://intellishelf-server.vercel.app/borrowed?email=${user.email}`)
        .then(data => setBorrowBooks(data.data))
    }, [user, axiosSecure])
    console.log(borrowBooks)

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-4 mx-2">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs bg-base-300 uppercase text-gray-500">
                    <tr>
                        <th scope="col" className="px-8 py-4">
                            Image
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Category
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Borrowed Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Return Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        
                        borrowBooks.map((book, idx) => <Row borrowBooks={borrowBooks} setBorrowBooks={setBorrowBooks} key={idx} book={book}></Row>)
                    }

                </tbody>
            </table>
        </div>

    );
};

export default BorrowedBooks;