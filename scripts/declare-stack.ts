import { CloudFormation } from "aws-sdk"
import { AWS, Template, Resource } from "cloudformation-declarations"

const template: Template = {
  AWSTemplateFormatVersion: "2010-09-09",
  Resources: {
    declaredbucket: {
      Type: "AWS::S3::Bucket",
      Properties: {}
    }
  }
}

new CloudFormation({})
  .createStack({
    StackName: "declared",
    TemplateBody: JSON.stringify(template)
  })
  .promise()
  .then(response => console.log(`Stack created with id=${response.StackId}`))
