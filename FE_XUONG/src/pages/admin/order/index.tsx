import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLocalStorage } from "@/hooks/useStorage";

const OrderManager = () => {
    const { data: orders, isLoading, isError } = useQuery({
        queryKey: ['ORDER_KEY'],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:8080/api/v1/orders`);
            return data;
        }
    });

    const [user] = useLocalStorage('user', {});
    // console.log(user.user._id);




    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error</p>;
    return (
        <div>
            <h2 className="text-2xl font-semibold">Quản lý đơn hàng</h2>
            <table style={{ marginTop: '30px' }} className='table table-bordered '>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Khách Hàng</th>
                        <th scope="col">Mặt hàng</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col"></th>

                    </tr>
                </thead>
                {
                    orders?.map((order: any, index: any) => (
                        <tbody>
                            <tr>
                                <th>{index + 1}</th>
                                <td>{order.customerInfo.name}</td>
                                <td>
                                    {order.items[0] && order.items[0].name}
                                    {order.items[1] && order.items[1].name}
                                    {order.items[2] && order.items[2].name}
                                    {order.items[3] && order.items[3].name}
                                </td>
                                <td>{order.status}</td>
                                <td>
                                    <Link to={`/admin/orders/${user.user._id}/${order._id}/edit`} className="btn btn-primary">Update Status</Link>
                                </td>


                            </tr>
                        </tbody>
                    ))
                }
            </table>
        </div>
    )
}

export default OrderManager;