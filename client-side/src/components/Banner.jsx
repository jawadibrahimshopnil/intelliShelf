import Slider from "./Slider";

const Banner = () => {
    return (
        <div className="hero md:px-12 px-4 md:py-8 py-4 mb-8 rounded-lg bg-base-200">
            <div className="hero-content flex-col-reverse md:flex-row p-0">
                <div>
                    <h1 className="text-4xl font-bold">Welcome to<span className="text-4xl text-blue-500 font-extrabold ml-1 gap-0">intelli<span className="text-base-content">Shelf</span></span></h1>
                    <p className="text-lg">A Library Management System</p>
                    <p className="py-6">Where books come to life. Dive into a world of endless possibilities with our vast collection of literature spanning genres from science fiction to business classics. Whether you are a seasoned bookworm or just beginning your reading journey, our user-friendly platform makes discovering your next favorite book a breeze. Start exploring today and unlock the magic of reading.</p>

                    <button className="btn bg-blue-500 text-white">Get Started</button>
                </div>
                <Slider></Slider>
            </div>
        </div>
    );
};

export default Banner;