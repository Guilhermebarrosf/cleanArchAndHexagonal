import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import UserRegisterController from '../infra/adapters/http/controllers/User/UserRegisterController'
import { CreateUserUseCase } from '../core/usecase/User/CreateUserUseCase'
import { UserRegisterRepositoryImpl } from '../infra/adapters/database/mongodb/repositories/UserRegisterRepositoryImpl'
import { ProductRegisterRepositoryImpl } from '../infra/adapters/database/mongodb/repositories/ProductRegisterRepositoryImpl'
import { connectDB } from '../infra/config/database'
import { UserLoginController } from '../infra/adapters/http/controllers/User/UserLoginController'
import UserLoginUseCase from '../core/usecase/User/UserLoginUseCase'
import { FindProductbyIdUseCase } from '../core/usecase/Product/FindProductbyIdUseCase'
import { FindProductbyIdController } from '../infra/adapters/http/controllers/product/FindProductByIdController'

async function connect() {
    await connectDB()
}
connect()
const app = express()
const port = process.env.API_PORT ?? 4000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(port, () => {
    console.log(`Server executing on port: ${port}!`)
})

// ------------------------------------------------------------------//
const userRepository = new UserRegisterRepositoryImpl()
const productRepository = new ProductRegisterRepositoryImpl()
const createUser = new CreateUserUseCase(
    userRepository,
)
const userLogin = new UserLoginUseCase(
    userRepository,

)
const findProductbyId = new FindProductbyIdUseCase(
    productRepository,

)
new UserRegisterController(app, createUser)
new UserLoginController(app, userLogin)
new FindProductbyIdController(app, findProductbyId)

