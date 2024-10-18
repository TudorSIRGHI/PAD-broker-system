import express from 'express';
import mongoose from 'mongoose';
import supertest from 'supertest';
import { order } from '../controllers/userController.js';
import * as chai from 'chai';
const { expect } = chai;

const app = express();
app.use(express.json());
app.post('/dispatcher/order', order);

before(async () => {
    await mongoose.connect('mongodb://localhost:27017/MyDatabase');
});

after(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});

describe('Order API', () => {
    it('should create a new order and return it', async () => {
        const newOrder = {
            pointA: "Moldova",
            pointB: "Franta",
            price: 500,
            products: "Mere, Pere, Struguri"
        };

        const res = await supertest(app) // Use supertest to make requests
            .post('/dispatcher/order')
            .send(newOrder);

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('_id');
        expect(res.body).to.include(newOrder);
    });

});
