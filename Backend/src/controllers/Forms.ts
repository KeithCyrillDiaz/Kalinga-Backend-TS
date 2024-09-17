import express from 'express'
import { createForm } from '../models/Requirements'


export const saveForm = async (req: express.Request, res: express.Response) => {
    try {
        const form = req.body

        if(!form) {
            console.log("Bad Request - saveForm")
            return res.status(400)
        }

        const result = await createForm(form)

        if(!result){
            return res.status(304).json({
                messages: {
                    code: 1,
                    message: "Submittion of Form failed"
                }
            })
        }
        return res.status(201).json({
            messages: {
                code: 0,
                messages: "Successfully Submitted the Form"
            }
        })

    } catch (error) {
        console.log("Error", error)
        return res.status(500)
    }
}