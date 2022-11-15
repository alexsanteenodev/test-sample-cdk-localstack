import * as sns from 'aws-cdk-lib/aws-sns'
import { Stack } from 'aws-cdk-lib'
import * as ssm from 'aws-cdk-lib/aws-ssm'
import * as subscription from 'aws-cdk-lib/aws-sns-subscriptions'
import { BuildConfig } from '../types/buildConfig'
import { SNS_ARN_PARAMETER_NAME, SNS_TOPIC_ID } from '../config/constants'
import { Queue } from 'aws-cdk-lib/aws-sqs'
import { ITopic } from 'aws-cdk-lib/aws-sns'

const snsInputStack = (stack: Stack, _buildConfig: BuildConfig, queue: Queue): ITopic => {
  const snsArn = ssm.StringParameter.valueForStringParameter(stack, SNS_ARN_PARAMETER_NAME)

  const topic = sns.Topic.fromTopicArn(stack, SNS_TOPIC_ID, snsArn)

  topic.addSubscription(
    new subscription.SqsSubscription(queue, {
      filterPolicy: {
        type: sns.SubscriptionFilter.stringFilter({
          allowlist: ['QueueAssetFetch'],
        }),
      },
    })
  )

  return topic
}

export default snsInputStack
