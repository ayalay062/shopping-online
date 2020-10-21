import express from 'express';
import cors from 'cors';
import expressJwt from 'express-jwt';
import { connectDb } from './mongodb';
import { usersRouter } from '../src/routers/userRouter';
import {productsRouter} from '../src/routers/productRoter';
import {bagRouter} from '../src/routers/bagRouter';
import { orderRouter } from './routers/orderRouter';
import { selecedProductRouter } from './routers/selectedProductRouter';
import { uploadRouter } from './routers/uploadRouter';

const PORT = 4000;

const { JWT_SECRET = 'secret' } = process.env;

const app = express();

app.use(express.json());
app.use(cors());
app.use(expressJwt({ secret: JWT_SECRET , algorithms: ['HS256']  }).unless({ path: ['/users/register', '/users/login', /^\/upload\/.*/, 'products'] }));

// comment out this line if you want to bypass JWT check during development
// app.use(expressJwt({ secret: JWT_SECRET }).unless({ path: '/' }));

app.get('/', (req, res) => {
    res.send('Hi there!');
});



app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/bag', bagRouter);
app.use('/order', orderRouter);
app.use('/selectedProducts', selecedProductRouter);
app.use('/upload', uploadRouter);

startServer();



async function startServer() {
    await connectDb();
    app.listen(PORT, () => console.log(`Server is up at ${PORT}`));
}


