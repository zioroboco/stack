import * as AWS from "aws-sdk"
import { S3Handler } from "aws-lambda"

const S3 = new AWS.S3({ apiVersion: "2006-03-01" })

export const handler: S3Handler = (event, context, callback) => {
  const bucket = event.Records[0].s3.bucket.name
  const key = decodeURIComponent(
    event.Records[0].s3.object.key.replace(/\+/g, " ")
  )
  const params = {
    Bucket: bucket,
    Key: key
  }
  S3.getObject(params, (err, data) => {
    if (err) {
      console.log(err)
      const message = `Error getting object ${key} from bucket ${bucket}.`
      console.log(message)
      callback(new Error(message))
    } else {
      console.log("CONTENT TYPE: ", data.ContentType)
      callback(null)
    }
  })
}
