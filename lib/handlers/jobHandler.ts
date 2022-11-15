import { Context, SQSEvent } from 'aws-lambda'
import setLambdaSegmentFromSQS from './xray/setLambdaSegmentFromSqs'

exports.handler = async (event: SQSEvent, context: Context) => {
  try {
    const events = event.Records
    for (const event of events) {
      const segment = setLambdaSegmentFromSQS(context, event)
      try {
        console.log('segment', segment.name)
      } finally {
        if (segment && !segment.isClosed()) {
          segment.close()
        }
      }
    }
  } catch (e: any) {
    const message = `Uncaught error: ${e.message}`
    console.error(message, e)
    throw new Error(e)
  }
}
