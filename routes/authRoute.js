import express from "express"

import { userLogin, createUser, userUpdate, userDelete, getSingleUserDelete, getUser } from "../controllers/userController.js"
import { requireSignIn } from "../middlewares/authSignin.js"
import { createExpense, getExpenses } from "../controllers/expenseController.js"
import { createIncome, getIncomes } from "../controllers/incomeController.js"
import { createFeedback, getFeedbacks } from "../controllers/feedbackController.js"

import {
    addTransaction,
    getAllTransaction,
    editTransaction,
    deleteTransaction,
} from "../controllers/transactionController.js";

const router = express.Router();


//route of User API

router.post('/login', userLogin)

//added middleware requiresignin


//user registration
router.post('/register', requireSignIn, createUser)
router.put('/update-user/:id', userUpdate)
router.delete('/delete-user/:id', userDelete)
router.get('/user/:id', getSingleUserDelete)
router.get('/users', getUser)


//expenses
router.post('/add-expense', createExpense)
router.get('/expenses', getExpenses)


//incomes
router.post('/add-income', requireSignIn, createIncome)
router.get('/incomes', getIncomes)

// add transaction
router.post("/add-transection", addTransaction);
// edit transaction
router.post("/edit-transection", editTransaction);
// delete transaction
router.post("/delete-transection", deleteTransaction);
//get transaction by id
router.post("/get-transection", getAllTransaction);

//feedbacks
router.post('/add-feedback', createFeedback)
router.get('/feedbacks', getFeedbacks)

export default router;