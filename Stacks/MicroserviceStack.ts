import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { Microservice } from "@sylvesterllc/aws-constructs";


export class MicroserviceDemoStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
      super(scope, id, props);
  
      new Microservice
    }
  }
  