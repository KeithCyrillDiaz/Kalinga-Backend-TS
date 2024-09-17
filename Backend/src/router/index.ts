import express from 'express'
import Authentication from './Authentication'
import Form from './Forms'
const router = express.Router()

export default(): express.Router => {
     Authentication(router)
     Form(router)
     return router
}