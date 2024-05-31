import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import useAxiosSecure from "../hooks/useAxiosSecure";

const UpdateBook = () => {
    const book = useLoaderData();
    const {_id, rating, category, bookName, authorName, image_url:img} = book;
    console.log(book)
    const axiosSecure = useAxiosSecure();


    const handleUpdatebook = event => {
        event.preventDefault();

        const form = event.target;

        const authorName = form.authorName.value;
        const bookName = form.bookName.value;
        const category = form.category.value;
        const image_url = form.bookPhotoURL.value;
        const rating = form.rating.value;

        const updateBook = { authorName, bookName, category, image_url, rating }

        console.log(updateBook);

        // send data to the server
        axiosSecure.patch(`https://intellishelf-server.vercel.app/updatebook/${_id}`, updateBook)
            .then(data => {
                if (data.data.modifiedCount > 0) {
                    toast.success("book Updated Successfully")
                }
            })
    }

    return (

        <form onSubmit={handleUpdatebook} className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-base-200 my-4">
            <div className="space-y-2 col-span-full lg:col-span-1  text-center">
                <p className="font-bold text-2xl">Update <span className="text-blue-500">book</span></p>
                <p className="text-base">Here, you can update existing book to our collection.</p>
            </div>
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                {/* row 1 */}
                <div className="col-span-full sm:col-span-3">
                    <label htmlFor="bookName" className="">Book Name <span className="text-red-500">*</span></label>
                    <input required type="text" name="bookName" id="bookName" placeholder="ex: THE SKY" defaultValue={bookName} className="w-full px-4 py-2 border rounded-md border-gray-400" />
                </div>
                <div className="col-span-full sm:col-span-3">
                    <label htmlFor="authorName" className="">Author Name <span className="text-red-500">*</span></label>
                    <input required type="text" defaultValue={authorName} name="authorName" id="authorName" placeholder="ex: Jawad Ibrahim" className="w-full px-4 py-2 border rounded-md border-gray-400" />
                </div>

                {/* row 2 */}
                <div className="col-span-full">
                    <label htmlFor="bookPhotoURL" className="">Photo URL <span className="text-red-500">*</span></label>
                    <input required type="url" defaultValue={img} name="bookPhotoURL" id="bookPhotoURL" placeholder="ex: https://user.com/photo.jpg" className="w-full px-4 py-2 border rounded-md border-gray-400" />
                </div>
                

                <div className="col-span-full sm:col-span-3">
                    <label htmlFor="category" className="">Category <span className="text-red-500">*</span></label>
                    <select required name="category" defaultValue={category} id="category" className="select w-full px-4 py-2 border rounded-md border-gray-400 text-base">
                        <option>business</option>
                        <option>science</option>
                        <option>health</option>
                        <option>computer</option>
                        <option>novel</option>
                        <option>history</option>
                    </select>
                </div>
                <div className="col-span-full sm:col-span-3">
                    <label htmlFor="rating" className="">Rating <span className="text-red-500">*</span></label>
                    <input required type="number" min='1' defaultValue={rating} max="5" name="rating" id="rating" placeholder="ex: 4" className="w-full px-4 py-2 border rounded-md border-gray-400" />
                </div>
                
                
            </div>
            <div className="col-start-4 md:col-span-2 lg:col-start-2">
                <button className="btn w-full bg-blue-500 text-white text-base">Update book</button>
            </div>
        </form>
    );
};

export default UpdateBook;