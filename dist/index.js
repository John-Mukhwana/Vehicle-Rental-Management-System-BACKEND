"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_server_1 = require("@hono/node-server");
const hono_1 = require("hono");
require("dotenv/config");
const logger_1 = require("hono/logger");
const csrf_1 = require("hono/csrf");
const trailing_slash_1 = require("hono/trailing-slash");
const timeout_1 = require("hono/timeout");
const http_exception_1 = require("hono/http-exception");
const prometheus_1 = require("@hono/prometheus");
const html_1 = require("hono/html");
const user_router_1 = require("./users/user.router");
const vehicle_router_1 = require("./Vehicle/vehicle.router");
const vehicle_specifiction_router_1 = require("./Vehicle Specification/vehicle specifiction.router");
const Booking_router_1 = require("./Booking/Booking.router");
const payment_router_1 = require("./Payment/payment.router");
const CustomerSupportTicket_router_1 = require("./Customer Support Ticket/CustomerSupportTicket.router");
const LocationAndBranches_router_1 = require("./Location And Branches/LocationAndBranches.router");
const FleetManagement_router_1 = require("./Fleet Management/FleetManagement.router");
const Authentication_router_1 = require("./AuthenticationTable/Authentication.router");
const Authentication_router_2 = require("./AuthenticationTable/Authentication.router");
const cors_1 = require("hono/cors");
const paymentRoute_1 = require("./paymentRoutes/paymentRoute");
const assert_1 = __importDefault(require("assert"));
const app = new hono_1.Hono().basePath('/api');
// app.use('/*', cors())
app.use('*', (0, cors_1.cors)({
    origin: ['http://localhost:5174', 'http://localhost:5173', 'https://exotravel-afjuohsrl-john-bradill-mukhwanas-projects.vercel.app', 'https://exotravel.vercel.app'], // Your frontend URL
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization'],
}));
const customTimeoutException = () => new http_exception_1.HTTPException(408, {
    message: `Request timeout after waiting for more than 10 seconds`,
});
const { printMetrics, registerMetrics } = (0, prometheus_1.prometheus)();
// inbuilt middlewares
app.use((0, logger_1.logger)()); //logs request and response to the console
app.use((0, csrf_1.csrf)()); //prevents CSRF attacks by checking request headers.
app.use((0, trailing_slash_1.trimTrailingSlash)()); //removes trailing slashes from the request URL
app.use('/', (0, timeout_1.timeout)(10000, customTimeoutException));
//3rd party middlewares
app.use('*', registerMetrics);
// default route
app.get('/', (c) => {
    return c.html((0, html_1.html) `
   <h1>Welcome to the social media API</h1>
    <ul>
      <li><b>message:</b> Welcome social media API, </li>
      <li><b>version:</b> 1.0.0,</li>
      <li><b>docs:</b> Please feel free to query the API 📢😂😂,</li>
      </ul>
 </p>
    `);
});
app.get('/ok', (c) => {
    return c.text('The server is running📢😏😏😏!');
});
app.get('/timeout', async (c) => {
    await new Promise((resolve) => setTimeout(resolve, 11000));
    return c.text("data after 5 seconds", 200);
});
app.get('/metrics', printMetrics);
app.notFound((c) => {
    return c.text('Route not found💀', 404);
});
// custom route
app.route("/", user_router_1.userRouter); // api/users  // api/auth/register   or api/auth/login
app.route("/", vehicle_router_1.vehicleRouter);
app.route("/", vehicle_specifiction_router_1.vehicleSpecificationRouter);
app.route("/", Booking_router_1.BookingRouter);
app.route("/", payment_router_1.paymentRouter);
app.route("/", CustomerSupportTicket_router_1.customerSupportTicketRouter);
app.route("/", LocationAndBranches_router_1.locationAndBranchesRouter);
app.route("/", FleetManagement_router_1.fleetManagementRouter);
app.route("/", Authentication_router_1.authenticationRouter);
app.route("auth/", Authentication_router_2.authRouter); // api/auth/register   or api/auth/login
app.route("/", paymentRoute_1.stripeRouter);
(0, assert_1.default)(process.env.PORT, "PORT is not set in the .env file");
(0, node_server_1.serve)({
    fetch: app.fetch,
    port: Number(process.env.PORT)
});
console.log(`Server is running on port ${process.env.PORT} 📢`);
