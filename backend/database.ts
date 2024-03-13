import mongoose from 'mongoose';

(async () => {
    try {
        const db = await mongoose.connect('mongodb+srv://lbsmr:XUHLaqbRIkntds3O@delivery-web-app.tv8wid3.mongodb.net/test');

        console.log('Connected to: ' + db.connection.name);
    } catch (err) {
        console.error(err);
    }
})();

//`mongodb://${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}`

//mongodb+srv://lbsmr:XUHLaqbRIkntds3O@delivery-web-app.tv8wid3.mongodb.net/test

//`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_DATABASE}.tv8wid3.mongodb.net/test`