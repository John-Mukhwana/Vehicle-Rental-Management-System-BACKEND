import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import "dotenv/config"
import { logger } from 'hono/logger'
import { csrf } from 'hono/csrf'
import { trimTrailingSlash } from 'hono/trailing-slash'
import { timeout } from 'hono/timeout'
import { HTTPException } from 'hono/http-exception'
import { prometheus } from '@hono/prometheus'
import { html, raw } from 'hono/html'
import { userRouter } from './users/user.router'
import { vehicleRouter } from './Vehicle/vehicle.router'
import {vehicleSpecificationRouter} from './Vehicle Specification/vehicle specifiction.router'
import { BookingRouter } from './Booking/Booking.router'
import { paymentRouter } from './Payment/payment.router'
import { customerSupportTicketRouter } from './Customer Support Ticket/CustomerSupportTicket.router'
import { locationAndBranchesRouter } from './Location And Branches/LocationAndBranches.router'
import { fleetManagementRouter } from './Fleet Management/FleetManagement.router'
import { authenticationRouter } from './AuthenticationTable/Authentication.router'
import { authRouter } from './AuthenticationTable/Authentication.router'
import {cors} from 'hono/cors'
import {stripeRouter} from './paymentRoutes/paymentRoute';

import  assert from 'assert' 


const app = new Hono().basePath('/api')
// app.use('/*', cors())
app.use('*', cors({
  origin: ['http://localhost:5174','http://localhost:5173','https://exotravel-afjuohsrl-john-bradill-mukhwanas-projects.vercel.app','https://exotravel.vercel.app'], // Your frontend URL
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));


const customTimeoutException = () =>
  new HTTPException(408, {
    message: `Request timeout after waiting for more than 10 seconds`,
  })

const { printMetrics, registerMetrics } = prometheus()

// inbuilt middlewares
app.use(logger())  //logs request and response to the console
app.use(csrf()) //prevents CSRF attacks by checking request headers.
app.use(trimTrailingSlash()) //removes trailing slashes from the request URL
app.use('/', timeout(10000, customTimeoutException))
//3rd party middlewares
app.use('*', registerMetrics)

// default route
app.get('/', (c) => {
  return c.html(
    html`
   <h1>Welcome to the social media API</h1>
    <ul>
      <li><b>message:</b> Welcome social media API, </li>
      <li><b>version:</b> 1.0.0,</li>
      <li><b>docs:</b> Please feel free to query the API 📢😂😂,</li>
      </ul>
 </p>
    `)
})
app.get('/ok', (c) => {
  return c.text('The server is running📢😏😏😏!')
})
app.get('/timeout', async (c) => {
  await new Promise((resolve) => setTimeout(resolve, 11000))
  return c.text("data after 5 seconds", 200)
})
app.get('/metrics', printMetrics)
app.notFound((c) => {
  return c.text('Route not found💀', 404)
})

// custom route
app.route("/", userRouter)   // api/users  // api/auth/register   or api/auth/login
app.route("/",vehicleRouter)
app.route("/",vehicleSpecificationRouter)
app.route("/",BookingRouter)
app.route("/",paymentRouter)
app.route("/",customerSupportTicketRouter)
app.route("/",locationAndBranchesRouter)
app.route("/",fleetManagementRouter)
app.route("/",authenticationRouter)
app.route("auth/", authRouter)   // api/auth/register   or api/auth/login
app.route("/",stripeRouter)



assert(process.env.PORT, "PORT is not set in the .env file")

serve({
  fetch: app.fetch,
  port: Number(process.env.PORT )
})
console.log(`Server is running on port ${process.env.PORT} 📢`)

