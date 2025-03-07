# Serverless E-Commerce Website using AWS Services

## 📌 Overview
This project is a **serverless e-commerce website** built using AWS services. It allows users to browse products, add items to their cart, edit, and delete cart items. The website follows a **serverless architecture**, leveraging AWS Lambda, API Gateway, DynamoDB, and S3.

## 🚀 Features
- **Product Management**: Retrieve product listings from DynamoDB.
- **Cart Operations**:
  - Add items to the cart.
  - Edit cart items (update quantity, etc.).
  - Delete items from the cart.
- **Serverless Backend** using AWS Lambda (Python) with API Gateway.
- **Secure API Communication** with AWS IAM & JWT authentication (optional).
- **No Payment Integration** (for now).

## 🛠️ Tech Stack
- **Frontend:** HTML, CSS, JavaScript (Hosted on AWS S3)
- **Backend:** AWS Lambda (Python) with API Gateway
- **Database:** AWS DynamoDB
- **Storage:** AWS S3
- **Deployment:** AWS Amplify (Optional)

## 📂 Project Structure
```
📁 Serverless_E-Commerce-Website-using-AWS-Service
│── 📁 frontend/          # Static Website (HTML, CSS, JavaScript)
│── 📁 backend/           # Lambda Functions (Python)
│── 📁 database/          # DynamoDB Schema & Configuration
│── 📄 README.md          # Project Documentation
│── 📄 api_endpoints.md   # API Endpoint Details
```

## 📌 AWS Services Used
| Service       | Purpose |
|--------------|---------|
| **S3**       | Hosting static frontend |
| **API Gateway** | Exposing backend endpoints |
| **Lambda**   | Handling business logic (CRUD operations for cart) |
| **DynamoDB** | Storing product and cart data |

## 🚀 Deployment Steps
1. **Clone the repository:**
   ```sh
   git clone https://github.com/Vinothraja2405/Serverless_E-Commerce-Website-using-AWS-Service.git
   ```
2. **Set up AWS resources:**
   - Create an **S3 Bucket** for hosting.
   - Set up **DynamoDB Tables** for `Products` and `Cart`.
   - Deploy **Lambda Functions** and configure **API Gateway**.
   - (Optional) Use **AWS Amplify** for automated deployment.

3. **Deploy the frontend:**
   - Upload the `frontend/` files to the **S3 bucket**.
   - Enable static website hosting in the S3 bucket settings.

4. **Test the API Endpoints** using Postman or cURL.

## 📌 API Endpoints
| Method | Endpoint | Description |
|--------|---------|-------------|
| `GET`  | `/products` | Fetch all products |
| `POST` | `/cart` | Add item to cart |
| `PUT`  | `/cart/{id}` | Update cart item |
| `DELETE` | `/cart/{id}` | Remove item from cart |

## 🎯 Future Enhancements
- Add user authentication (Cognito / JWT-based auth)
- Implement order placement & tracking
- Integrate payment gateway (Stripe, Razorpay, etc.)

## 🤝 Contributing
Contributions are welcome! Feel free to fork this repo and submit a pull request.

## 📄 License
This project is open-source and available under the **MIT License**.

---
Made with ❤️ by [Vinothraja](https://github.com/Vinothraja2405) 🚀
