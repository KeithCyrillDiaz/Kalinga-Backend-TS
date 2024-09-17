import express from 'express'
import { saveForm } from '../controllers/Forms'
import { emailAvailability } from '../middlewares/Authentication'


export default(router: express.Router) => {
    router.post("/saveForm", emailAvailability, saveForm)
}