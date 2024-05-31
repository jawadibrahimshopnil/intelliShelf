import { Rating } from "@smastrom/react-rating";
import { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../routers/AuthProvider";
import { toast } from "react-toastify";
import useAxiosSecure from "../hooks/useAxiosSecure";

const BookDetails = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const loadedDetails = useLoaderData();
    const { _id, authorName, quantity, bookName, image_url: img, category, rating, shortDescription, about } = loadedDetails;
    console.log(loadedDetails);

    const [dQuantity, setdQuantity] = useState(quantity);
    

    const handleBorrow = (e) => {
        e.preventDefault();

        const form = e.target;
        const userEmail = user.email;
        const userName = user.displayName;
        const borrowedDate =  new Date().toJSON().slice(0,10);
        const returnDate = form.returnDate.value;
        

        const borrowData = { bookCollectionId: _id, img, bookName, category, userEmail, userName, borrowedDate, returnDate };

        console.log(_id)

        axiosSecure.post(`https://intellishelf-server.vercel.app/borrow/${_id}`, borrowData)
            .then(data => {
                if (data.data.insertedId) {
                    document.getElementById('borrow_modal').close();
                    toast.success("Borrowed Successfully");
                    setdQuantity(dQuantity-1);
                }
            });
    }

    return (
        <>
            <div className="lg:flex flex-row gap-5 justify-between lg:px-0 lg:py-0 px-10 py-7 mb-6 rounded-3xl mt-4">
                <div className="rounded-2xl lg:w-[48%] max-w-[80%] lg:m-0 mx-auto bg-base-200 py-4">
                    <img src={img} className="lg:max-w-full h-full object-cover rounded-lg mx-auto" />
                </div>
                <div className="flex flex-col lg:mt-0 mt-6 lg:w-[48%] mr-4">
                    <div className="grow">
                        <div className="mb-4">
                            <div className="mb-4 text-4xl font-bold">
                                <h2>{bookName}</h2>
                                <h4 className="text-base font-semibold text-gray-500">Written By: <span className="font-bold"> {authorName}</span></h4>

                            </div>
                            <p className="">{shortDescription}</p>
                        </div>
                        <div className="">
                            <div className="lg:w-auto mb-4">
                                <p className="justify-between text-xl">Category: <span className="text-xl font-medium">{category}</span></p>
                                <p className="justify-between text-xl">Quantity: <span className={`text-xl font-medium ${dQuantity<=0 && 'text-red-500'}`}>{dQuantity}</span></p>
                                <div className="justify-between text-xl">Rating: <span className=""> <Rating className='!inline-flex align-middle'
                                    style={{ maxWidth: 120 }}
                                    value={rating}
                                    readOnly></Rating></span></div>
                                <button onClick={() => {
                                    axiosSecure.get(`https://intellishelf-server.vercel.app/borrowed?email=${user.email}&book=${_id}`)
                                    .then(data=>{
                                        console.log(data)
                                        if(data.data.found){
                                            toast.error("already borrowed");
                                        }else{
                                            if(quantity>=1){
                                                document.getElementById('borrow_modal').showModal()
                                            }else{
                                                toast.error("Can't borrow quantity is 0")
                                            }
                                        }
                                    })

                                    
                                }} className="btn mt-4 bg-blue-500 text-white max-w-32">Borrow</button>
                            </div>

                            <div>
                                <h1 className="text-2xl mb-4">Suggestion For you</h1>
                                <div className="md:flex gap-4 justify-between w-">
                                    <img className="mb-4" src="https://i.thriftbooks.com/api/imagehandler/s/8E4A57CC77FEEF7B53CA90AEEB2D1DB2791DAD3D.jpeg" alt="" />
                                    <img className="mb-4" src="https://i.thriftbooks.com/api/imagehandler/s/D14196AC58E078300005B93B3FF0725F5B5E7DD6.jpeg" alt="" />
                                    <img className="mb-4" src="https://i.thriftbooks.com/api/imagehandler/s/177BA5F3E750642ACDEDDAFA05C159023E10DECF.jpeg" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                about && <>
                    <div className="px-10 mb-6">
                        <h1 className="text-xl font-semibold">Description about the book:</h1>
                        <p className="">{about}</p>
                    </div></>
            }


            {/* modal for borrow*/}
            <dialog id="borrow_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Request for Borrow Book!</h3>
                    <p className="py-4">Please enter a return date.</p>
                    <div className="">
                        <form onSubmit={handleBorrow}>
                            <div className="">
                                <label htmlFor="userName" className="">User Name</label>
                                <input required type="text" defaultValue={user?.displayName} disabled name="userName" id="userName" placeholder="ex: Jawad Ibrahim" className="w-full px-4 py-2 border rounded-md border-gray-400" />
                            </div>
                            <div className="">
                                <label htmlFor="userEmail" className="">User Email</label>
                                <input required type="email" defaultValue={user?.email} placeholder="ex: user@gmail.com" name="userEmail" id="userEmail" disabled className="w-full px-4 py-2 border rounded-md border-gray-400" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="returnDate" className="">Return Date <span className="text-red-500">*</span></label>
                                <input required type="date" name="returnDate" id="returnDate" className="w-full px-4 py-2 border rounded-md border-gray-400" />
                            </div>

                            <div className="flex justify-between">
                                <button type="submit" className="btn bg-blue-500 text-white">Borrow</button>

                                <button type="button" onClick={() => document.getElementById('borrow_modal').close()} className="btn bg-red-400 text-white">Close</button>
                            </div>


                        </form>

                    </div>
                </div>
            </dialog>

        </>
    );
};

export default BookDetails;