import * as iam from 'aws-cdk-lib/aws-iam'

export default (snsArn: string): iam.PolicyStatement => {
  return new iam.PolicyStatement({
    resources: [snsArn],
    actions: ['sns:Publish', 'sns:SetTopicAttributes'],
    effect: iam.Effect.ALLOW,
  })
}
