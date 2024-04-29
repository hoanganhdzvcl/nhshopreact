import instance from "@/configs/axios";
import { IProduct } from "@/interfaces/product";

export const checkLocal = () => {
    const userDataString = JSON.parse(localStorage.getItem("user") || "");
    let token = "";
    if (userDataString) {
        try {
            const userData = JSON.parse(userDataString);
            token = userData.token || "";
            token.split(" ")[1];
        } catch (error) {
            // console.error("Khong the phan tich du lieu: ", error);
        }
    }
};

export const getAllProducts = async (): Promise<IProduct[]> => {
    try {
        const response = await instance.get("/products");
        return response.data;
    } catch (error) {
        return [];
    }
};
export const getProductById = async (id: number | string) => {
    try {
        const response = await instance.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const addProduct = async (product: IProduct) => {
    try {
        const response = await instance.post(`/products`, product, {
            // headers: {
            //     "Content-Type": "application/json",
            //     Authorization: token ? token : "",
            // },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const editProduct = async (product: IProduct) => {
    try {
        const response = await instance.patch(`/products/${product._id}`, product, {
            // headers: {
            //     "Content-Type": "application/json",
            //     Authorization: token ? token : "",
            // },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
export const removeProduct = async (product: IProduct) => {
    try {
        const response = await instance.delete(`/products/${product._id}`, {
            // headers: {
            //     "Content-Type": "application/json",
            //     Authorization: "Bearer " + token ? token : "",
            // },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
