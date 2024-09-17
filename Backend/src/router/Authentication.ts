import express from 'express'
import { login, registration } from '../controllers/Authentication'
import { emailAvailability } from '../middlewares/Authentication'


export default(router: express.Router) => {
    router.post("/registration", emailAvailability, registration)
    router.post("/login", login)
}