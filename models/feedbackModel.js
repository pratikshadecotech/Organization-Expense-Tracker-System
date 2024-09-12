import mongoose from "mongoose"
const feedbackSchema = mongoose.Schema(
    {
        feedback: {
            type: String,
            required: true,
        },

    },
    {
        timestamps: true,
    }
);

export default mongoose.model('feedbacks', feedbackSchema)