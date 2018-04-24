import { CloudFormation } from "aws-sdk"
import { readFileSync } from "fs"
import { argv } from "yargs"

const template = argv._[0]
const optCreate = argv.create

if (!template) {
  console.error("Must specify a template!")
  process.exit(2)
}

type Params = CloudFormation.CreateStackInput | CloudFormation.UpdateStackInput
const params: Params = {
  StackName: process.env.STACK_NAME || "stack",
  TemplateBody: readFileSync(template).toString()
}

const operation = optCreate
  ? (cf: CloudFormation, params: Params) => cf.createStack(params)
  : (cf: CloudFormation, params: Params) => cf.updateStack(params)

operation(new CloudFormation(), params)
  .promise()
  .then(response =>
    console.log(
      `Stack ${optCreate ? "create" : "update"}d with id=${response.StackId}`
    )
  )
