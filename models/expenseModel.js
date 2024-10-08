import mongoose from "mongoose"
const expenseSchema = mongoose.Schema(
    {
        description: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        total: {
            type: String,
            required: true,
        },

    },
    {
        timestamps: true,
    }
);

export default mongoose.model('expenses', expenseSchema)