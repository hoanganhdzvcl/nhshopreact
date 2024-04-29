import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage

} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

import { Input } from "@/components/ui/input";
import { IProduct } from "@/interfaces/product";
import { addProduct } from "@/services/product";
import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation, useQuery } from "@tanstack/react-query";
import Joi from "joi";
import { SubmitHandler, useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { uploadFile } from "@/common/lib/utils";
import { useState } from "react";
// import { useProductQuery } from "@/hooks/useProductQuery";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "@/hooks/useStorage";
// import { useLocalStorage } from "@/hooks/useStorage";
// type Inputs = {
//     name: string;
//     category?: string;
//     price: number;
//     // gallery?: string[];
//     image: string;
//     description: string;
//     discount: number;
//     featured: boolean;
//     countInStock: number;
// };

const productSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string(),
    gallery: Joi.array().items(Joi.string()),
    image: Joi.string(),
    description: Joi.string(),
    discount: Joi.number(),
    featured: Joi.boolean(),
    countInStock: Joi.number(),
});


const ProductAddPage = () => {
    const [user] = useLocalStorage('user', {});
    const userRole = user?.user?.role;
    const navigate = useNavigate();
    const [gallery, setGallery] = useState<any[]>([]);
    const [image, setImage] = useState<string[]>([]);
    const { toast } = useToast();
    const form = useForm({
        resolver: joiResolver(productSchema),
    });

    const { data: categories } = useQuery({
        queryKey: ["CATEGORIES"],
        queryFn: async () => {
            const res = await axios.get(
                "http://localhost:8080/api/v1/categories",
            );
            return res.data;
        },
    });
    const mutation = useMutation({
        mutationFn: async (product: IProduct) => {
            const { data } = await addProduct(product);
            return data;
        },
        onSuccess: () => {
            form.reset();
            toast({
                title: "Thêm sản phẩm thành công",
                variant: "success",
            });
            navigate('/admin/products');
        },
    });

    const onSubmit: SubmitHandler<any> = (product) => {
        // console.log(gallery);
        const newGallery = gallery.map((item: any) => item?.url);

        mutation.mutate({ ...product, gallery: newGallery, image });
    };
    if (userRole != 'admin') {
        navigate('/rolelimit');
    }
    return (
        <div>
            <h2 className="text-2xl font-semibold">Thêm sản phẩm</h2>
            <hr className="my-5" />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="name">Name</FormLabel>
                                <FormControl>
                                    <Input {...field} id="name" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    ></FormField>
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="price">Giá</FormLabel>
                                <FormControl>
                                    <Input {...field} id="price" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    ></FormField>
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => {
                            // console.log(field.value);
                            return (
                                <FormItem>
                                    <FormLabel>Danh mục</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={
                                            field.value
                                                ? field.value
                                                : ""
                                        }
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a verified email to display" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {categories?.map(
                                                (
                                                    category: any,
                                                    index: number,
                                                ) => (
                                                    <SelectItem
                                                        key={index}
                                                        value={
                                                            category._id
                                                        }
                                                    >
                                                        {category.name}
                                                    </SelectItem>
                                                ),
                                            )}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />
                    <FormField control={form.control} name='gallery' render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor='gallery'>Gallery</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    type='file'
                                    multiple
                                    onChange={async (e) => {
                                        const files = Array.from(e.target.files as FileList);
                                        // console.log(files);
                                        const result = await Promise.all(files.map((file) => uploadFile(file),
                                        ),
                                        );
                                        setGallery(result);

                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}>
                    </FormField>
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="image">Image</FormLabel>
                                <FormControl>
                                    <Input {...field} id="image" type="file"
                                        onChange={async (e) => {
                                            const files = Array.from(e.target.files as FileList);
                                            // console.log(files);
                                            const result = await Promise.all(files.map((file) => uploadFile(file),
                                            ),
                                            );
                                            // console.log(result);

                                            setImage(result[0]?.url);
                                        }}

                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="description">
                                    Description
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} id="description" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="discount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="discount">
                                    Discount(%)
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} id="discount" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="featured"
                        render={({ field }) => (
                            <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>Sản phẩm nổi bật ?</FormLabel>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button variant="destructive" type="submit">
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default ProductAddPage;
