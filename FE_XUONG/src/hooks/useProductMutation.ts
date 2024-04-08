import { editProduct } from "@/services/product";
import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { IProduct } from "@/interfaces/product";
import { useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import Joi, { string } from "joi";
import axios from "axios";

type useProductMutationProps = {
    action: "DELETE" | "UPDATE";
    onSuccess?: () => void;
};

const useProductMutation = ({ action, onSuccess }: useProductMutationProps) => {
    const queryClient = useQueryClient();
    const form = useForm();

    const { mutate, ...rest } = useMutation({
        mutationFn: async (product: IProduct) => {
            switch (action) {
                case "UPDATE":
                    return await editProduct(product);
                case "DELETE":
                    return (
                        window.confirm("Bạn có chắc chắn không?") &&
                        (await axios.delete(`http://localhost:8080/api/v1/products/${product._id}`))
                    );
                default:
                    return null;
            }
        },
        onSuccess: (data) => {
            if (data) {
                onSuccess && onSuccess();
                queryClient.invalidateQueries({
                    queryKey: ["PRODUCT_KEY"],
                });
            } else {
                // Xử lý trường hợp không có dữ liệu trả về từ API
                toast({
                    title: "Có lỗi xảy ra",
                    description: "Vui lòng thử lại sau",
                });
                return;
            }
        },
        onError: (error) => {
            console.log(error);
        },
    });
    const onSubmit: SubmitHandler<any> = async (product) => {
        mutate(product);
    };

    return { mutate, form, onSubmit, ...rest };
};

export default useProductMutation;
