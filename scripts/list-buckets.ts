import { S3 } from "aws-sdk"

new S3()
  .listBuckets()
  .promise()
  .then(({ Buckets }) => {
    if (Buckets) Buckets.forEach(({ Name }) => console.log(Name))
  })
