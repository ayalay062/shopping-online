
import { Router } from 'express';
import { User } from '../collections';
import { Product } from '../collections/products';
// import {userRouter} from '.'
import { Bag, SelectedProduct } from '../collections/bag'
import { Order } from '../collections/order';

export const bagRouter = Router();



bagRouter.post('/shopping', async (req, res) => {

    const { product, qty, bagId, userId } = req.body;
    try {
        let bag;

        if (!bagId) {
            const newBag = new Bag({ customerId: userId })
            const createdBag = await newBag.save();
            bag = createdBag;
        } else {
            bag = await Bag.findById(bagId);
            
        } 
        const newProduct = new SelectedProduct({ productId: product, qty, bagId: bag?._id })
        const createdProduct = await newProduct.save();
        const products = await SelectedProduct.find({ bagId: bag?._id }).populate('productId');
        res.send({ bag, products });
    } catch (e) {
        res.status(401).send(e.message);
    }
}
);

bagRouter.post('/getBag/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        let bag = await Bag.findOne({ customerId: userId, is_open: true });
        if (!bag)
            bag = await Bag.create({ customerId: userId });
        res.status(200).send(bag)
    } catch (e) {
        res.status(401).send(e.message)
    }
}
);


bagRouter.delete('/removeFromBag/', async (req, res) => {

    const { productIds } = req.body;
    try {
        let bag;
        bag = await SelectedProduct.deleteMany({ _id: {$in: productIds } });
        res.send(productIds)
    } catch (e) {
        res.status(401).send(e.message);
    }
}
);

// bagRouter.get('/findBagOrOrder/:userId', async (req, res) => {
//     const { user_id } = req.params;
//     // const token = jwt.sign({ user_id }, JWT_SECRET);
//     const bag = await Bag.findOne({ customerId: user_id }).exec();
//     let productInBag;
//     if (bag)
//         productInBag = await SelectedProduct.find({ bagId: bag._id }).populate('productId')//בתוך שדה id יחזור כל המוצר
//    //בקליינט 
//         let lastOrder;
//     if (!bag) {
//         const sortedOrders = await Order.find({ customerId: user_id }).sort({ orderDate: - 1 })
//         lastOrder = sortedOrders[0];

//     } return ({ bag: { ...bag, productInBag }, order: lastOrder })
// }
// );

bagRouter.get('/getBag/:userId', async (req, res) => {
    const { userId } = req.params;
    // const token = jwt.sign({ user_id }, JWT_SECRET);
    const bag = await Bag.findOne({ customerId: userId, is_open: true }).exec();
    let productInBag;
    if (bag) {
        productInBag = await SelectedProduct.find({ bagId: bag._id }).populate('productId')//בתוך שדה id יחזור כל המוצר
        res.send({ ...bag.toJSON(), products: productInBag })
    }
    return null;
}
);

bagRouter.put('/close/:bagId', async (req, res) => {
    const { bagId } = req.params;
    try {
        const b = await Bag.findByIdAndUpdate(bagId, { is_open: false });
        res.status(200).send();
    } catch (e) {
        res.status(500).send(e)
    }

}
);

