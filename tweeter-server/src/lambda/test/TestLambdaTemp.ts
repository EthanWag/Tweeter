import { handler } from "../feed/PostMessagesLambda";
import { PagedUserItemRequest, PagedUserItemResponse  } from "tweeter-shared";


async function main(){
    
    const event = {
        Records: [
          {
            messageId: 'aed68896-fef1-4527-924e-7e007471f42e',
            receiptHandle: 'AQEBwBUAoTRNfwEYny8tao9NAgQHej3j9Izqn0Cxj5QnzSXORHj6mF7VKNMx89Fm0Q8+iHQ0U63SUkxuYuSvfMqnrB46NYhw35Yzhg4c3K1v7+gdNV2GaCp/fgQhXVW0JrtmzkHwtnh+K1hQBo+KQcuRKNWva+LYk2jJfEugejwax9Y1JnLkRbIFwDVcxyrNQeHMpijGyy3b9y2O6NU2EiN0otJlwc8e8LibjnlzrckOum2fobNaKcn9Q/6Q5s3CZarMjM8s4b/V+lw2LPNscSui+9b3uZiI1arqpUujyYRXZO+LuSQEC0jjzBupmrvjnj+RDM6Dazq36hNNgV9Ff/v2+myMfKa2Cx2/yfCrTF9/PErYNaivzuhNT9amEF/FyBSIOiAONbOOx6sUMt+fPPOTNw==',
            body: '{"alias":"@Mar","post":{"post":"this is a test","user":{"firstname":"John","lastname":"Marston","alias":"@Mar","imageUrl":"https://tweeterbin.s3.us-east-1.amazonaws.com/image/@Mar-profile-picture.png"},"timestamp":1744396509920}}',
            attributes: [Object],
            messageAttributes: {},
            md5OfBody: 'edee6f6b525b3b039d9cf7574cdd4b4c',
            eventSource: 'aws:sqs',
            eventSourceARN: 'arn:aws:sqs:us-east-1:324037310840:TweeterPostQueue',
            awsRegion: 'us-east-1'
          }
        ]
      }

    const final = await handler(event);

    console.log(final);

}

main();