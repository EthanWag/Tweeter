import { handler } from "../feed/UpdateFeedLambda";


async function main(){
    
    const event = {
        Records: [
          {
            messageId: '23d70d54-df97-4dda-9ff6-e24dbc252012',
            receiptHandle: 'AQEBSdqNWTjQizTtlYNT4j0eUSrb2Y3NfnZxZYLWHnsC0cEqSl4ljImMchee4sJkCke1NXxinmBcJeiaFWj/oRki4rgzrYXQUTgsAEgUIhWMyFp3wNbM8K6nNDnZxWgF5l5AXCKV6BMMDN2i2TpnLhaxfLUISQ66F6+mCqrTscUXmLtouXo82nWuXoAdyOzSgMIlHr3OZSVo6XOK19BVSsCz88w5AhVcF8nY7V9+G4hr/0ifhZN/WQgDexSksnX+AlHm3Dm1cYQ3MDcdrA3up9F6QYHS8Tcr4EcLXXLofBetyeNbmly+fS/hrTedWuVz/qKAQ9u28fV9h+thlm2N2RFDa1ljOy/xEmjL48BXij2+bXIptK6oqSHGUBogtR/IYHjMgD7TFbyb1VWrK52ozclF5w==',
            body: '["@Ewags"]',
            attributes: [Object],
            messageAttributes: {},
            md5OfBody: '690cfba04852e361f19312af75f73e02',
            eventSource: 'aws:sqs',
            eventSourceARN: 'arn:aws:sqs:us-east-1:324037310840:TweeterFeedQueue',
            awsRegion: 'us-east-1'
          }
        ]
      }

    await handler(event);

}

main();