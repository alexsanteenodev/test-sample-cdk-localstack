#!/usr/bin/env bash
awslocal sns create-topic --name api-sns-notification --region eu-central-1 &&\
awslocal ssm put-parameter --name "/ApiInfrastructure/ARNs/Sns" --value "arn:aws:sns:eu-central-1:000000000000:api-sns-notification" --type String --region "eu-central-1" &&\
awslocal s3api create-bucket --bucket image-delivery-source-s3-l --create-bucket-configuration LocationConstraint=eu-central-1 &&\
awslocal s3api put-bucket-versioning --bucket image-delivery-source-s3-l --versioning-configuration MFADelete=Disabled,Status=Enabled
