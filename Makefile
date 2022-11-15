CDK = npx cdk
TS_NODE = npx ts-node
silent = >nul 2>&1

bootstrap:
	$(CDK) bootstrap -c config=test

# Testing
########################################################################################################################
# start local setup
start-local:
	docker compose up -d --wait && make local-bootstrap && make local-deploy && cp .env.sample .env
# run all tests
tests:
	make unit-tests && make integration-tests
# run unit tests (no local setup required)
unit-tests:
	npm run test:unit
# run local integration tests
integration-tests:
	npm run test:integration
# bootstrap	localstack cdk
local-bootstrap:
	npx cdklocal bootstrap -c config=local
# localstack cdk deploy
local-deploy:
	npx cdklocal deploy -c config=local --require-approval never
# send manual test message over sns
local-test-sns:
	awslocal sns publish --topic-arn arn:aws:sns:eu-central-1:000000000000:api-sns-notification --message '{"accountUuid":"3474faf7-7685-4efd-9967-c11c91723cbe","assetUuid": "5574faf7-7685-4efd-9967-c11c91723cbe","fetchUrl": "https://a0.awsstatic.com/libra-css/images/logos/aws_smile-header-desktop-en-white_59x35@2x.png","fileExtension": ".jpg", "filename": "49_43LJ51_D_Desktop_02.jpg"}' --message-attributes '{"type": {"DataType": "String","StringValue": "QueueAssetFetch"}}' --region=eu-central-1
# stop local setup
stop-local:
	docker compose down

