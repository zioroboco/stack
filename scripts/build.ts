import { CloudFormation } from "aws-sdk"

type Stack = {
  name: string
  template: string
  capabilities?: string[]
}

type Build = (stack: Stack) => Promise<void>

const build: Build = async ({ name, template, capabilities = [] }) => {
  type Params =
    | CloudFormation.CreateStackInput
    | CloudFormation.UpdateStackInput

  const params: Params = {
    StackName: name,
    TemplateBody: template,
    Capabilities: capabilities
  }

  const cf = new CloudFormation({ apiVersion: "2010-09-09" })
  const existingStackNames = await getExistingStackNames(cf)
  const op = existingStackNames.find(existing => existing === name)
    ? (cf: CloudFormation, params: Params) => cf.updateStack(params)
    : (cf: CloudFormation, params: Params) => cf.createStack(params)

  await op(cf, params).promise()
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
