import express, { Express, Request, Response } from 'express';
const app: Express = express();
import dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';
const cors = require('cors');
import { StatusCodes } from 'http-status-codes';
const ErrorHandler = require('./api/middlewares/error-handler')
const userRoute = require('./api/routes/userRoutes')
const orderRoute = require('./api/routes/orderRoutes')
const foodRoute = require('./api/routes/foodRoutes')
const rateLimiter = require('express-rate-limit')

// rest of the packages
//const morgan = require('morgan');

//const helmet = require('helmet');

// app.use(notFoundMiddleware);
// app.use(errorHandlerMiddleware);
// app.use(cookieParser(process.env.JWT_SECRET));

const appLimiter = rateLimiter({
  windowMs:1000,
  max:100
})

app.use(appLimiter())
app.use(cors());
app.use(express.json());
app.use(ErrorHandler())
app.use('/api/v1/user', userRoute);
app.use('/api/v1/order',orderRoute)
app.use('/api/v1/food',foodRoute)



app.get('/api/v1/server-location', async (req, res) => {
  try {
    const response = await axios.get('http://ip-api.com/json');
    const serverLocation = {
      latitude: response.data.lat,
      longitude: response.data.lon,
    };
    res.status(StatusCodes.OK).json(serverLocation);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('could not get server location');
    }
  }
});

const port = process.env.PORT || 5000;
const start =  () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();