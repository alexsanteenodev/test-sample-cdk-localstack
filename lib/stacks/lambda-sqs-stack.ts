import { aws_logs, Duration, Stack } from 'aws-cdk-lib'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as lambdaNode from 'aws-cdk-lib/aws-lambda-nodejs'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { Queue } from 'aws-cdk-lib/aws-sqs'
import { HANDLER_ID, LAMBDA_INPUT_EVENT_SOURCE_ID } from '../config/constants'
import lambdaSqsPolicy from '../policies/lambda-sqs-policy'
import { BuildParameters } from '../types/buildConfig'
import { Tracing } from 'aws-cdk-lib/aws-lambda'

export const lambdaSqsStack = (
  stack: Stack,
  handlerId: string,
  options: OptionsType
): NodejsFunction => {
  const handler = new lambdaNode.NodejsFunction(stack, `${HANDLER_ID}${handlerId}`, {
    logRetention: aws_logs.RetentionDays.THREE_DAYS,
    entry: `./lib/handlers/${handlerId}.ts`,
    handler: 'handler',
    runtime: lambda.Runtime.NODEJS_16_X,
    timeout: Duration.minutes(1),
    tracing: Tracing.ACTIVE,
    environment: {
      SNS_ARN: options.snsArn,
      AWS_PROFILE_REGION: options.AWSProfileRegion,
    },
  })

  // map lambda handler to SQS queue
  handler.addEventSourceMapping(LAMBDA_INPUT_EVENT_SOURCE_ID, {
    eventSourceArn: options.queue.queueArn,
  })

  // allow handler to read queue
  handler.addToRolePolicy(lambdaSqsPolicy(options.queue.queueArn))

  return handler
}

type OptionsType = {
  queue: Queue
  snsArn: string
  AWSProfileRegion: string
  buildParameters: BuildParameters
}
