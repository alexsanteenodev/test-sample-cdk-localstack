#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { TestStack } from '../lib/test-stack'
import readBuildConfig from './functions/readBuildConfig'
import { STACK_ID } from '../lib/config/constants'

export const app = new cdk.App()
const buildConfig = readBuildConfig(app)

new TestStack(
  app,
  STACK_ID,
  {
    env: {
      region: buildConfig.AWSProfileRegion,
      account: buildConfig.AWSAccountID,
    },
  },
  buildConfig
)
