import { ISecret } from 'aws-cdk-lib/aws-secretsmanager'

export const getValueFromSecret = (secret: ISecret, key: string): string => {
  return secret.secretValueFromJson(key).unsafeUnwrap()
}
