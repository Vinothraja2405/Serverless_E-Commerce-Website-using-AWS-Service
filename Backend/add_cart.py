import json
import boto3
import uuid

# Initialize DynamoDB
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Cart')

def lambda_handler(event, context):
    try:
        # Check if body exists
        if "body" not in event:
            return {
                "statusCode": 400,
                "headers": {"Access-Control-Allow-Origin": "*"},
                "body": json.dumps({"error": "Missing 'body' in request"})
            }

        # Parse JSON request body
        data = json.loads(event['body'])

        # Extract values from request
        user_id = data.get('user_id')
        name = data.get('name')
        price = data.get('price')
        quantity = data.get('quantity', 1)  # Default quantity = 1
        image_url = data.get('image_url')

        item_id = str(uuid.uuid4())  # Example: "3e9f3c4e-8bd9-4c6a-bf35-7e8d71d48f9b"

        # Validate required fields
        if not all([user_id, name, price, image_url]):
            return {
                "statusCode": 400,
                "headers": {"Access-Control-Allow-Origin": "*"},
                "body": json.dumps({"error": "Missing required fields"})
            }

        # Insert into DynamoDB
        table.put_item(Item={
            'user_id': user_id,  # Partition Key
            'item_id': item_id,  # Sort Key (Generated inside Lambda)
            'name': name,
            'price': price,
            'quantity': quantity,
            'image_url': image_url
        })

        
        return {
            "statusCode": 200,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"message": "Item added to cart", "item_id": item_id})
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"error": str(e)})
        }
