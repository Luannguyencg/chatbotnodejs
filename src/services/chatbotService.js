require("dotenv").config();
import request from "request";

const IMAGE_GET_STARTED = 'https://bit.ly/luan-botchat1'


function callSendAPI(sender_psid, response) {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    }

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('message sent!')
        } else {
            console.error("Unable to send message:" + err);
        }
    });
}
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
    handleGetStarted,
   
}