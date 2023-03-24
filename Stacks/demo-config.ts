import { MicroserviceProps } from "@sylvesterllc/aws-constructs";
import { AttributeType, BillingMode, ProjectionType } from "aws-cdk-lib/aws-dynamodb";
import { Runtime } from "aws-cdk-lib/aws-lambda";

export const demoConfig: MicroserviceProps = {
    GLOBALS: {
        name: `sample-test-app`,
        stackRuntime: Runtime.NODEJS_18_X,        
        prefix: 'ds-sta',
        accountNumber: process.env.CDK_DEFAULT_ACCOUNT!,
        region: process.env.CDK_DEFAULT_REGION!,
    },
    API: {
        Name: `sample-test-app`,
        Description: 'This is my new API',
        DomainPrefix: 'my-custom-api',
    },
    RESOURCES: {
    //   CICD: {
    //     name: 'sample-test-app',
    //     repo: {
    //       github_pat_arn: process.env.GITHUB_PAT_ARN!,
    //       name: 'GravyStack/gs-cdk-constructs-demo',
    //       branch: 'main'
    //     }
    //   },
     
    //     AUTHORIZER: {
    //       name: `jwt-authorizer2`,
    //       codePath: './lambda-functions/auth/index.ts',
    //       handler: 'handler',
    //   }, 
        LAMBDA: [
            {
                name: `hello-world`,
                codePath: './lambda-functions/hello-world/index.ts',
                handler: 'main',
                            
                apiGateway: {
                  route: '/hello-world',
                  method: 'get',      
                }
            },
            {
                name: `hello-world2`,
                codePath: './lambda-functions/hello-world/index.ts',
                handler: 'main',
                
                apiGateway: {
                  route: '/hello-world/2',
                  method: 'get',
                }
            },
            {
              name: `hello-world3`,
              codePath: './lambda-functions/hello-world/index.ts',
              handler: 'main',
              
              apiGateway: {
                route: '/hello-world/2/{id}',
                method: 'get',
              secure: true
              }
          },
          {
            name: `hello-world4-no-api-gateway`,
            codePath: './lambda-functions/hello-world/index.ts',
            handler: 'main',
        },
        ],
        DYNAMO: {
            TABLES: [
                {
                    tableName: `sample-audit-history-sta`,
                    primaryKey: {
                        name: 'id',
                        type: AttributeType.STRING,
                    },
                    billingMode: BillingMode.PAY_PER_REQUEST,
                    indexes: [
                        {
                            indexName: 'createdTS',
                            partitionKey: {
                                name: 'createdTS',
                                type: AttributeType.NUMBER
                            },
                            projectionType: ProjectionType.ALL
                        },
                        {
                            indexName: 'username',
                            partitionKey: {
                                name: 'username',
                                type: AttributeType.STRING
                            },
                            projectionType: ProjectionType.ALL
                        },
                    ]
                },
            ],
        },

    },
    DNS: {
      ZoneName: 'dev.davissylvester.com',
      ZoneId: 'Z031821638KLJ1HEVKJKI',
      ZoneNameWithoutPeriod: 'not-used',
      ZoneNameWithoutSuffix: 'not-used',
      ZoneExist: true,
      HostName: '',
      FQDN: 'davis-test.dev.davissylvester.com'
  }
}; 