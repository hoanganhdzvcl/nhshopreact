import ProductListByCategory from '@/components/ProductListByCategory';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const CategoryDetail = () => {
    const { id } = useParams();
    const { data, isLoading } = useQuery({
        queryKey: ['CATEGORY_DETAIL'],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:8080/api/v1/categories/${id}`);
            return data;;
        }
    });
    console.log(data);

    if (isLoading) {
        return <p>Loading...</p>;
    }
    return (
        <div>
            <section className="news">
                <div className="container">
                    <div className="section-heading">
                        <h2 className="section-heading__title">Danh mục: {data.category.name}</h2>
                    </div>
                    <div className="section-body">
                        <ProductListByCategory data={data.products} categoryName={data.category.name} />
                    </div>
                </div>
            </section>
        </div>
    );
}

export default CategoryDetail;