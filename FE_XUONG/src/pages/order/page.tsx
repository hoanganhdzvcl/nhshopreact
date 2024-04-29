import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from '@/components/ui/use-toast';
import UseCart from '@/hooks/useCart';
import { useLocalStorage } from '@/hooks/useStorage';
import { IProduct } from '@/interfaces/product';
import '@/scss/cart.scss';
import { joiResolver } from '@hookform/resolvers/joi';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Joi from 'joi';
import { useForm } from 'react-hook-form';

const orderSchema = Joi.object({
    name: Joi.string().required().min(3),
    phone: Joi.number().required().min(3),
    email: Joi.string().required().min(3).email({ tlds: { allow: false } }),
})
const OrderPage = () => {
    const { toast } = useToast();
    const form = useForm({
        resolver: joiResolver(orderSchema),
        defaultValues: {
            name: "",
            phone: "",
            email: "",
        }
    });
    const [user] = useLocalStorage('user', {});
    const userId = user?.user?._id;
    const { data, calculateTotal } = UseCart();
    const { mutate } = useMutation({
        mutationFn: async (order: { userId: string, items: [], totalPrice: number, customerInfo: object }) => {
            const { data } = await axios.post('http://localhost:8080/api/v1/orders', order);
            return data;

        },
        onSuccess: () => {
            toast({
                title: 'Order Successful',
                variant: 'success',
                duration: 3000,
            })
        }
    })
    const onSubmit = (formData: object) => {
        mutate({
            userId,
            items: data?.products,
            totalPrice: calculateTotal(),
            customerInfo: formData,
        });

    }

    // console.log(data);

    return (
        <div className='container mx-auto'>
            <h1>Order</h1>
            <div className='grid grid-cols-12 gap-8'>
                <div className="col-span-8">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone</FormLabel>
                                        <FormControl>
                                            <Input type="tel" placeholder="Phone" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type='email' placeholder="Email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Place order</Button>
                        </form>
                    </Form>
                </div>
                <div className="col-span-4 infocart__checkout" style={{ width: 450 }}>
                    {data?.products?.map((item: IProduct) => (
                        <div key={item?._id} className='border-b py-4'>
                            <h4>{item.name}</h4>
                            <p>Price: {item.price}</p>
                            <p>Quantity: {item.quantity}</p>
                        </div>
                    ))}
                    {/* <p className='mt-5'>
                        <strong className='mr-2'>Product:</strong>
                        {data?.product ? data?.products.quantity : 0}
                    </p> */}

                    <p>
                        <strong className='mr-2'>Total:</strong>
                        {calculateTotal()}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default OrderPage