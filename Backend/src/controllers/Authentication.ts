import express from 'express'
import { getDonorByParameter, getDonors, getRequestor, getRequestorByParameter, registerDonor, registerRequestor } from '../models/Users'
import { passEncryption, random } from '../helpers/Encryption'
import { createToken } from '../models/Authentication'
import jwt from 'jsonwebtoken'


export const registration = async (req: express.Request, res: express. Response) => {
    try {
        
        const {email, pass, userType} = req.body

        if(!email || !pass || !["Donor", "Requestor"].includes(userType)) {
            console.log("Bad Request - Registration")
            return res.status(400)
        }

        const salt = random()

        const newUser = {
            email: email,
            authentication: {
                salt: salt,
                password: passEncryption(salt, pass),
            }
        }
        
        console.log("newUser: ", newUser.authentication.password)
        const result = userType === "Donor" ? await registerDonor(newUser) : await registerRequestor(newUser)
        console.log("result: ", result)

        if(!result){
            console.log("registration failed")
            return res.status(304).json({
                messages: {
                    code: 1,
                    message: "registration failed"
                }
            })
        }

        return res.status(201).json({
            messages: {
                code: 1,
                message: "registration successful"
            },
            result
        })
        
    } catch (error) {
        console.log("Internal Server Error - registration")
        console.log("Error: ", error)
        return res.status(500)
    }
}



export const login = async (req: express.Request, res: express.Response) => {
    try {
        
        const {email, pass} = req.body

        if(!email || !pass) {
            console.log("Bad Request")
            return res.status(400)
        }

        let existingUser = await getDonorByParameter({email: email}).select("authentication.password authentication.salt")

        if(!existingUser){
            existingUser = await getRequestorByParameter({email: email})
            if(!existingUser){
                return res.status(204).json({
                    messages: {
                        code: 1,
                        message: "Email not found"
                    }
                })
            }
        }
        const encryptedPass = passEncryption(existingUser.authentication.salt, pass)
        const password = existingUser.authentication.password
        if(password !== encryptedPass){
            return res.status(401)
        }  

        const key = process.env.SECRET_KEY
        const newToken = await createToken({
            token: jwt.sign({ email, pass }, key, {expiresIn: '7d'}),
        })

        return res.status(202).json({
            messages: {
                code: 0,
                message: "Log In Successfully"
            },
            newToken
        })

    } catch (error) {
        console.log("Error:", error)
        return res.status(500)
    }
}