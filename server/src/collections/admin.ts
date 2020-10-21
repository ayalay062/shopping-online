import { model, Schema, Document, Model, Types } from 'mongoose';
import { IProduct, ProductSchema, Product } from './products';
import { hash, compare } from 'bcrypt';

// this interface represents a single user instance
interface IAdmin extends Document {
    firstName: string;
    lastName: string;
    email: string;
    id: string;
    password: string;
    products: IProduct[];
}

const AdminSchema = new Schema<IAdmin>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    id: { type: String, required: true },
    password: { type: String, required: true },
    products: [ProductSchema],
});

AdminSchema.path('username').validate(async (username: string) => {
    const user = await Admin.findOne({ username }).exec();
    const isUserExists = !!user;
    return !isUserExists;
}, 'Username already exists');

AdminSchema.path('email').validate((email: string) => {
    const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(email);
}, 'Email must be a valid email address');


// this interface represents the whole collection - login and register are operations done on the collection, before we have a specific user
export interface IAdminModel extends Model<IAdmin> {
    login(username: string, password: string): Promise<IAdmin>;
    register(firstNameame: string, lastNameame: string, email: string, id: string, password: string,): Promise<string>;
}

// we use UserSchema.statics to implement IUserModel ----------

// this is the implementation of IUserModel.login
AdminSchema.statics.login = async (email: string, password: string): Promise<IAdmin> => {
    const admin = await Admin.findOne({ email }).select(['_id', 'password']).exec();
    if (!admin) {
        throw new Error("email or password don't match");
    }
    const isPasswordCorrect = await compare(password, admin.password);
    if (!isPasswordCorrect) {
        throw new Error("email or password don't match");
    }
    return admin;
}

// this is the implementation of IUserModel.register
AdminSchema.statics.register = async (firstNameame: string, lastNameame: string, email: string, id: string, password: string, ): Promise<string> => {
    const hashedPassword = await hash(password, 10)
    const user = new Admin({
        firstNameame,
        lastNameame, 
        email,
        id,
        password: hashedPassword,
    });
    const { _id: userId } = await user.save();
    return userId;
}

//  --------------------------

// we use UserSchema.methods to implement IUser behavior (methods) -----------

// the createTodo method is specific to a user, so we use UserSchema.methods NOT UserSchema.statics
// AdminSchema.methods.createProduct = async function ({productName, categoryId, price, image, }): Promise<IProduct> {
//     const product = new Product({productName, categoryId, price, image,});
//     this.products.push(product);
//     //  we don't want to validate any existing fields, such as the username etc, 
//     // so we pass `validateModifiedOnly: true` to only validate what's changed (the todos array)
//     await this.save({ validateModifiedOnly: true });
//     return this.products[this.products.length - 1];
// }

// AdminSchema.methods.editProduct = async function (ProductId: string): Promise<void> {
//     // we look for the specific todo by comparing the todoId (but remember it's an ObjectID, so we have to use Types.ObjectId wrapper)
//     const index = this.products.findIndex(t => Types.ObjectId(ProductId).equals(t._id));
//     if (index === -1) {
//         throw new Error("product doesn't exist");
//     }
//     // if we found the todo, we update its isComplete field
//     this.products[index].isComplete = !this.todos[index].isComplete;
//     // and save the document
//     await this.save({ validateModifiedOnly: true });
// }


// AdminSchema.methods.deleteProduct = async function (productId: string): Promise<void> {
//     // we look for the specific todo by comparing the todoId (but remember it's an ObjectID, so we have to use Types.ObjectId wrapper)
//     const index = this.products.findIndex(t => Types.ObjectId(productId).equals(t._id));
//     if (index === -1) {
//         throw new Error("product doesn't exist");
//     }
//     // if we found this todo, we splice it out
//     this.products.splice(index, 1);
//     //  and then save the modified document
//     await this.save({ validateModifiedOnly: true });
// }

// //  ------------------------

export const Admin = model<IAdmin, IAdminModel>('Admin', AdminSchema);