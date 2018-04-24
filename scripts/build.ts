import { CloudFormation } from "aws-sdk"
import { Template } from "cloudformation-declarations"

interface Argument {
  template: Template
  name: string
  op: "create" | "update"
}

const build: (arg: Argument) => void = ({ template, name, op }) => {
  type Params =
    | CloudFormation.CreateStackInput
    | CloudFormation.UpdateStackInput
  const params: Params = {
    StackName: name,
    TemplateBody: JSON.stringify(template)
  }

  const opFn = op
    ? (cf: CloudFormation, params: Params) => cf.createStack(params)
    : (cf: CloudFormation, params: Params) => cf.updateStack(params)

  opFn(new CloudFormation(), params)
    .promise()
    .then(response => console.log(`Stack ${op}d with id=${response.StackId}`))
}

export { build }
