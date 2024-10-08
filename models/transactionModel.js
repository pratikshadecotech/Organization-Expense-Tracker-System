/** @format */

import mongoose from "mongoose";

const transactionShema = mongoose.Schema(
    {
        userid: {
            type: String,
            required: [false, "userID is required"],
        },
        amount: {
            type: Number,
            required: [true, "amount is required"],
        },
        type: {
            type: String,
            required: [true, "type is required"],
        },
        category: {
            type: String,
            requires: [true, "cat is required"],
        },
        refrence: {
            type: String,
        },
        description: {
            type: String,
            required: [true, "desc is required"],
        },
        date: {
            type: Date,
            required: [true, "data is required"],
        },
    },
    { timestamps: true }
);

export default mongoose.model('transaction', transactionShema)