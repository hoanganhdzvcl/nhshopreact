import { useProductQuery } from "@/hooks/useProductQuery";
import { useLocalStorage } from "@/hooks/useStorage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
const DetailProduct = () => {
    const navigate = useNavigate();
    const querryClient = useQueryClient();
    const [user] = useLocalStorage('user', []);
    const userId = user?.user._id;
    const { mutate } = useMutation({
        mutationFn: async ({ productId, quantity }: { productId: any, quantity: number }) => {
            const { data } = await axios.post(`http://localhost:8080/api/v1/cart/add-to-cart`, { userId, productId, quantity });
            return data;
        },
        onSuccess: () => {
            querryClient.invalidateQueries({
                queryKey: ['cart', userId],
            });
            navigate('/cart');
        }
    })

    const { id } = useParams();
    const { data: product, isLoading } = useProductQuery({ id: id! });
    console.log(product);
    const { data: relatedProduct } = useQuery({
        queryKey: ["RELATED_PRODUCT"],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:8080/api/v1/products/${product.category}/related/${product._id}`, {
                params: {
                    _limit: 4
                }
            });
            return data;
        },
    })
    console.log(relatedProduct);


    if (isLoading) return <p>Loading...</p>;
    return <div>

        <style>
            {`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

            body {
                font - family: 'Poppins', sans-serif;
}

            * {
                margin: 0 auto;
            box-sizing: border-box;
            padding: 0;
}

            header {
                height: 100px;
            background-color: rgb(255, 255, 255);
            margin-top: 30px;
            display: flex;
            align-items: center;

}

            .logoHeader {
                display: flex;
}

            .logoHeader p {
                font - size: x-large;
            font-weight: bolder;
}

            .menu ul {
                margin - left: 100px;
            display: flex;
}

            .menu ul li {
                margin: 20px;
            list-style: none;
}

            .menu ul li a {
                text - decoration: none;
            color: black;
}

            .iconNavigate i {
                margin: 20px;
}

            .detai-navigate {
                background-color:#f9f1e7
}

            .detai-navigate .child {
                margin - top: 15px;
            display: flex;
            height: 100px;
            align-items: center;
            width: 25%;
            margin-right: 1000px;
}




            .detail-product {
                display: flex;
            margin-top: 50px;
            max-width: 90%;
}

            .box-left {
                line - height: 70px;
}

            .detail-image img {
                width: 90px;
}

            .box-center img {
                width: 600px;
            object-fit: cover;
            padding: 0px 30px;
}

            .box-right {
                width: 80%;
            margin-left: 90px;
}

            .product_name h2 {
                font - size: 42px;
            font-weight: 400;
}

            .price {
                margin - top: 10px;
}

            .price h3 {
                font - size: 24px;
            font-weight: 500;
            color: #9F9F9F;
}

            .description p {
                font - size: 13px;
            font-weight: 400;
            line-height: 19.5px;
}

            .addToCart {
                margin - top: 50px;
            margin-right: 30px;
}
.addToCart p{
    text-align: center;
    padding-top:20px;
    margin-left:55px
}

            .addToCart,
            .selectQuantity,
            .compare,
            .add {
                align - items: center;
            display: flex;
            height: 65px;
}
.quantity{
    padding-top:20px
}

            .selectQuantity {
                border: 1px solid #9F9F9F;
            width: 123px;
            border-radius: 10px;
}

            .add,
            .compare {
                width: 215px;
            border-radius: 10px;
            border: 1px solid black;
            cursor:pointer;
}

            .parameter {
                margin - top: 25px;
}

            .child-parameter {
                margin: 5px;
            display: flex;
}

            .child-parameter .p1 {
                width: 80px;
            margin: 0;
            padding: 0;
}

            .icon,
            .child-parameter p {
                margin - left: 10px;
            padding: 0;
}

            .child-parameter a {
                margin: 10px;
}

            .desciption-section1 .title {
                width: 100%;
            display: flex;
            margin-top: 50px;
            font-size: 24px;
            margin-left: 300px;
            margin-right: 300px;
}

            .desciption-section1 .title h3 {
                font - weight: 500;
            margin: 0 30px;
}

            .desciption {
                width: 75%;
            margin-top: 30px;
            color: #9F9F9F;
}

            .image-des {
                width: 100%;
            margin-top: 25px;
            display: flex;
}


            .products {
                display: flex;
}

            .card {
                margin - left: 20px;
            margin-right: 20px;
            margin-top: 40px;
            margin-bottom: 45px;
            line-height: 35px;
            background-color: rgb(237, 241, 241);
}

            .text-item,
            .discount {
                margin - left: 10px;

}

            .discount {
                display: flex;
            width: 40%;
            gap: 10px;
            float: left;
}

            .relatedProducts h2 {
                margin - top: 50px;
            text-align: center;
            font-weight: 500;
            font-size: 36px;
            line-height: 36px;
}
.image-item img{
    width: 400px;
    height: 200px;
    object-fit: cover;
}

.more {
margin-left: 600px
}

            .more p {
                font - weight: 600;
            font-size: 16px;
            color: #B88E2F;
            border: 2px solid #B88E2F;
            display: flex;
            height: 50px;
            align-items: center;
            justify-content: center;
            width: 15%;
}`}
        </style>


        <div className="container">
            <main>
                <div className="detai-navigate">
                    <div className="child">
                        <div className="page-name">
                            <p>Home {">"}</p>
                        </div>
                        <div className="engle-right">
                            <i className="fa-solid fa-angle-right" />
                        </div>
                        <div className="page-name">
                            <p>Shop {">"}</p>
                        </div>
                        <div className="engle-right">
                            <i className="fa-solid fa-angle-right" />
                        </div>
                        <div className="product-name">
                            <p>{product.name}</p>
                        </div>
                    </div>
                </div>
                <div className="detail-product">
                    <div className="box-left">
                        <div className="detail-image" style={{ padding: 10 }}>
                            <img src={product.gallery[0]} alt='' />
                        </div>
                        <div className="detail-image" style={{ padding: 10 }}>
                            <img src={product.gallery[1]} alt='' />
                        </div>
                        <div className="detail-image" style={{ padding: 10 }}>
                            <img src={product.image} alt='' />
                        </div>
                        <div className="detail-image" style={{ padding: 10 }}>
                            <img src={product.image} alt='' />
                        </div>
                    </div>
                    <div className="box-center">
                        <img src={product.image} alt='' />
                    </div>
                    <div className="box-right">
                        <div className="product_name">
                            <h2>{product?.name}</h2>
                        </div>
                        <div className="price">
                            <h3>${product?.price - (product.price * (product.discount / 100))}</h3>
                        </div>
                        <div className="desciption">
                            <p>{product.des}
                            </p>
                        </div>
                        <div className="addToCart">
                            <div className="selectQuantity">
                                <div className="quantity">1</div>
                            </div>
                            <div className="add" onClick={() => mutate({ productId: product._id, quantity: 1 })}>
                                <p>Add To Cart</p>
                            </div>
                            <div className="compare">
                                <p>Compare</p>
                            </div>
                        </div>
                        <hr style={{ color: '#D9D9D9', marginTop: 50 }} />
                        <div className="parameter">
                            <div className="child-parameter">
                                <p className="p1">SKU</p>
                                <p>: SS001</p>
                            </div>
                            <div className="child-parameter">
                                <p className="p1">Category</p>
                                <p>: Sofas</p>
                            </div>
                            <div className="child-parameter">
                                <p className="p1">Tags</p>
                                <p>: Sofa, Chair, Home, Shop</p>
                            </div>
                            <div className="child-parameter">
                                <p className="p1">Share</p>
                                <div className="icon">
                                    : <a href="https://www.facebook.com/diemthongnhat"><i className="fa-brands fa-facebook" /></a>
                                    <a href=''><i className="fa-brands fa-twitter" /></a>
                                    <a href=''><i className="fa-brands fa-instagram" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr style={{ color: '#D9D9D9', marginTop: 50 }} />
                <div className="desciption-section1">
                    <div className="title">
                        <h3>Description</h3>
                        <h3 style={{ color: '#9F9F9F' }}>Additional Information</h3>
                        <h3 style={{ color: '#9F9F9F' }}>Reviews [5]</h3>
                    </div>
                    <div className="desciption">
                        <p>Embodying the raw, wayward spirit of rock n roll, the Kilburn portable active stereo speaker
                            takes the unmistakable look and sound of Marshall, unplugs the chords, and takes the show on the
                            road.</p>
                        <p style={{ marginTop: 40 }}>Weighing in under 7 pounds, the Kilburn is a lightweight piece of
                            vintage styled engineering. Setting the bar as one of the loudest speakers in its class, the
                            Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear
                            midrange and extended highs for a sound that is both articulate and pronounced. The analogue
                            knobs allow you to fine tune the controls to your personal preferences while the
                            guitar-influenced leather strap enables easy and stylish travel.</p>
                    </div>
                    <div className="image-des">
                        <img src="./src/images/Group 107.png" alt='' />
                        <img src="./src/images/Group 107.png" alt='' />
                    </div>
                </div>
                <hr style={{ color: '#D9D9D9', marginTop: 50 }} />
                <div className="relatedProducts">
                    <h2>Related Products</h2>

                    <div className="section1" style={{ width: '90%' }}>
                        <div className="title-section1">
                        </div>
                        <div className="products">
                            {relatedProduct?.map((item: any) => (
                                <div className="card">
                                    <>
                                        {/* <div><Link to={`/products/${item._id}`}>${item.name}</Link></div> */}
                                        <div className="image-item">
                                            <a href=''>
                                                <img src={item.image} alt='' />
                                            </a>
                                        </div>
                                        <div className="text-item">
                                            <Link to={`/products/${item._id}`}><h3>{item.name}</h3></Link>
                                            <p>{item.desciption}</p>
                                        </div>

                                        <div className="discount">
                                            <h4>${item.price - (item.price * item.discount / 100)}</h4>
                                            <del>${item.price}</del>
                                        </div>

                                    </>
                                </div>
                            ))}


                        </div>
                    </div>
                    <div className="more">
                        <p>Show more</p>
                    </div>
                    <hr style={{ color: '#D9D9D9', marginTop: 50 }} />

                </div>

            </main>
        </div >







        {/* {product?.name}

        // < hr />
        // {relatedProduct?.map((item: any) => (
        //     <div><Link to={`/products/${item._id}`}>${item.name}</Link></div>
        // ))} */}
    </div >;
};

export default DetailProduct;
