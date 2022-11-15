import { Context, SQSRecord } from 'aws-lambda'
import { Segment, setSegment, utils } from 'aws-xray-sdk-core'
import * as AWSXRay from 'aws-xray-sdk-core'
import { SERVICE_NAME } from '../../config/constants'

function createLambdaSegment(context: Context, sqsRecord: SQSRecord) {
  const lambdaExecStartTime = new Date().getTime() / 1000

  const traceHeaderStr = sqsRecord.attributes.AWSTraceHeader
  const traceData = utils.processTraceData(traceHeaderStr)
  const sqsSegmentEndTime = Number(sqsRecord.attributes.ApproximateFirstReceiveTimestamp) / 1000

  const segment = new Segment(context.functionName, traceData.root, traceData.parent)
  segment.origin = 'AWS::Lambda::Function'
  segment.start_time = lambdaExecStartTime - (lambdaExecStartTime - sqsSegmentEndTime)
  segment.addPluginData({
    function_arn: context.invokedFunctionArn,
    region: sqsRecord.awsRegion,
    request_id: context.awsRequestId,
  })
  segment.setServiceData({
    name: SERVICE_NAME,
  })

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  AWSXRay.captureHTTPsGlobal(require('http'), true)
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  AWSXRay.captureHTTPsGlobal(require('https'), true)
  AWSXRay.capturePromise()
  return segment
}

/**
 * Set the current Lambda segment that instruments SQS.
 *
 * This is a workaround for https://github.com/aws/aws-xray-sdk-node/issues/208.
 *
 * Implementation inspired from:
 * - https://dev.to/aws-builders/x-ray-tracing-from-sqs-to-lambda-8md
 * - https://github.com/kyhau/aws-tools/blob/main/X-Ray/xray-sqs-to-lambda/handler.ts
 *
 * @see https://github.com/aws/aws-xray-sdk-node/issues/208#issuecomment-1285169865
 * @param {object} context Lambda [context](https://docs.aws.amazon.com/lambda/latest/dg/nodejs-context.html)
 * @param {object} sqsRecord SQS [record item](https://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html)
 * @returns {object} X-Ray segment for Lambda
 */
export default function setLambdaSegmentFromSQS(context: Context, sqsRecord: SQSRecord) {
  const segment = createLambdaSegment(context, sqsRecord)
  setSegment(segment)
  return segment
}
