import { App } from 'aws-cdk-lib'
import { BuildConfig } from '../../lib/types/buildConfig'

const getBuildConfig = (app: App) => {
  const env = app.node.tryGetContext('config')
  if (!env) throw new Error('Context variable missing on CDK command. Pass in as `-c config=dev`')

  const envConfig = app.node.tryGetContext(env)

  const buildConfig: BuildConfig = {
    AWSAccountID: expectedNonEmptyString(envConfig, 'AWSAccountID'),
    AWSProfileName: expectedNonEmptyString(envConfig, 'AWSProfileName'),
    AWSProfileRegion: expectedNonEmptyString(envConfig, 'AWSProfileRegion'),
    Environment: expectedNonEmptyString(envConfig, 'Environment'),
    Parameters: {
      ImageDeliveryBucketName: expectedNonEmptyString(
        envConfig['Parameters'],
        'ImageDeliveryBucketName'
      ),
      MaxJobRetryCount: expectedNonEmptyString(envConfig['Parameters'], 'MaxJobRetryCount'),
      MaxJobDelaySeconds: expectedNonEmptyString(envConfig['Parameters'], 'MaxJobDelaySeconds'),
      CustomerMaxDownloadDefault: expectedNonEmptyString(
        envConfig['Parameters'],
        'CustomerMaxDownloadDefault'
      ),
    },
  }

  return buildConfig
}

const expectedNonEmptyString = (obj: { [_: string]: any }, propName: string): string => {
  if (typeof obj[propName] !== 'string' || obj[propName]?.trim().length === 0) {
    throw new Error(`expected build config parameter '${propName}' to be a non-empty string`)
  }

  return obj[propName]
}

export default getBuildConfig
