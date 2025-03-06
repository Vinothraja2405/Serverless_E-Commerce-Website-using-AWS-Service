import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Cart')

def lambda_handler(event, context):
    data = json.loads(event['body'])

    table.delete_item(Key={'user_id': data['user_id'], 'item_id': data['item_id']})

    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps({"message": "Item deleted from cart"})
    }
