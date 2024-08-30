import express from "express"

import { userLogin, createUser, userUpdate, userDelete, getSingleUserDelete, getUser } from "../controllers/userController.js"
import { requireSignIn } from "../middlewares/authSignin.js"
import { createExpense, getExpenses } from "../controllers/expenseController.js"
import { createIncome, getIncomes } from "../controllers/incomeController.js"

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
router.post('/add-expense', requireSignIn, createExpense)
router.get('/expenses', getExpenses)


//incomes
router.post('/add-income', requireSignIn, createIncome)
router.get('/incomes', getIncomes)


export default router;