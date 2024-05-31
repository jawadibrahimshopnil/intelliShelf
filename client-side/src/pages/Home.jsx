import Banner from "../components/Banner";
import Categories from "../components/Categories";
import Testemonials from "../components/Testemonials";
import Faq from "../components/Faq";
import Cta from "../components/Cta";

const Home = () => {
    return (
        <div className="my-4">
            <Banner></Banner>
            <Categories></Categories>
            <Testemonials></Testemonials>
            <Faq></Faq>
            <Cta></Cta>
        </div>
    );
};

export default Home;