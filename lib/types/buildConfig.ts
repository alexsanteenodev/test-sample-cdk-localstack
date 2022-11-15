export interface BuildConfig {
  readonly AWSAccountID: string
  readonly AWSProfileName: string
  readonly AWSProfileRegion: string
  readonly Environment: string
  readonly Parameters: BuildParameters
}

export interface BuildParameters {
  readonly ImageDeliveryBucketName: string
  readonly MaxJobRetryCount: string
  readonly MaxJobDelaySeconds: string
  readonly CustomerMaxDownloadDefault: string
}
