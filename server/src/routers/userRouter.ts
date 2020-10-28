import { Router } from 'express';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { User } from '../collections';
import { Bag, SelectedProduct } from '../collections/bag';
import { Order } from '../collections/order';
import expressJwt from 'express-jwt';

const { JWT_SECRET = 'secret' } = process.env;

const usersRouter = Router();

usersRouter.get('/ping', async (req, res) => {
    const { userId } = (req as any).user;
    const user = await User.findById(userId);
    if (!user) {
        return res.status(401).end();
    }
    res.send({ username: user.firstName });
});

usersRouter.post('/register', async (req, res) => {
    const { firstName, lastName, email, password, city, street } = req.body;
    try {
        const user = await User.register(firstName, lastName, email, password, city, street);
        const token = jwt.sign({ userId: user._id }, JWT_SECRET);
        // const orderOrBag = await User.findBagOrOrder(userId)
        res.send({ token,  user});
    } catch (e) {
        res.status(403).send(e.message);
    }
});

// ---------------login-------------------

usersRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        // const user_logged_in = {
        //     firstName: user[0].firstName,
        //     lastName: user[0].lastName,
        //     email: user[0].email,
        //     passwors: user[0].password,
        //     adreess: { city: user[0].city, street: user[0].street },
        // }
        const userId = user._id
        const token = jwt.sign({ userId }, JWT_SECRET);
        // const orderOrBag = await User.findBagOrOrder(userId);
        res.send({ response: true, msg: "bag open", token, user })
    } catch (error) {
        res.status(500).send("server error")
    }
});



export { usersRouter };

