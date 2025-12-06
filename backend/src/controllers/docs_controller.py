from flask import Blueprint, render_template_string

docs_bp = Blueprint("docs", __name__, url_prefix="/docs")

HTML_TEMPLATE = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fast Forward API Docs</title>
    <style>
        body {
            font-family: system-ui, -apple-system, sans-serif;
            line-height: 1.5;
            max-width: 900px;
            margin: 0 auto;
            padding: 20px;
            color: #333;
        }
        h1 { border-bottom: 2px solid #333; padding-bottom: 10px; }
        .endpoint {
            margin-bottom: 40px;
            border: 1px solid #ddd;
            padding: 20px;
            border-radius: 4px;
        }
        .header {
            margin-bottom: 15px;
        }
        .method {
            font-weight: bold;
            background: #eee;
            padding: 2px 6px;
            border-radius: 3px;
            margin-right: 10px;
        }
        .method.get { background: #61affe; color: white; }
        .method.post { background: #49cc90; color: white; }
        .method.put { background: #fca130; color: white; }
        .url { font-family: monospace; font-size: 1.1em; }
        pre {
            background: #f5f5f5;
            padding: 15px;
            overflow-x: auto;
            border-radius: 4px;
        }
        code { font-family: monospace; }
        .section-title {
            font-weight: bold;
            margin-top: 15px;
            margin-bottom: 5px;
        }
    </style>
</head>
<body>
    <h1>API Documentation</h1>
    <p>Base URL: <code>/api</code></p>
    <p><strong>Test username:</strong> <code>khasanrashidov</code></p>

    <h2>Users</h2>

    <div class="endpoint">
        <div class="header">
            <span class="method get">GET</span>
            <span class="url">/users/&lt;username&gt;</span>
        </div>
        <p><strong>Get User by Username</strong></p>
        <p class="section-title">Response (200 OK):</p>
        <pre>{
  "is_success": true,
  "message": "User retrieved successfully",
  "data": {
    "id": "uuid-string",
    "username": "khasanrashidov",
    "email": "khasan@example.com",
    "first_name": "Khasan",
    "last_name": "Rashidov",
    "salary": 3000000,
    "age": 23,
    "family_size": 1,
    "phone_number": "+998906756075",
    "bio": "Senior Software Engineer",
    "location": "Tashkent, Uzbekistan",
    "currency": "UZS",
    "role": "CLIENT",
    "is_active": true
  }
}</pre>
    </div>

    <div class="endpoint">
        <div class="header">
            <span class="method put">PUT</span>
            <span class="url">/users/&lt;username&gt;</span>
        </div>
        <p><strong>Update User Profile</strong></p>
        <p class="section-title">Request Body:</p>
        <pre>{
  "salary": 3500000,
  "age": 24,
  "family_size": 2,
  "first_name": "Khasan",
  "last_name": "Rashidov",
  "bio": "Senior Software Engineer",
  "location": "Tashkent, Uzbekistan"
}</pre>
        <p class="section-title">Response (200 OK):</p>
        <pre>{
  "is_success": true,
  "message": "User updated successfully",
  "data": { /* updated user object */ }
}</pre>
    </div>

    <h2>Cards</h2>

    <div class="endpoint">
        <div class="header">
            <span class="method post">POST</span>
            <span class="url">/cards/</span>
        </div>
        <p><strong>Create Card</strong></p>
        <p class="section-title">Request Body:</p>
        <pre>{
  "username": "khasanrashidov",
  "card_name": "My Salary Card",
  "card_number": "8600123412341234",
  "balance": 1000000,
  "currency": "UZS",
  "card_type": "Uzcard",
  "expiration_date": "12/28"
}</pre>
        <p class="section-title">Response (201 Created):</p>
        <pre>{
  "message": "Card created successfully",
  "card": {
    "id": "uuid-string",
    "user_id": "uuid-string",
    "card_name": "My Salary Card",
    "card_number": "8600123412341234",
    "balance": 1000000,
    "currency": "UZS",
    "card_type": "Uzcard",
    "expiration_date": "12/28"
  }
}</pre>
    </div>

    <div class="endpoint">
        <div class="header">
            <span class="method get">GET</span>
            <span class="url">/cards/?username=&lt;username&gt;</span>
        </div>
        <p><strong>Get User Cards</strong></p>
        <p class="section-title">Response (200 OK):</p>
        <pre>{
  "cards": [
    {
      "id": "uuid-string",
      "card_name": "My Card",
      "card_number": "8600****1234",
      "balance": 1000000,
      "currency": "UZS",
      "card_type": "Uzcard"
    }
  ]
}</pre>
    </div>

    <h2>Transactions</h2>

    <div class="endpoint">
        <div class="header">
            <span class="method post">POST</span>
            <span class="url">/transactions/import</span>
        </div>
        <p><strong>Import Mock Transactions</strong></p>
        <p class="section-title">Request Body:</p>
        <pre>{
  "username": "khasanrashidov"
}</pre>
        <p class="section-title">Response (200 OK):</p>
        <pre>{
  "is_success": true,
  "message": "Successfully loaded 10 mock transactions",
  "data": [ /* array of transaction objects */ ]
}</pre>
    </div>

    <div class="endpoint">
        <div class="header">
            <span class="method get">GET</span>
            <span class="url">/transactions/?username=&lt;username&gt;</span>
        </div>
        <p><strong>Get User Transactions</strong></p>
        <p class="section-title">Response (200 OK):</p>
        <pre>{
  "is_success": true,
  "message": "Transactions retrieved successfully",
  "data": [
    {
      "id": "uuid-string",
      "amount": 150000,
      "merchant": "Korzinka",
      "category": "Shopping",
      "date": "2025-11-20T12:00:00",
      "card_type": "Uzcard"
    }
  ]
}</pre>
    </div>

    <div class="endpoint">
        <div class="header">
            <span class="method post">POST</span>
            <span class="url">/transactions/</span>
        </div>
        <p><strong>Create Transaction</strong></p>
        <p class="section-title">Request Body:</p>
        <pre>{
  "user_id": "uuid-string",
  "external_id": "ext-123",
  "transaction_type": "P2M_PAYMENT",
  "transaction_status": "APPROVED",
  "transaction_direction": "OUTGOING",
  "amount": 50000,
  "currency": "UZS",
  "fee": 0,
  "description": "Groceries",
  "processed_at": "2025-11-22T12:00:00",
  "card": {
    "card_id": "uuid-string",
    "masked": "8600 12** **** 1234",
    "brand": "Uzcard"
  },
  "sender": {
    "type": "CARD",
    "card_id": "uuid-string",
    "name": "Khasan Rashidov"
  },
  "receiver": {
    "type": "MERCHANT",
    "merchant_name": "Korzinka",
    "merchant_id": "mer_123"
  },
  "merchant_name": "Korzinka",
  "gateway": "payme"
}</pre>
        <p class="section-title">Response (201 Created):</p>
        <pre>{
  "is_success": true,
  "message": "Transaction created successfully",
  "data": { /* transaction object */ }
}</pre>
    </div>

    <h2>Dashboard</h2>

    <div class="endpoint">
        <div class="header">
            <span class="method get">GET</span>
            <span class="url">/dashboard/?username=&lt;username&gt;</span>
        </div>
        <p><strong>Get Dashboard Data</strong></p>
        <p class="section-title">Response (200 OK):</p>
        <pre>{
  "is_success": true,
  "message": "Dashboard data retrieved successfully",
  "data": {
    "summary": {
      "total_income": 3000000,
      "total_spending": 1200000,
      "savings_potential": 1800000
    },
    "category_distribution": {
      "Food": 200000,
      "Transport": 150000,
      "Shopping": 500000
    },
    "insights": [
      "You're spending 40% of income on food",
      "Great job saving this month!"
    ],
    "alerts": [
      "Shopping expenses are 20% higher than last month"
    ],
    "health_score": {
      "score": 85,
      "status": "Doing Great",
      "color": "Green"
    }
  }
}</pre>
    </div>

    <h2>Goals</h2>

    <div class="endpoint">
        <div class="header">
            <span class="method post">POST</span>
            <span class="url">/goals/</span>
        </div>
        <p><strong>Create Goal</strong></p>
        <p class="section-title">Request Body:</p>
        <pre>{
  "user_id": "uuid-string",
  "name": "New Laptop",
  "target_amount": 10000000,
  "current_amount": 0,
  "currency": "UZS",
  "target_date": "2025-12-31T00:00:00",
  "status": "ACTIVE",
  "priority": "MEDIUM",
  "description": "Saving for MacBook Pro"
}</pre>
        <p class="section-title">Response (201 Created):</p>
        <pre>{
  "is_success": true,
  "message": "Goal created successfully.",
  "data": {
    "id": "uuid-string",
    "user_id": "uuid-string",
    "name": "New Laptop",
    "target_amount": 10000000,
    "current_amount": 0,
    "currency": "UZS",
    "target_date": "2025-12-31T00:00:00",
    "status": "ACTIVE",
    "priority": "MEDIUM",
    "description": "Saving for MacBook Pro",
    "created_at": "2025-12-05T18:00:00"
  }
}</pre>
    </div>

    <div class="endpoint">
        <div class="header">
            <span class="method get">GET</span>
            <span class="url">/goals/?username=&lt;username&gt;</span>
        </div>
        <p><strong>Get User Goals</strong></p>
        <p class="section-title">Response (200 OK):</p>
        <pre>{
  "is_success": true,
  "message": "Goals retrieved successfully",
  "data": [
    {
      "id": "uuid-string",
      "name": "New Laptop",
      "target_amount": 10000000,
      "current_amount": 2000000,
      "progress_percentage": 20.0,
      "estimated_months": 5.5
    }
  ]
}</pre>
    </div>

    <h2>Recommendations</h2>

    <div class="endpoint">
        <div class="header">
            <span class="method get">GET</span>
            <span class="url">/recommendations/?username=&lt;username&gt;</span>
        </div>
        <p><strong>Get AI Recommendations</strong></p>
        <p class="section-title">Response (200 OK):</p>
        <pre>{
  "is_success": true,
  "message": "Recommendations generated successfully",
  "data": [
    "Consider reducing shopping expenses by 15%",
    "You could save an extra 500,000 UZS by cooking at home",
    "Set up automatic transfers to reach your laptop goal faster"
  ]
}</pre>
    </div>
</body>
</html>
"""


@docs_bp.route("/", methods=["GET"])
def get_docs():
    return render_template_string(HTML_TEMPLATE)
