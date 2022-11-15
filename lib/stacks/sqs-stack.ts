import { Duration, RemovalPolicy, Stack } from 'aws-cdk-lib'
import * as sqs from 'aws-cdk-lib/aws-sqs'
import { Queue } from 'aws-cdk-lib/aws-sqs'

export const sqsStack = (stack: Stack, id: string): Queue => {
  const queue = new sqs.Queue(stack, id, {
    visibilityTimeout: Duration.seconds(300),
    removalPolicy: RemovalPolicy.RETAIN,
  })

  return queue
}
