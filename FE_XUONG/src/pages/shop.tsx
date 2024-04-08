import { ProductList, Services } from "@/components";
import Categories from "@/components/Categories";

const ShopPage = () => {
    return (
        <div>
            <Categories />
            <hr />
            <ProductList />
            <Services />
        </div>
    );
};

export default ShopPage;
