import json
import boto3
from boto3.dynamodb.conditions import Key
from decimal import Decimal

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Cart')

# Helper function to convert Decimal to int/float
def decimal_to_native(value):
    if isinstance(value, Decimal):
        return int(value) if value % 1 == 0 else float(value)
    elif isinstance(value, list):
        return [decimal_to_native(v) for v in value]
    elif isinstance(value, dict):
        return {k: decimal_to_native(v) for k, v in value.items()}
    return value

def lambda_handler(event, context):
    # Extract user_id from query parameters
    if 'queryStringParameters' not in event or 'user_id' not in event['queryStringParameters']:
        return {
            "statusCode": 400,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"error": "Missing 'user_id' in request"})
        }
    
    user_id = event['queryStringParameters']['user_id']

    # Query DynamoDB for the user's cart items
    response = table.query(
        KeyConditionExpression=Key('user_id').eq(user_id)
    )

    items = response.get('Items', [])

    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps(decimal_to_native(items))  # Convert Decimals before returning
    }
