import { CloudFormation } from "aws-sdk"
import { AWS, Template, Resource } from "cloudformation-declarations"
import { build } from "./build"

const template: Template = {
  AWSTemplateFormatVersion: "2010-09-09",
  Resources: {
    declaredbucket: {
      Type: "AWS::S3::Bucket",
      Properties: {}
    }
  }
}

build({
  template,
  name: "built-stack",
  op: "create"
})
