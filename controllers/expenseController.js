import express from "express"
import expenseModel from "../models/expenseModel.js"
import dateFormat from 'date-and-time'

export const createExpense = async (req, res) => {
    try {
        const { description, date, category, total } = req.body;
        // Validation
        if (!description) return res.status(400).send("Description is required");
        if (!date) return res.status(400).send("Date is required");
        if (!category) return res.status(400).send("Category is required");
        if (!total) return res.status(400).send("Total is required");

        // const dateNew = dateFormat.format((new Date(date)),
        //     'DD-MM-YYYY');

        // Add new expense
        const newExpense = await expenseModel.create({
            description,
            date,
            category,
            total
        });

        res.status(201).send({
            status: "success",
            message: "Expense added successfully",
            expense: newExpense,
        });


    } catch (error) {
        console.log(`Error in API: ${error}`);
        res.status(500).send("Internal server error");
    }
}


// get all expenses
export const getExpenses = async (req, res) => {
    try {
        const getExpenses = await expenseModel.find({})
        if (!getExpenses || getExpenses.length === 0) {
            res.status(404).send("expenses not found")
        }
        res.status(200).send({
            status: 'success',
            message: "get all expenses details successfully",
            getExpenses,
        })
    }
    catch (error) {
        console.log(`error in api ${error}`);
        res.status(500).send('internal server error')
    }
}