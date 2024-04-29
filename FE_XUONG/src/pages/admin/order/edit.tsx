// import { useLocalStorage } from '@/hooks/useStorage';
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
// import React from 'react';
// import { useParams } from 'react-router-dom';

// const EditOrderPage = () => {
//     const [user] = useLocalStorage('user', {});
//     console.log("user", user);

//     const { id } = useParams();
//     console.log("id", id);

//     const { data, isLoading } = useQuery({
//         queryKey: ["ORDERS_KEY", id],
//         queryFn: async () => {
//             const { data } = await axios.get(`http://localhost:8080/api/v1/orders/${user.user._id}/${id}`);
//             return data;
//         }
//     })


//     if (isLoading) return <p>Loading...</p>
//     return (
//         <>
//             {/* {data.map((order) => (
//                 console.log(order)
//             ))} */}
//         </>
//     )
// }

// export default EditOrderPage;