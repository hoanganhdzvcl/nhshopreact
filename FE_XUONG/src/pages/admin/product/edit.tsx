import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { uploadFile } from "@/common/lib/utils";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import useProductMutation from "@/hooks/useProductMutation";
import { useProductQuery } from "@/hooks/useProductQuery";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Joi from "joi";
import { useLocalStorage } from "@/hooks/useStorage";
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

// const productSchema = Joi.object({
//     name: Joi.string().required(),
//     price: Joi.number().required(),
//     category: Joi.string(),
//     gallery: Joi.array().items(Joi.string()),
//     image: Joi.string(),
//     description: Joi.string(),
//     discount: Joi.number(),
//     featured: Joi.boolean(),
//     countInStock: Joi.number(),
// });


const ProductEditPage = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { id } = useParams();
    const [user] = useLocalStorage('user', {});
    const userRole = user?.user?.role;
    const [gallery, setGallery] = useState<any[]>([]);
    const [image, setImage] = useState<string>();
    const [category, setCategory] = useState<string>("");

    const { data, isLoading } = useProductQuery({ id });

    const { data: categories } = useQuery({
        queryKey: ["CATEGORIES"],
        queryFn: async () => {
            const res = await axios.get(
                "http://localhost:8080/api/v1/categories",
            );
            return res.data;
        },
    });
    const { form, onSubmit } = useProductMutation({
        action: "UPDATE",
        onSuccess: () => {
            form.reset();
            toast({
                title: "Cập nhật sản phẩm thành công",
                variant: "success",
                duration: 2000,
            });
            navigate("/admin/products");
        }
    });

    useEffect(() => {
        form.reset(data);
    }, [id, form, data]);

    useEffect(() => {
        setCategory(data?.category?._id);
    }, [data]);

    const onHandleSubmit = (product: any) => {
        // console.log('ádasdasdsa');
        // if (!image || !gallery.length) {
        //     toast({
        //         title: "Vui lòng chọn ảnh cho sản phẩm",
        //         variant: "destructive",
        //     });
        //     return;
        // }
        onSubmit({ ...product, gallery, image });
    };

    if (isLoading) return <p>Loading...</p>
    if (userRole != 'admin') {
        navigate('/rolelimit');
    }
    return (
        <div className="max-w-screen-md mx-auto">
            <div className="space-y-0.5">
                <h2 className="text-2xl font-bold tracking-tight">
                    {id ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm"}
                </h2>
                <p className="text-muted-foreground">
                    {id ? "Chỉnh sửa thông tin sản phẩm" : "Thêm sản phẩm mới"}
                </p>
            </div>
            <div className="shrink-0 bg-border h-[1px] w-full my-6"></div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onHandleSubmit)}
                    className="space-y-8"
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="name">
                                    Tên sản phẩm
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} id="name" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    ></FormField>
                    <div className="grid grid-cols-2 gap-8">
                        <div className="grid grid-cols-1 gap-4">
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="price">
                                            Giá
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} id="price" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            ></FormField>
                            <FormField
                                control={form.control}
                                name="discount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="discount">
                                            Giảm giá
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
                                                        <SelectValue placeholder='Select category' />
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
                        </div>
                        <div>
                            <div className="grid grid-cols-1 gap-4">
                                <FormItem>
                                    <FormLabel htmlFor="gallery">
                                        Ảnh sản phẩm
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            multiple
                                            id="gallery"
                                            onChange={async (e) => {
                                                const files = e.target.files;
                                                if (!files) return;
                                                const urls = await Promise.all(
                                                    Array.from(files).map(
                                                        uploadFile,
                                                    ),
                                                );

                                                const result = urls.map((url) => (url.url));
                                                console.log(result);

                                                setGallery(result);
                                                // console.log(urls);

                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />

                                    <div className="grid grid-cols-4 gap-4">
                                        {data?.gallery?.map((url: any) => (
                                            <img
                                                key={url}
                                                src={url}
                                                alt="product"
                                                className="w-full h-20 object-contain border border-gray-200 rounded-md"
                                            />
                                        ))}
                                    </div>
                                </FormItem>
                                <FormItem>
                                    <FormLabel htmlFor="image">
                                        Ảnh đại diện
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            id="image"
                                            onChange={async (e) => {
                                                const files = e.target.files;
                                                if (!files) return;
                                                const urls = await Promise.all(
                                                    Array.from(files).map(
                                                        uploadFile,
                                                    ),
                                                );
                                                console.log(urls[0].url);

                                                setImage(urls[0].url);
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />

                                    {data?.image && (
                                        <img
                                            src={data?.image}
                                            alt="product"
                                            className="w-full h-40 object-contain border border-gray-200 rounded-md"
                                        />
                                    )}
                                </FormItem>
                            </div>
                        </div>
                    </div>
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
                                <div className="space-y-0 leading-none">
                                    <FormLabel>Sản phẩm nổi bật?</FormLabel>
                                </div>
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
                    <Button type="submit">
                        Cập nhật sản phẩm
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default ProductEditPage;


