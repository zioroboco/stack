import { CloudFormation } from "aws-sdk"
import { readFileSync } from "fs"

new CloudFormation({
  apiVersion: "2010-05-15",
  region: "ap-southeast-2"
})
  .updateStack({
    StackName: "stack",
    TemplateBody: readFileSync("aws/stack.yaml").toString()
  })
  .promise()
  .then(response => console.log(`Stack updated with id=${response.StackId}`))
