import { StatusCodes } from "http-status-codes";
import Product from "../models/product";
import Joi from "joi";
import slugify from "slugify";

const productSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": "Trường Name là bắt buộc",
        "string.empty": "Trường Name không được để trống",
    }),
    category: Joi.string().required().messages({
        "any.required": "Trường Category là bắt buộc",
        "string.empty": "Trường Category không được để trống",
    }),
    slug: Joi.string(),
    price: Joi.number(),
    gallery: Joi.array(),
    description: Joi.string(),
    discount: Joi.number(),
    countInStock: Joi.number(),
    featured: Joi.boolean(),
    image: Joi.string(),
    tags: Joi.array(),

});


export const create = async (req, res) => {
    try {
        const { name, category, price, image, gallery, description, countInStock, featured, discount, tags } = req.body;
        const { error } = productSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const messages = error.details.map((item) => item.message);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                messages
            })
        }
        const products = await Product.create({ name, category, price, image, gallery, description, countInStock, featured, discount, tags, slug: slugify(req.body.name, "-") });
        // const products = await Product.create(req.body);
        // product.gallery.split(',');
        // product.tags.split(',');
        return res.status(StatusCodes.CREATED).json({ products });

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });

    }
};

export const getAll = async (req, res) => {
    try {
        const product = await Product.find({});
        if (product.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Không có sản phẩm nào!" });
        }
        return res.status(StatusCodes.OK).json(product);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        return res.status(StatusCodes.OK).json(product);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
    }
};


export const delteProductById = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        return res.status(StatusCodes.OK).json(product);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
    }
};


export const updateProductById = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(StatusCodes.OK).json({ product });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
    }
};

export const related = async (req, res) => {
    try {
        const product = await Product.find({ category: req.params.categoryId, _id: { $ne: req.params.productId } }).limit(4);
        return res.status(StatusCodes.OK).json(product);
    } catch (error) { }
}

