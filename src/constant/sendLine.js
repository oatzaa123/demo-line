const request = require('request');

class sendLine {

  replyLine(reply_token, msgArray) {
      let token = process.env.LINE_TOKEN_CHANNEL || "viahgF0U1r8cCxs6JmmQeClrBHE3Sng0L2eDKKGhIV5vv/i+Vl+Up9eooWqor+ABRue6wumafsXliuy7VRjo9trjdcPmFLcLggrp3A2SOBm4L1asIjUTVtJaiR9dCcL6pkF6nsZQBJRI90N6aZdXigdB04t89/1O/w1cDnyilFU=";
      let headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
      };
  
      let body = JSON.stringify({
          replyToken: reply_token,
          messages: msgArray
      });

      console.log(body);

      request.post({
          url: 'https://api.line.me/v2/bot/message/',
          headers: headers,
          body: body
      }, (err, res, body) => {
          console.log('status = ' + res.statusCode);
          if (res.statusCode == 200) {
              return true;
          }
      });

      return false;
  }

  messageNews(detailsArray) {
    const content = this.detailMessageInNews(detailsArray);
    let msg = {
        "type": "flex",
        "altText": "Hot News!",
        "contents": {
          "type": "carousel",
          "contents": content
        }
    };

    return msg;
  }

  detailMessageInNews(detailsArray) {
    let content = [];
    let contentJsonNews = {
        "type": "bubble",
        "header": {
            "type": "box",
            "layout": "horizontal",
            "contents": [
            {
                "type": "text",
                "text": "NEWS",
                "size": "sm",
                "weight": "bold",
                "color": "#AAAAAA"
            }
            ]
        },
        "hero": {
            "type": "image",
            "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_4_news.png",
            "size": "full",
            "aspectRatio": "20:13",
            "aspectMode": "cover",
            "action": {
            "type": "uri",
            "label": "Action",
            "uri": "https://linecorp.com/"
            }
        },
        "body": {
            "type": "box",
            "layout": "horizontal",
            "spacing": "md",
            "contents": [
            {
                "type": "box",
                "layout": "vertical",
                "flex": 1,
                "contents": [
                {
                    "type": "image",
                    "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/02_1_news_thumbnail_1.png",
                    "gravity": "bottom",
                    "size": "sm",
                    "aspectRatio": "4:3",
                    "aspectMode": "cover"
                },
                {
                    "type": "image",
                    "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/02_1_news_thumbnail_2.png",
                    "margin": "md",
                    "size": "sm",
                    "aspectRatio": "4:3",
                    "aspectMode": "cover"
                }
                ]
            },
            {
                "type": "box",
                "layout": "vertical",
                "flex": 2,
                "contents": [
                {
                    "type": "text",
                    "text": "7 Things to Know for Today",
                    "flex": 1,
                    "size": "xs",
                    "gravity": "top"
                },
                {
                    "type": "separator"
                },
                {
                    "type": "text",
                    "text": "Hay fever goes wild",
                    "flex": 2,
                    "size": "xs",
                    "gravity": "center"
                },
                {
                    "type": "separator"
                },
                {
                    "type": "text",
                    "text": "LINE Pay Begins Barcode Payment Service",
                    "flex": 2,
                    "size": "xs",
                    "gravity": "center"
                },
                {
                    "type": "separator"
                },
                {
                    "type": "text",
                    "text": "LINE Adds LINE Wallet",
                    "flex": 1,
                    "size": "xs",
                    "gravity": "bottom"
                }
                ]
            }
            ]
        },
        "footer": {
            "type": "box",
            "layout": "horizontal",
            "contents": [
            {
                "type": "button",
                "action": {
                "type": "uri",
                "label": "More",
                "uri": "https://linecorp.com"
                }
            }
            ]
        }
    };
		content.push(contentJsonNews);

		detailsArray.map(ele => {
			let contentJson =	this.contentMessageInNews(ele);
			content.push(contentJson);
		});

    let contentJsonSeeMore = {
        "type": "bubble",
        "body": {
            "type": "box",
            "layout": "vertical",
            "spacing": "sm",
            "contents": [
            {
                "type": "button",
                "action": {
                "type": "uri",
                "label": "See more",
                "uri": "https://linecorp.com"
                },
                "flex": 1,
                "gravity": "center"
            }
            ]
        }
    };
    content.push(contentJsonSeeMore);

    return content;
  }

  contentMessageInNews(detail) {
		let contentJson = {
				"type": "bubble",
				"hero": {
						"type": "image",
						"url": "https://www.isranews.org/images/2017/isranews/05/010617_ptt.jpg",
						"align": "center",
						"size": "full",
						"aspectRatio": "20:13",
						"aspectMode": "cover"
				},
				"body": {
						"type": "box",
						"layout": "vertical",
						"spacing": "md",
						"action": {
						"type": "uri",
						"label": "Action",
						"uri": "https://linecorp.com"
						},
						"contents": [
						{
								"type": "text",
								"text": detail.stock,
								"size": "xl",
								"weight": "bold"
						},
						{
								"type": "box",
								"layout": "vertical",
								"spacing": "sm",
								"contents": [
								{
										"type": "box",
										"layout": "baseline",
										"contents": [
										{
												"type": "text",
												"text": "Price : " + detail.targetPrice + "฿",
												"flex": 0,
												"margin": "sm",
												"weight": "bold"
										}
										]
								}
								]
						},
						{
								"type": "box",
								"layout": "vertical",
								"contents": [
								{
										"type": "text",
										"text": "Description:"
								},
								{
										"type": "text",
										"text": detail.detail,
										"margin": "lg",
										"size": "sm",
										"align": "start",
										"gravity": "center",
										"weight": "regular",
										"wrap": true
								}
								]
						}
						]
				},
				"footer": {
						"type": "box",
						"layout": "vertical",
						"contents": [
						{
								"type": "spacer",
								"size": "xxl"
						},
						{
								"type": "button",
								"action": {
								"type": "uri",
								"label": "Interested",
								"uri": "https://linecorp.com"
								},
								"color": "#905C44",
								"style": "primary"
						}
						]
				}
		};
		
		return contentJson;
  }
    
  messageText(message) {
    const msg = {
        type: 'text',
        text: message
    };

    return msg;
  }
}

module.exports = sendLine;
