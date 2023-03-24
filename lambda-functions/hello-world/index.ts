import { randomInt } from 'node:crypto';



export const main = async (event: any, context: any) => {
    
    const startRange: number = parseInt(event.queryStringParameters?.startRange) || 1;
    const endRange: number = parseInt(event.queryStringParameters?.endRange) || 1000;
    const randomnumber: number = randomInt(startRange, endRange);
    let randomnumberstring = `${randomnumber}`;

   
        return {
            statusCode: 200,
            body: JSON.stringify({
                result: randomnumberstring
            }),
        };
   
};