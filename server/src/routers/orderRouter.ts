
import { Router } from 'express';
import { Bag } from '../collections/bag'
import { Order } from '../collections/order';

export const orderRouter = Router();



orderRouter.post('/', async (req, res) => {
    const { order } = req.body;
    try {
        const newOrder = new Order({ ...order, LastDigitsCreditCard: order.LastDigitsCreditCard.slice(order.LastDigitsCreditCard.length - 4)});
        const createdOrder = await newOrder.save();
        await Bag.findByIdAndUpdate(newOrder.bagId, { is_open: false});
        res.status(200).send(createdOrder);
    } catch (e) {
        res.status(401).send(e.message);
    }
}
);


orderRouter.get('/', async (req, res) => {
    try {
        const count = await Order.count({})
        res.status(200).send({ count });
    } catch (e) {
        res.status(401).send(e.message);
    }
}
);


orderRouter.get('/:date', async (req, res) => {
    const { date } = req.params;
    try {
        const countDate = await Order.find({ deliveryDate: new Date(date) }).count();
        res.status(200).send({ count: countDate });
    } catch (e) {
        res.status(500).send(e.message);
    }
}
);


orderRouter.get('/getOrder/:userId', async (req, res) => {
    const { user_id } = req.params;
    let lastOrder;
    const sortedOrders = await Order.find({ customerId: user_id }).sort({ orderDate: - 1 });
    if (sortedOrders.length) {
        lastOrder = sortedOrders[0];
        res.send({ order: lastOrder })
    }
    return null;
}
);
