import { handler } from "../post/PostStatusLambda";


async function main(){
    
    const event =  
      {
        token: '9443af2b-9366-4267-8746-f44d9d65163d',
        user: {
          post: 'this is a test',
          user: {
            firstname: 'John',
            lastname: 'Marston',
            alias: '@Mar',
            imageUrl: 'https://tweeterbin.s3.us-east-1.amazonaws.com/image/@Mar-profile-picture.png'
          },
          timestamp: 1234567896
        }
      }

    await handler(event);

}

main();