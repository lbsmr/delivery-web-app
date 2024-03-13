enum PaymentTypes{
    "Cash",
    "Debit",
    "Credit"
}

export interface Payment{
    paymentType:PaymentTypes,
    nameOnCard:String,
    expiration:Date,
    cvv:Number,
    creditNumber:Number
}