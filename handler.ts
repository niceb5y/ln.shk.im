import { APIGatewayProxyHandler } from 'aws-lambda'
import * as AWS from 'aws-sdk/global'
import * as DynamoDB from 'aws-sdk/clients/dynamodb'

export const index: APIGatewayProxyHandler = async () => {
  return {
    statusCode: 301,
    headers: {
      Location: process.env.PAGE_INDEX
    },
    body: ''
  }
}

export const link: APIGatewayProxyHandler = async event => {
  AWS.config.update({
    region: 'ap-northeast-2'
  })

  const docClient = new DynamoDB.DocumentClient()

  var params = {
    TableName: process.env.DB_TABLE_NAME,
    Key: {
      id: event.pathParameters['link_id']
    }
  }

  try {
    const result = await docClient.get(params).promise()
    return {
      statusCode: 301,
      headers: {
        Location: decodeURI(result.Item['location'])
      },
      body: ''
    }
  } catch (err) {
    return {
      statusCode: 301,
      headers: {
        Location: process.env.PAGE_404
      },
      body: ''
    }
  }
}
