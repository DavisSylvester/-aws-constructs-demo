import { MicroService } from "@sylvesterllc/aws-constructs";
import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { demoConfig } from "./demo-config";



export class MicroserviceDemoStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
      super(scope, id, props);
  
      
      new MicroService(this, `davis-demo-microservice`, demoConfig);
    }
  }
  