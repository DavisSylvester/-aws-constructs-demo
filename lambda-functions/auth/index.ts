import { AuthResponse, APIGatewayTokenAuthorizerEvent, PolicyDocument } from 'aws-lambda'
import { CognitoJwtVerifier } from "aws-jwt-verify";
import { CognitoJwtVerifierSingleUserPool } from 'aws-jwt-verify/cognito-verifier';

// Verifier that expects valid tokens:
var _verifier: CognitoJwtVerifierSingleUserPool<{userPoolId:string;tokenUse:"id";clientId:string}>;

const getVerifier = async (): Promise<CognitoJwtVerifierSingleUserPool<{userPoolId:string;tokenUse:"id";clientId:string}>> => {
    if ( ! _verifier ) {
        
        _verifier = CognitoJwtVerifier.create({
            userPoolId: process.env.COGNITO_USER_POOL || '',
            tokenUse: "id",
            clientId: process.env.COGNITO_CLIENT_ID || '',
        });
    }
    return _verifier;
};


export const handler = async (event: APIGatewayTokenAuthorizerEvent): Promise<AuthResponse> => {

    // console.info('Auth Handler called with event');
    // console.info(event);

    if (!event.authorizationToken) {
      throw 'authorization token not found';
    }

    if (!event.authorizationToken.startsWith("Bearer ")) {
        throw 'invalid authorization token. Must be a Bearer token.';
    }

    const token = event.authorizationToken.substring("Bearer ".length);
    // console.log(`Verifying token: :${token}:`);

    try {
        const verifier = await getVerifier();
        const payload = await verifier.verify(token);
        // console.log("Token is valid. Payload:", payload);
        // console.log(payload);
        return generatePolicy(payload['cognito:username'], 'Allow', event.methodArn, payload);
    } catch (err) {
        console.log("Token not valid!");
        console.log(err);
    }
    return generatePolicy('user', 'Deny', event.methodArn);
};

// Help function to generate an IAM policy
var generatePolicy = function(principalId: string, effect: string, resource: string, payload?: any): AuthResponse {
    var authResponse = {} as AuthResponse;
    
    authResponse.principalId = principalId;
    if (effect && resource) {
        var policyDocument = {} as PolicyDocument;
        policyDocument.Version = '2012-10-17'; 
        policyDocument.Statement = [];
        var statementOne: any = {};
        statementOne.Action = 'execute-api:Invoke'; 
        statementOne.Effect = effect;
        statementOne.Resource = resource;
        policyDocument.Statement[0] = statementOne;
        authResponse.policyDocument = policyDocument;
    }
    
    // Optional output with custom properties of the String, Number or Boolean type.
    authResponse.context = payload;
    return authResponse;
}