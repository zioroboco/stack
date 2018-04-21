import { CloudFormation } from "aws-sdk"
import { readFileSync } from "fs"

new CloudFormation({
  apiVersion: "2010-05-15",
  region: "ap-southeast-2"
})
  .createStack({
    StackName: "stack",
    TemplateBody: readFileSync("aws/stack.yaml").toString()
  })
  .promise()
  .then(response => console.log(`Stack created with id=${response.StackId}`))
