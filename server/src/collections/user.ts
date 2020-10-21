import { model, Schema, Document, Model, Types, SchemaTypes } from 'mongoose';
import { IProduct, ProductSchema, Product } from './products';
import { hash, compare } from 'bcrypt';
import { usersRouter } from '../routers/userRouter';
import { IOrder, Order } from '../collections/order'
import { IBag, Bag, SelectedProduct } from '../collections/bag'
import expressJwt from 'express-jwt';

// this interface represents a single user instance
interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    city: string;
    street: string;
    role: string;
    products: IProduct[];
}

const UserSchema = new Schema<IUser>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, min: 6, max: 10 },
    city: { type: String, required: true },
    street: { type: String, required: true },
    role: { type: String, default: 'user' },
    products: [ProductSchema],
});

UserSchema.path('password').validate(async (password: string) => {
    const user = await User.findOne({ password }).exec();
    const isUserExists = !!user;
    return !isUserExists;
}, 'Username already exists');

UserSchema.path('email').validate((email: string) => {
    const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(email);
}, 'Email must be a valid email address');


// this interface represents the whole collection - login and register are operations done on the collection, before we have a specific user
export interface IUserModel extends Model<IUser> {
    login(email: string, password: string): Promise<IUser>;
    register(firstName: string, lastName: string, email: string, password: string, city: string, street: string): Promise<IUser>;
    findBagOrOrder(userId: string): Promise<IBag | IOrder>
}

// we use UserSchema.statics to implement IUserModel ----------

// this is the implementation of IUserModel.login
UserSchema.statics.login = async (email: string, password: string): Promise<IUser> => {
    const user = await User.findOne({ email }).exec();

    if (!user) {
        throw new Error("email or password don't match");
    }
    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) {
        throw new Error("email or password don't match");
    }
    return user;
}

// this is the implementation of IUserModel.register
UserSchema.statics.register = async (firstName: string, lastName: string, email: string, password: string, city: string, street: string): Promise<IUser> => {
    const hashedPassword = await hash(password, 10)
    const user = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        city,
        street,

    });
    const createdUser = await user.save();
    return createdUser;
}

UserSchema.statics.findBagOrOrder = async (userId: string) => {
    const user_id = userId
    // const token = jwt.sign({ user_id }, JWT_SECRET);
    const bag = await Bag.findOne({ customerId: user_id }).exec();
    let productInBag;
    if (bag)
        productInBag = await SelectedProduct.find({ bagId: bag._id })
    let lastOrder = null;
    if (!bag) {
        const sortedOrders = await Order.find({ customerId: user_id }).sort({ orderDate: - 1 })
        lastOrder = sortedOrders[0];

    } return ({ bag: { ...bag, productInBag }, order: lastOrder })
}

export const User = model<IUser, IUserModel>('users', UserSchema);


// robo mongo

