import { CloudFormation } from "aws-sdk"
import { Template } from "cloudformation-declarations"

interface Argument {
  template: Template
  name: string
}

const build: (arg: Argument) => void = async ({ template, name }) => {
  type Params =
    | CloudFormation.CreateStackInput
    | CloudFormation.UpdateStackInput
  const params: Params = {
    StackName: name,
    TemplateBody: JSON.stringify(template)
  }

  const cf = new CloudFormation({ apiVersion: "2010-09-09" })
  const existingStackNames = await getExistingStackNames(cf)
  const op = existingStackNames.find(existing => existing === name)
    ? (cf: CloudFormation, params: Params) => cf.updateStack(params)
    : (cf: CloudFormation, params: Params) => cf.createStack(params)

  op(cf, params).promise()
}

const getExistingStackNames = async (cf: CloudFormation) => {
  const { StackSummaries } = await cf.listStacks().promise()
  if (StackSummaries) {
    return StackSummaries.map(stack => stack.StackName)
  } else {
    return []
  }
}

export { build }
