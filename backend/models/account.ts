import {Schema,Model,model} from 'mongoose';
import {IAccount} from '../interfaces/account.interface';
import {IProduct} from '../interfaces/product.interface';
import {CartProduct} from '../interfaces/cart.product.interface';

const accountSchema:Schema = new Schema({
    email:{
        type:String,
        required:true,
        trim:true
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:8
    },
    role:{
        type:String,
        required:true,
        enum: ["CLIENT","RESTAURANT"],
        default:"CLIENT"
    },
    bankName:{
      type:String,
      trim:true
    },
    bankAccountNumber:{
      type:Number,
      trim:true
    },
    cart:{
        products:[
            {
                _id:false,
                productId:{
                    type:Schema.Types.ObjectId,
                    ref:"Product",
                    required:true,
                },
                quantity:{
                    type:Number,
                    required:true
                },
            },
        ],
    },
},
{
    timestamps:true,
    versionKey:false
})

accountSchema.methods.addToCart = function (product:IProduct) {
    const cartProductsIndex = this.cart.products.findIndex((cp:CartProduct) => {
      return cp.productId.toString() === product._id.toString();
    });
    let newQuantity = 1;
    const updatedCartProducts = [...this.cart.products];
  
    if (cartProductsIndex >= 0) {
      newQuantity = this.cart.products[cartProductsIndex].quantity + 1;
      updatedCartProducts[cartProductsIndex].quantity = newQuantity;
    } else {
      updatedCartProducts.push({
        productId: product._id,
        quantity: newQuantity,
      });
    }
    const updatedCart = {
      products: updatedCartProducts,
    };
    this.cart = updatedCart;
    return this.save();
};

accountSchema.methods.reduceQuantity = function (productId:String) {
    const newCart = this.cart.products.map((product:CartProduct) => {
      if (product.productId.toString() === productId.toString())
        return {
          ...product.toObject(),
          quantity: product.quantity - 1,
        };
      return product.toObject();
    });
    const finalNewCart = newCart.filter((product:CartProduct) => {
      return product.quantity > 0;
    });
    this.cart.products = finalNewCart;
    return this.save();
};

accountSchema.methods.removeFromCart = function (productId:String) {
    const updatedCartProducts = this.cart.products.filter((product:CartProduct) => {
      return product.productId.toString() !== productId.toString();
    });
    this.cart.products = updatedCartProducts;
    return this.save();
};
  
accountSchema.methods.clearCart = function () {
    this.cart = { products: [] };
    return this.save();
};

const Account:Model<IAccount> = model<IAccount>('Account',accountSchema);

export default Account;