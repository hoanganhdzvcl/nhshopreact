import { getAllProducts, getProductById } from "@/services/product";
import { useQuery } from "@tanstack/react-query";

export const useProductQuery = (options?: any) => {
    const { data, ...rest } = useQuery({
        queryKey: ["PRODUCT_KEY", options],
        queryFn: async () => {
            return options?.id ? await getProductById(options.id as number | string) : await getAllProducts();
        },
    });

    return { data, ...rest };
};
