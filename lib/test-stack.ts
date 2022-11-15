import { Stack, StackProps, Tags } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { BuildConfig } from './types/buildConfig'
import { SQS_INPUT_QUEUE_ID } from './config/constants'
import { sqsStack } from './stacks/sqs-stack'
import snsInputStack from './stacks/sns-stack'
import { lambdaSqsStack } from './stacks/lambda-sqs-stack'

export class TestStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps, buildConfig: BuildConfig) {
    super(scope, id, props)

    const inputQueue = sqsStack(this, SQS_INPUT_QUEUE_ID)
    const inputTopic = snsInputStack(this, buildConfig, inputQueue)

    lambdaSqsStack(this, 'jobHandler', {
      snsArn: inputTopic.topicArn,
      queue: inputQueue,
      AWSProfileRegion: buildConfig.AWSProfileRegion,
      buildParameters: buildConfig.Parameters,
    })

    // tag Construct and all its taggable children
    Tags.of(scope).add('map-migrated', 'd-server-00hwsx8de3vcz3')
  }
}
