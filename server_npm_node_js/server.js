import express from 'express';
import morgan from 'morgan';
import logger ,{stream} from './core/logger/logger.js'
import dotenv from 'dotenv';
import compression from 'compression';
import cors from 'cors';
// import fileUpload from "express-fileupload";


import errorHandler from './core/error-handler/error-handler.js';
import CollectionKeyGenController from './api/collection-key-gen/collection-key-gen.controller.js';
import LoginController from './api/user/login/login.controller.js';
import ProviderController from './api/user/provider/provider.controller.js';
import OrganizationController from './api/organization/organization.controller.js';
import FacilityController from './api/facility/facility.controller.js';
import PricelistController from "./api/services/pricelist.controller.js";
 import { startAuthAPI } from './core/authentication/authapi.js';

// Configure env file
dotenv.config();

// Instantiating the App
const app = express();

// Swagger setup
import swaggerUi from 'swagger-ui-express';
import { readFile } from 'fs/promises';

const swaggerDocument = JSON.parse(
  await readFile(
    new URL('./swagger.json', import.meta.url)
  )
);

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// app.use(fileUpload());

// Handle Exception
process.on('uncaughtException',err=>{
    logger.error("Uncaught Exception");
    logger.error(err.name,err.message);
      process.exit(0);
  });

// Apply Middlewares

app.use(cors());

app.use(morgan('tiny',{
    stream: stream
  }));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "*");
    // Request methods you wish to allow
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT", "PATCH");
    // Request headers you wish to allow
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,Content-Type,Authorization");
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Expose-Headers", "token");
    res.setHeader("Access-Control-Allow-Credentials", true);
    // Pass to next layer of middleware
    next();
  });

// compress all responses
app.use(compression());

app.get('/',(req,res) => {
  res.send("Hello world!");
})

app.use('/user',LoginController);
app.use('/provider',ProviderController);
app.use(express.static("./image"))
startAuthAPI(app);

app.use('/collection-key-gen',CollectionKeyGenController);

app.use('/organization',OrganizationController);
app.use('/facility',FacilityController);
app.use("/upload", PricelistController);
app.use("/", PricelistController);
app.use("/getPriceList",PricelistController)

// Handle All Errors 
app.use(errorHandler);       

//  Application startup
app.listen(process.env.PORT || 3000, () => {  
    logger.info('App listening at http://'+process.env.host+':'+process.env.PORT || 3000);
    logger.info('Environment : '+process.env.NODE_ENV);
    logger.info(new Date());  
});    
