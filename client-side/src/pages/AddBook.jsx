import { toast } from "react-toastify";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Addbook = () => {
    const axiosSecure = useAxiosSecure();

    const handleAddbook = event => {
        event.preventDefault();

        const form = event.target;

        const authorName = form.authorName.value;
        const bookName = form.bookName.value;
        const category = form.category.value;
        const quantity = form.quantity.value;
        const bookPhotoURL = form.bookPhotoURL.value;
        const shortDescription = form.shortDescription.value;
        const about = form.about.value;
        const rating = form.rating.value;

        const newbook = { authorName, quantity, bookName, category, bookPhotoURL, shortDescription, rating, about }

        console.log(newbook);

        // send data to the server
        axiosSecure.post("https://intellishelf-server.vercel.app/addbook", newbook)
            .then(data => {
                console.log(data);
                if (data.data.insertedId) {
                    toast.success("book Added Successfully")
                }
            })
    }

    return (

        <form onSubmit={handleAddbook} className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-base-200 my-4">
            <div className="space-y-2 col-span-full lg:col-span-1  text-center">
                <p className="font-bold text-2xl">Add <span className="text-blue-500">book</span></p>
                <p className="text-base">Here, you can add a new book to our collection.</p>
            </div>
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                {/* row 1 */}
                <div className="col-span-full sm:col-span-3">
                    <label htmlFor="bookName" className="">Book Name <span className="text-red-500">*</span></label>
                    <input required type="text" name="bookName" id="bookName" placeholder="ex: THE SKY" className="w-full px-4 py-2 border rounded-md border-gray-400" />
                </div>
                <div className="col-span-full sm:col-span-3">
                    <label htmlFor="authorName" className="">Author Name <span className="text-red-500">*</span></label>
                    <input required type="text" name="authorName" id="authorName" placeholder="ex: Jawad Ibrahim" className="w-full px-4 py-2 border rounded-md border-gray-400" />
                </div>

                {/* row 2 */}
                <div className="col-span-full">
                    <label htmlFor="category" className="">Category <span className="text-red-500">*</span></label>
                    <select required name="category" id="category" className="select w-full px-4 py-2 border rounded-md border-gray-400 text-base">
                        <option>business</option>
                        <option>science</option>
                        <option>health</option>
                        <option>computer</option>
                        <option>novel</option>
                        <option>history</option>
                    </select>
                </div>

                <div className="col-span-full sm:col-span-2">
                    <label htmlFor="quantity" className="">Quantity <span className="text-red-500">*</span></label>
                    <input required type="number" name="quantity" id="quantity" min='1' placeholder="ex: 15" className="w-full px-4 py-2 border rounded-md border-gray-400" />
                </div>
                <div className="col-span-full sm:col-span-2">
                    <label htmlFor="rating" className="">Rating <span className="text-red-500">*</span></label>
                    <input required type="number" min='1' max="5" name="rating" id="rating" placeholder="ex: 4" className="w-full px-4 py-2 border rounded-md border-gray-400" />
                </div>
                <div className="col-span-full sm:col-span-2">
                    <label htmlFor="bookPhotoURL" className="">Photo URL <span className="text-red-500">*</span></label>
                    <input required type="url" name="bookPhotoURL" id="bookPhotoURL" placeholder="ex: https://user.com/photo.jpg" className="w-full px-4 py-2 border rounded-md border-gray-400" />
                </div>

                <div className="col-span-full">
                    <label htmlFor="shortDescription" className="">Short Description <span className="text-red-500">*</span></label>
                    <input required type="text" name="shortDescription" id="shortDescription" placeholder="ex: The best book i have ever seen ... ..." className="w-full px-4 py-2 border rounded-md border-gray-400" />
                </div>
                <div className="col-span-full">
                    <label htmlFor="about" className="">About the book <span className="text-red-500">*</span></label>
                    <textarea required type="text" name="about" id="about" placeholder="ex: This book is written by Jawad. It has ... ..." className="w-full px-4 py-2 border rounded-md border-gray-400" />
                </div>
                
            </div>
            <div className="col-start-4 md:col-span-2 lg:col-start-2">
                <button className="btn w-full bg-blue-500 text-white text-base">Add book</button>
            </div>
        </form>
    );
};

export default Addbook;