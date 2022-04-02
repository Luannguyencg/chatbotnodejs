import express from 'express';
import homeController from '../controller/homeController'
let router = express.Router();

let initWebRoutes = (app)=>{
    router.get("/", homeController.getHomePage)
    router.post("/setup-profile", homeController.postSetupProfile)
    //persistent menu
    router.post("/setup-persistent-menu", homeController.postSetupPersistentMenu)
   
    router.post('/webhook', homeController.postWebhook)
    router.get('/webhook', homeController.getWebhook)

    return app.use('/', router)
}

module.exports  = initWebRoutes
