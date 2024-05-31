import { Link, useLoaderData } from "react-router-dom";

const CategoryCard = ({ category }) => {
    const { image_url: img, name, description, key_elements: tags } = category;

    return (
        <div className="card card-compact hover:scale-105 h-full duration-300 max-w-96 bg-base-100 shadow-xl border mx-auto grow overflow-hidden">
            <Link to={`/categories/${name.toLowerCase()}`}>
                <figure className="max-h-64"><img src={img} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{name}</h2>
                    <div className="">
                        {
                            tags.map((tag, idx) => <span key={idx} className="badge badge-outline text-blue-500 mr-1">{tag}</span>)
                        }
                    </div>
                    <h4 className="text-base">{description}</h4>
                </div>
            </Link>
        </div>
    );
}


const Categories = () => {
    const categories = useLoaderData();

    return (
        <div>
            <div className="mb-4">
                <h1 className="text-center text-4xl font-bold mb-1  md:mb-5">Discover Our Categories</h1>
                <p className="px-8 md:px-28 text-center mb-6 md:mb-12">Embark on a literary adventure through our curated selection of categories. Whether you are drawn to business, science, health or computer our diverse collection awaits your exploration. Find your next favorite read and immerse yourself in the endless possibilities of each category.</p>
            </div>
            <div className="md:grid md:grid-cols-2 lg:grid-cols-4 place-items-center gap-6">
                {
                    categories.map(category => <CategoryCard category={category} key={category._id}></CategoryCard>)
                }
            </div>
        </div>
    );
};

export default Categories;