import express from 'express';
import homeController from '../controller/homeController'
let router = express.Router();

let initWebRoutes = (app)=>{
    router.get("/", homeController.getHomePage)
    router.post("/setup-profile", homeController.postSetupProfile)
   
    router.post('/webhook', homeController.postWebhook)
    router.get('/webhook', homeController.getWebhook)

    return app.use('/', router)
}

module.exports  = initWebRoutes
