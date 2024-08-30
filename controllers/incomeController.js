import express from "express"
import incomeModel from "../models/incomeModel.js"

export const createIncome = async (req, res) => {
    try {
        const { description, date, category, total } = req.body;
        // Validation
        if (!description) return res.status(400).send("Description is required");
        if (!date) return res.status(400).send("Date is required");
        if (!category) return res.status(400).send("Category is required");
        if (!total) return res.status(400).send("Total is required");

        // Add new expense
        const newIncome = await incomeModel.create({
            description,
            date,
            category,
            total
        });

        res.status(201).send({
            status: "success",
            message: "Income added successfully",
            expense: newIncome,
        });


    } catch (error) {
        console.log(`Error in API: ${error}`);
        res.status(500).send("Internal server error");
    }
}

// get all incomes
export const getIncomes = async (req, res) => {
    try {
        const incomes = await incomeModel.find({})
        if (!incomes || incomes.length === 0) {
            res.status(404).send("incomes not found")
        }
        res.status(500).send({
            status: 'success',
            message: "get all incomes details successfully",
            incomes,
        })
    }
    catch (error) {
        console.log(`error in api ${error}`);
        res.status(200).send('internal server error')
    }
}