require("dotenv").config();
import request from "request";

const IMAGE_GET_STARTED = 'https://bit.ly/luan-botchat1'
let handleGetStarted = (sender_psid)=>{
    return new Promise(async (resolve, reject) =>{
        try{
            let username = await getUserName(sender_psid);
            let response1 = {"text": `ok. Xin chào mừng bạn ${username} đến với page của Luân`};
            let response2 = sendGetStatedTemplate()
            
            
            await callSendAPI(sender_psid, response1);
            
            await callSendAPI(sender_psid, response2);
            resolve('done');
        }catch(e){
            reject(e);
        }
    })
}

let sendGetStatedTemplate =()=>{
    let  response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "xin chào bạn đến với page của tôi",
                    "subtitle": "dưới đây là các dịch vụ của tôi.",
                    "image_url": IMAGE_GET_STARTED,
                    "buttons": [
                        {
                            "type": "postback",
                            "title": "MENU CHÍNH",
                            "payload": "MAIN_MANU",
                        },
                        {
                            "type": "postback",
                            "title": "ĐẶT DỊCH VỤ",
                            "payload": "RESERVE_TABLE",
                        },
                        {
                            "type": "postback",
                            "title": "HƯỚNG DẨN SỬ DỤNG",
                            "payload": "GUIDE_TO_USE",
                        }
                    ],
                }]
            }
        }
    }

    return response;
}

module.exports = {
    handleGetStarted
}