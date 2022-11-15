import * as iam from 'aws-cdk-lib/aws-iam'

const lambdaSqsPolicy = (sqsArn: string): iam.PolicyStatement => {
  return new iam.PolicyStatement({
    resources: [sqsArn],
    actions: [
      'sqs:SendMessage',
      'sqs:ChangeMessageVisibility',
      'sqs:ReceiveMessage',
      'sqs:GetQueueAttributes',
      'sqs:DeleteMessage',
    ],
    effect: iam.Effect.ALLOW,
  })
}
export default lambdaSqsPolicy
