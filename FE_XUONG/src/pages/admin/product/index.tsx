import { useProductQuery } from "@/hooks/useProductQuery";
import { IProduct } from "@/interfaces/product";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import useProductMutation from "@/hooks/useProductMutation";

const ProductManagement = () => {
    const { data: products, isLoading, isError } = useProductQuery();
    const queryClient = useQueryClient();


    const removeProduct = useMutation({
        mutationFn: async (_id: string | number) => {
            await axios.delete(`http://localhost:8080/api/v1/products/${_id}`);
        },
        onSuccess: () => {
            toast({
                title: "Removed",
                variant: "success",
            });
            queryClient.invalidateQueries({ queryKey: ["PRODUCT_KEY"] });
        }
    })

    const handleRemove = (productId: any) => {
        const confirm = window.confirm('Are you sure you want to delete this product?');
        if (confirm) {
            removeProduct.mutate(productId);
        }
    }



    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error</p>;
    return (
        <div>
            <Link className="btn btn-primary" to='/admin/products/add'>Add Products</Link>
            <table style={{ marginTop: '30px' }} className='table table-bordered '>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Description</th>
                        <th scope="col">CountInStock</th>
                        <th scope="col">Image</th>
                        <th scope="col">Gallery</th>
                        <th scope="col">Discount</th>
                        {/* <th scope="col">Featured</th> */}
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                {
                    products?.map((product: IProduct, index: any) => (
                        <tbody key={index}>
                            <tr>
                                <th>{index + 1}</th>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.description}</td>
                                <td>{product.countInStock}</td>
                                <td><img width={100} src={product.image} alt="" /></td>
                                <td>
                                    <img width={30} src={product.gallery && product.gallery[0]} alt="" />
                                    <img width={30} src={product.gallery && product.gallery[1]} alt="" />
                                    <img width={30} src={product.gallery && product.gallery[2]} alt="" />
                                </td>
                                <td>{product.discount}</td>
                                {/* <td>{product.featured}</td> */}
                                <td>
                                    <Link className='btn btn-primary' to={`/admin/products/${product._id}/edit`}>Edit</Link>

                                    <button className='btn btn-danger' onClick={() => handleRemove(product._id)} type='submit' >Xoa</button>
                                    {/* <button className='btn btn-danger' onClick={() => handleRemove(product._id)} >Xoa</button> */}
                                </td>
                            </tr>
                        </tbody>
                    ))
                }
            </table>
        </div>
    )
}

export default ProductManagement