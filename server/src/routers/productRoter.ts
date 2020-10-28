import { User } from '../collections/user'
import { Router } from 'express';
import { Product } from '../collections/products';
import { Category } from '../collections/categories';

export const productsRouter = Router();


productsRouter.get('/', async (req, res) => {
    try {
        const products = await Product.find()      
        res.send(products);
    } catch (e) {
        res.status(500).send({e, massage: 'Server is unavailable, please try again later' });
    }
});


productsRouter.get('/category/:categoryId', async (req, res) => {
    try {
        const { categoryId } = req.params;
        const products = await Product.find({ categoryId })
        res.status(200).send(products);
    } catch (e) {
        res.status(500).send({ massage: 'Server is unavailable, please try again later' });
    }
});

productsRouter.get('/category', async (req, res) => {
    try {
        const categories = await Category.find({})
        res.status(200).send(categories);
    } catch (e) {
        res.status(500).send({ massage: 'Server is unavailable, please try again later' });
    }
});


productsRouter.get('/count', async (req, res) => {
    try {
        const count = await Product.count({})
        res.status(200).send({ count });
    } catch (e) {
        res.status(401).send(e.message);
    }
}
);



productsRouter.get('/:productName', async (req, res) => {
    try {
        const { productName } = req.params;
        const product = await Product.findOne({ name: productName })
        res.status(200).send(product);
    } catch (e) {
        res.status(500).send({ massage: 'Server is unavailable, please try again later' });
    }
});




// -------ADMIN-------

productsRouter.post('/', async (req, res) => {
    const { name, categoryId, price, image } = req.body;
    try {
        const product = new Product({ name, categoryId, price, image })
        const newProduct = await product.save();
        res.send({ product: newProduct });
    } catch (e) {
        res.status(400).send(e.message);
    }
});



productsRouter.delete('/', async (req, res) => {
    const {productId } = req.body;
    try {
         await Product.deleteOne({_id:productId});
        res.send('product deleted');
    } catch (e) {
        res.status(400).send(e.message);
    }
});


productsRouter.put('/:productId', async (req, res) => {
    const { productId } = req.params;
    const { update } = req.body;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(productId,update,{new:true});
        res.send(updatedProduct);
    } catch (e) {
        res.status(400).send(e.message);
    }
});
