import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../collections';

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
        res.send({ token,  user});
    } catch (e) {
        if (e.message === 'email already in use') {
            res.status(409).send(e.message);
        } else {
            res.status(500).send(e.message);
        }
    }
});

// ---------------login-------------------

usersRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);

        const userId = user._id
        const token = jwt.sign({ userId }, JWT_SECRET);
        res.send({ response: true, msg: "bag open", token, user })
    } catch (error) {
        res.status(500).send("server error")
    }
});



export { usersRouter };

