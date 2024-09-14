import mongoose from "mongoose"
const feedbackSchema = mongoose.Schema(
    {
        feedback: {
            type: String,
            required: true,
        },
        userid: {
            type: String,
            required: [false, "userID is required"],
        },

    },
    {
        timestamps: true,
    }
);

export default mongoose.model('feedbacks', feedbackSchema)