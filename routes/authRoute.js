import express from "express"
import { requireSignIn } from "../middlewares/authSignin.js"
import { getProductByIdController, getProductsController, productController } from "../Controllers/ProductController.js";
import formidable from "express-formidable"

import { createUser, userLoginController } from "../Controllers/authController.js"
import { userUpdateController } from "../Controllers/authController.js"
import { userDeleteController } from "../Controllers/authController.js"
import { getSingleUserDeleteController } from "../Controllers/authController.js"
import { getUserController } from "../Controllers/authController.js"

const router = express.Router();

//route of User API

router.post('/login', userLoginController)

router.post('/register', requireSignIn, createUser)
router.put('/update-user/:id', userUpdateController)
router.delete('/delete-user/:id', userDeleteController)
router.get('/user/:id', getSingleUserDeleteController)
router.get('/users', getUserController)


export default router;