import { handler } from "../feed/UpdateFeedLambda";


async function main(){
    
    const event =  {
      Records: [
        {
          messageId: '7a1a00c1-bb08-416f-97ac-5c0db72be966',
          receiptHandle: 'AQEBJzkN414sriRP7jp6Df//qKzaVIPJ8c//eGXNVzUbUWZXZCyeq6fHdC+77iuXmKUwjW0Hr9OMwBr2F1sUTrptfTISWtOAbFpdLFkFCooiqCbr9j+pGijP+1Rd+3G9iuL9TtBvqEvzjE3G5dZOprsAeCMKU42Mxn6AvgR/EthIgpxSWa6BFsZ/tJBbck9EdM8pYPQPPT4ue39IqdTPB6s/VcLD3a8b4SQ+YC5LGdYGiff/ziNME25luEelgHrjC/9ey/NuofSAiDf9iMrdDIE3Et5NJ0IeDRpYLmk+38vdYZMdnaA8ed5tSZX9YFOwkL+aLA6+y4flY3GavBuB2Gx0SmXeVhyOybtJejEaA6fEdzTNVn8nyailGnMvdFtiX8cJ6Xk9O+FnDz46TagWnRoeLg==',
          body: '{"post":{"post":"sadsadf","user":{"firstname":"John","lastname":"Marston","alias":"@Mar","imageUrl":"https://tweeterbin.s3.us-east-1.amazonaws.com/image/@Mar-profile-picture.png"},"timestamp":1744433207602},"followeesAlias":["@Ewags"]}',
          attributes: [Object],
          messageAttributes: {},
          md5OfBody: '74e14c5e2b63bbe8a7da4f91293c9c9a',
          eventSource: 'aws:sqs',
          eventSourceARN: 'arn:aws:sqs:us-east-1:324037310840:TweeterFeedQueue',
          awsRegion: 'us-east-1'
        }
      ]
    }

    await handler(event);

}

main();