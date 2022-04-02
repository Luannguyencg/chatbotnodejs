require("dotenv").config();
import request from "request";

const IMAGE_GET_STARTED = 'https://bit.ly/luan-botchat1'

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN
let callSendAPI = (sender_psid, response) => {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    }

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v9.0/me/messages",
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
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


let getUserName = (sender_psid, response) => {
    return new Promise((resolve, reject) => {

        // Send the HTTP request to the Messenger Platform
        request({
            "uri": `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`,
            "qs": { "access_token": PAGE_ACCESS_TOKEN },
            "method": "GET",

        }, (err, res, body) => {
            if (!err) {
                body = JSON.parse(body);
                // "first_name": "Peter",
                //     "last_name": "Chang",
                let userName = `${body.last_name} ${body.first_name}`
                resolve(userName)
            } else {
                console.error("Unable to send message:" + err);
                reject(err)
            }
        });
    })


}
let handleGetStarted = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userName = await getUserName(sender_psid);
            let response1 = { "text": `Xin chào mừng bạn ${userName} đến với page của Luân` };
            let response2 = getStatedTemplate()


            await callSendAPI(sender_psid, response1);

            await callSendAPI(sender_psid, response2);
            resolve('done');
        } catch (e) {
            reject(e);
        }
    })
}

let getStatedTemplate = () => {
    let response = {
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
                            "payload": "RESERVE",
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

let handleSendMainMenu = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = getMainMenuTemplate()

            await callSendAPI(sender_psid, response1);


            resolve('done');
        } catch (e) {
            reject(e);
        }
    })
}
let getMainMenuTemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "Menu dịch vụ page",
                        "subtitle": "Chúng tôi hân hạnh mang lại dịch vụ tốt nhất cho bạn",
                        "image_url": IMAGE_GET_STARTED,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Xét nghiệm",
                                "payload": "MEDICAL_TEST",
                            },
                            {
                                "type": "postback",
                                "title": "Khám nha khoa",
                                "payload": "DENTALE_EXAMINATION",
                            },
                            {
                                "type": "postback",
                                "title": "Khám tổng quát",
                                "payload": "GENERRALE",
                            }
                        ],
                    },
                    {
                        "title": "Giờ mở cửa",
                        "subtitle": "T2 -T6 7AM - 11PM | ",
                        "image_url": IMAGE_GET_STARTED,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Đặt lịch",
                                "payload": "RESERVE",
                            },
                           
                        ],
                    },
                    {
                        "title": "Các chuyên khoa phổ biến",
                        "subtitle": "Các chuyên khoa có những giáo sư bác sĩ hàng đầu",
                        "image_url": IMAGE_GET_STARTED,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "CHI TIÉT",
                                "payload": "SHOW",
                            },
                            
                        ],
                    },
                ]
            }
        }
    }

    return response;
}


module.exports = {
    handleGetStarted,
    callSendAPI,
    handleSendMainMenu
}