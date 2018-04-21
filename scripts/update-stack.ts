import { CloudFormation } from "aws-sdk"
import { readFileSync } from "fs"

new CloudFormation()
  .updateStack({
    StackName: process.env.STACK_NAME || "stack",
    TemplateBody: readFileSync("aws/stack.yaml").toString()
  })
  .promise()
  .then(response => console.log(`Stack updated with id=${response.StackId}`))
