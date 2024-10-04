import UserModel from "../models/User.js";
import axios from "axios";


export const register = async (req, res) => {
    try {
        const doc = new UserModel({
            name: req.body.name, carNumber: req.body.carNumber
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

export const findOrder = async (req, res) => {
    try {
        const dispatcherId = req.params.id;
        const response = await axios.post(`http://localhost:3001/dispatcher/giveOrder/${dispatcherId}`);

        return res.json(response.data);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Something went wrong'
        })
    }
}



