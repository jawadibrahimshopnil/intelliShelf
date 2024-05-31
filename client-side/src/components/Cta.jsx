import { Link } from "react-router-dom";

const Cta = () => {
    return (
        <section className="py-6 bg-base-10">
            <div className="container mx-auto flex flex-col items-center justify-center p-4 space-y-8 md:p-10 md:px-24 xl:px-48">
                <h1 className="text-5xl font-bold leading-none text-center">Sign up now</h1>
                <p className="text-xl font-medium text-center">Whether you are a seasoned bookworm or just beginning your reading journey. Start exploring today and unlock the magic of reading.</p>
                <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-8">
                    <Link to='/register' className="px-8 py-3 text-lg font-semibold rounded bg-gray-800 text-white">SignUP</Link>
                    <button className="px-8 py-3 text-lg font-normal border rounded  text-100 border-gray-700">Learn more</button>
                </div>
            </div>
        </section>
    );
};

export default Cta;