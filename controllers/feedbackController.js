import express from "express"
import feedbackModel from "../models/feedbackModel.js"
import dateFormat from 'date-and-time'

export const createFeedback = async (req, res) => {
    try {
        const { feedback } = req.body;
        // Validation
        if (!feedback) return res.status(400).send("Feedback is required");


        // Add new feedback
        const newFeedback = await feedbackModel.create({
            feedback,

        });

        res.status(201).send({
            status: "success",
            message: "Feedback added successfully",
            feedback: newFeedback,
        });


    } catch (error) {
        console.log(`Error in API: ${error}`);
        res.status(500).send("Internal server error");
    }
}


// get all feedbacks
export const getFeedbacks = async (req, res) => {
    try {
        const getFeedbacks = await feedbackModel.find({})
        if (!getFeedbacks || getFeedbacks.length === 0) {
            res.status(404).send("Feedbacks not found")
        }
        res.status(200).send({
            status: 'success',
            message: "get all feedbacks details successfully",
            getFeedbacks,
        })
    }
    catch (error) {
        console.log(`error in api ${error}`);
        res.status(500).send('internal server error')
    }
}