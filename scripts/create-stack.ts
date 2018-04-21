import { CloudFormation } from "aws-sdk"
import { readFileSync } from "fs"

new CloudFormation()
  .createStack({
    StackName: process.env.STACK_NAME || "stack",
    TemplateBody: readFileSync("aws/stack.yaml").toString()
  })
  .promise()
  .then(response => console.log(`Stack created with id=${response.StackId}`))
