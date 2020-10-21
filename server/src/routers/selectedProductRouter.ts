import { Router } from 'express';
import { Bag, SelectedProduct } from '../collections/bag'


export const selecedProductRouter = Router();

selecedProductRouter.put('/changeQty', async (req, res) => {
    const { product } = req.body;
    try {
        const updatedProduct = await SelectedProduct.findByIdAndUpdate(product._id, { qty: product.qty }, { new: true }).populate('productId');
        res.send(updatedProduct)
    } catch (e) {
        res.status(500).send(e.message);
    }
}
);
