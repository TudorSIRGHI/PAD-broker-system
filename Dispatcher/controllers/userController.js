import UserModel from "../models/User.js";
import OrderModel from "../models/Order.js";
import * as redis from "redis";

const redisClient = redis.createClient({
    socket: {
        host: 'localhost',
        port: 6379,
    },
});
redisClient.connect().catch(console.error);

export const register = async (req, res) => {
    try {
        const doc = new UserModel({
            name: req.body.name, procent: req.body.procent, orderId: req.body.orderId,
        });
        const book = await doc.save();
        res.json(book);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Error: Book was not created'
        })
    }
}


export const order = async (req, res) => {
    try {
        const doc = new OrderModel({
            pointA: req.body.pointA, pointB: req.body.pointB, price: req.body.price, products: req.body.products
        });
        const order = await doc.save();
        res.json(order);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Error: Book was not created'
        })
    }
}

export const giveOrder = async (req, res) => {
    try {
        const dispatcherId = req.params.id;
        const dispatcher = await UserModel.findById(dispatcherId)

        const cachedOrder = await redisClient.get(`order:${dispatcher.orderId}`);

        if (cachedOrder) {
            console.log("order from Redis");
            return res.json(JSON.parse(cachedOrder));
        }

        const orderId = dispatcher.orderId;
        const order = await OrderModel.findById(orderId);

        await redisClient.set(`order:${orderId}`, JSON.stringify(order), { EX: 3600 });

        return res.json(order);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Error: Something went wrong'
        })
    }
}

