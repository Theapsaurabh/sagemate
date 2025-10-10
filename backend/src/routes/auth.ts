import { Router } from "express";
import {register,login, logout } from "../controllers/authControllers"

// middleware
import { auth } from "../middleware/auth";
const router= Router();
// post/auth /register
router.post("/register", register)

// post/.auth/ login
router.post('/login', login)

// post/ auth/ logout
router.post('/logout',auth, logout)

router.get('/me', auth, (req,res)=>{
    res.json({
        user: req.user
    })
})
export default router;