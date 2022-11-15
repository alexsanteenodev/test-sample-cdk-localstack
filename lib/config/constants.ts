export const SERVICE_NAME = 'TestService'

// Identifiers
const PREFIX = 'TestService'

export const HANDLER_ID = `${PREFIX}Handler`

export const STACK_ID = `${PREFIX}Stack`

export const SSM_LAMBDA_ARN_PARAMETER_ID = `${PREFIX}SsmLambdaArnParameter`

export const SQS_FIFO_QUEUE_ID = `${PREFIX}SqsFifoQueue`
export const SQS_INPUT_QUEUE_ID = `${PREFIX}SqsInputQueue`
export const SNS_TOPIC_ID = `${PREFIX}Topic`

export const LAMBDA_INPUT_EVENT_SOURCE_ID = `${PREFIX}LambdaInputEventSource`

export const STATE_MACHINE_ID = `${PREFIX}StateMachine`

// SSM Parameters
export const LAMBDA_ARN_PARAMETER_NAME = `/${PREFIX}/ARNs/Lambda`

export const SNS_ARN_PARAMETER_NAME = '/ApiInfrastructure/ARNs/Sns'

export const LAMBDA_LOG_GROUP_ID_PARAMETER_NAME = `/${PREFIX}/LogGroupIds`

// DB
export const DYNAMO_DB_PARTITION_KEY = `customerUuid`

// Bucket
export const BUCKET_FOLDER = `test-assets-tmp`

// retry config
export const DELAY_PROP_NAME = `delaySeconds`
