import productModel from "../models/productModel.js";
import {v2 as cloudinary} from "cloudinary";

const addProduct = async (req, res) => {
   try {
       console.log('Request body:', req.body);
       console.log('Request files:', req.files);

       const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

       const image1 = req.files?.image1?.[0];
       const image2 = req.files?.image2?.[0];
       const image3 = req.files?.image3?.[0];
       const image4 = req.files?.image4?.[0];

       const images = [image1, image2, image3, image4].filter(image => image !== undefined);

       if (images.length === 0) {
           return res.status(400).json({
               success: false,
               message: "At least one image is required"
           });
       }

       let imagesUrl = await Promise.all(
           images.map(async (item) => {
               console.log('Uploading file:', item.path);
               let result = await cloudinary.uploader.upload(item.path, {
                   resource_type: 'image'
               });
               return result.secure_url;
           })
       );

       const productData = {
           name,
           description,
           category,
           price: Number(price),
           subCategory,
           bestseller: bestseller === "true",
           sizes: sizes ? JSON.parse(sizes) : [],
           image: imagesUrl,
           date: Date.now()
       };

       console.log('Product data:', productData);

       const product = new productModel(productData);
       await product.save();

       res.json({
           success: true,
           message: "Product added successfully"
       });

   } catch (error) {
       console.error('Full error:', error);
   }
}

const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({success: true, products})
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success: true, message: "Product Removed"})
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body
        const product = await productModel.findById(productId)
        res.json({success: true, product})
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { addProduct, listProducts, removeProduct, singleProduct };