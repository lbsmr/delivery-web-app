import {Schema,model,Document,Model} from 'mongoose';

interface IProduct extends Document{
    name:string,
    description:string,
    price:number,
    image:string
}

const productSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        maxlength:50,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        unique:true,
        requires:true
    },
    creatorId:{
        type:Schema.Types.ObjectId,
        ref:"Account",
        required:true,
    },
},
{
    timestamps:true,
    versionKey:false
}
);

const Product:Model<IProduct> = model<IProduct>('Product',productSchema);

export default Product;