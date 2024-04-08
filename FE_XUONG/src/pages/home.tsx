import { Banner, Blog, Footer, ProductList, Services, Shop } from "@/components";

const HomePage = () => {
    return (
        <>
            <Banner />
            <ProductList featured={true} />
            <div className="container">
                <hr />
            </div>
            <Shop />
            <Blog />
            <Services />
        </>
    );
};

export default HomePage;
