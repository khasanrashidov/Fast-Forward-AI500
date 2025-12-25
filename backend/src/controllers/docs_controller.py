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
        
        /* Accordion Styles */
        details {
            margin-bottom: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            overflow: hidden;
        }
        summary {
            background-color: #f7f7f7;
            padding: 15px;
            cursor: pointer;
            font-weight: bold;
            font-size: 1.2em;
            list-style: none; /* Hide default arrow */
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        summary::-webkit-details-marker {
            display: none;
        }
        summary::after {
            content: '+'; 
            font-size: 1.5em;
            font-weight: normal;
        }
        details[open] summary::after {
            content: '-';
        }
        details[open] summary {
            border-bottom: 1px solid #ddd;
        }
        
        .content {
            padding: 20px;
        }

        .endpoint {
            margin-bottom: 40px;
            border-bottom: 1px solid #eee;
            padding-bottom: 20px;
        }
        .endpoint:last-child {
            border-bottom: none;
        }

        .header {
            margin-bottom: 15px;
            display: flex;
            align-items: center;
        }
        .method {
            font-weight: bold;
            background: #eee;
            padding: 4px 8px;
            border-radius: 4px;
            margin-right: 15px;
            min-width: 60px;
            text-align: center;
        }
        .method.get { background: #61affe; color: white; }
        .method.post { background: #49cc90; color: white; }
        .method.put { background: #fca130; color: white; }
        .url { font-family: monospace; font-size: 1.1em; color: #555; }
        
        pre {
            background: #f5f5f5;
            padding: 15px;
            overflow-x: auto;
            border-radius: 4px;
            border: 1px solid #eee;
        }
        code { font-family: monospace; }
        .section-title {
            font-weight: bold;
            margin-top: 15px;
            margin-bottom: 5px;
            font-size: 0.95em;
            color: #666;
            text-transform: uppercase;
        }
        .desc {
            font-size: 1.1em;
            margin-bottom: 10px;
            color: #222;
        }
    </style>
</head>
<body>
    <h1>API Documentation</h1>
    <p>Base URL: <code>/api</code></p>
    <p><strong>Test username:</strong> <code>khasanrashidov</code></p>

    <!-- EXTERNAL AI CHAT -->
    <details open>
        <summary>External AI Chat (Moliyachi)</summary>
        <div class="content">
            <div class="endpoint">
                <div class="header">
                    <span class="method post">POST</span>
                    <span class="url">https://moliyachi-landing.vercel.app/api/chat</span>
                </div>
                <div class="desc"><strong>Project Knowledge Base Chat</strong></div>
                <p>Chat with our project knowledge base docs.</p>
                <p class="section-title">Request Body:</p>
                <pre>{
  "message": "User question here",
  "history": [
    {"role": "user", "content": "hi"},
    {"role": "assistant", "content": "hello"}
  ],
  "language": "en" // Options: "en", "ru", "uz"
}</pre>
                <p class="section-title">Example Usage (JS):</p>
                <pre>const response = await fetch('https://moliyachi-landing.vercel.app/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: text,
    history: messages,
    language: "en",
  }),
});</pre>
            </div>
        </div>
    </details>

    <!-- USERS -->
    <details>
        <summary>Users (/api/users)</summary>
        <div class="content">
            <div class="endpoint">
                <div class="header">
                    <span class="method get">GET</span>
                    <span class="url">/api/users/</span>
                </div>
                <div class="desc"><strong>Get All Users</strong></div>
                <p>Retrieves a list of all users.</p>
                <p class="section-title">Response (200 OK):</p>
                <pre>{
  "is_success": true,
  "message": "Users retrieved successfully",
  "data": [
    {
      "id": "uuid-string",
      "username": "khasanrashidov",
      "email": "email@example.com",
      "phone_number": "+998901234567",
      "first_name": "Khasan",
      "last_name": "Rashidov",
      "salary": 3000000,
      "currency": "UZS",
      "age": 25,
      "family_size": 2,
      "role": "CLIENT",
      "cards": [
        {
          "id": "uuid",
          "card_name": "Salary Card",
          "card_number": "8600****1234",
          "balance": 1000000,
          "card_type": "Uzcard"
        }
      ],
      "is_active": true,
      "created_at": "2024-01-01T00:00:00"
    }
  ]
}</pre>
            </div>

            <div class="endpoint">
                <div class="header">
                    <span class="method get">GET</span>
                    <span class="url">/api/users/&lt;username&gt;</span>
                </div>
                <div class="desc"><strong>Get User by Username</strong></div>
                <p class="section-title">Response (200 OK):</p>
                <pre>{
  "is_success": true,
  "message": "User retrieved successfully",
  "data": {
    "id": "uuid-string",
    "username": "khasanrashidov",
    "email": "email@example.com",
    "phone_number": "+998901234567",
    "first_name": "Khasan",
    "last_name": "Rashidov",
    "salary": 3000000,
    "currency": "UZS",
    "age": 25,
    "family_size": 2,
    "bio": "Developer",
    "location": "Tashkent",
    "role": "CLIENT",
    "cards": [
        {
          "id": "uuid",
          "card_name": "Salary Card",
          "card_number": "8600****1234",
          "balance": 1000000,
          "card_type": "Uzcard"
        }
    ],
    "is_active": true,
    "created_at": "2024-01-01T00:00:00",
    "updated_at": "2025-01-01T00:00:00"
  }
}</pre>
            </div>

            <div class="endpoint">
                <div class="header">
                    <span class="method put">PUT</span>
                    <span class="url">/api/users/&lt;username&gt;</span>
                </div>
                <div class="desc"><strong>Update User Profile</strong></div>
                <p class="section-title">Request Body:</p>
                <pre>{
  "salary": 3500000,
  "age": 26,
  "family_size": 3,
  "first_name": "KhasanUpdated",
  "last_name": "Rashidov",
  "bio": "Senior Developer",
  "location": "Samarkand"
}</pre>
                <p class="section-title">Response (200 OK):</p>
                <pre>{
  "is_success": true,
  "message": "User updated successfully",
  "data": {
    "id": "uuid-string",
    "username": "khasanrashidov",
    "email": "email@example.com",
    "phone_number": "+998901234567",
    "first_name": "KhasanUpdated",
    "last_name": "Rashidov",
    "salary": 3500000,
    "currency": "UZS",
    "age": 26,
    "family_size": 3,
    "bio": "Senior Developer",
    "location": "Samarkand",
    "role": "CLIENT",
    "cards": [],
    "is_active": true,
    "created_at": "2024-01-01T00:00:00",
    "updated_at": "2025-12-06T12:00:00"
  }
}</pre>
            </div>
        </div>
    </details>

    <!-- CARDS -->
    <details>
        <summary>Cards (/api/cards)</summary>
        <div class="content">
            <div class="endpoint">
                <div class="header">
                    <span class="method post">POST</span>
                    <span class="url">/api/cards/</span>
                </div>
                <div class="desc"><strong>Create Card</strong></div>
                <p class="section-title">Request Body:</p>
                <pre>{
  "username": "khasanrashidov",
  "card_name": "Salary Card",
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
    "id": "uuid",
    "user_id": "user-uuid",
    "card_name": "Salary Card",
    "card_number": "8600123412341234",
    "balance": 1000000,
    "currency": "UZS",
    "card_type": "Uzcard",
    "expiration_date": "12/28",
    "is_removed": false,
    "created_at": "2024-01-01T00:00:00",
    "updated_at": "2024-01-01T00:00:00"
  }
}</pre>
            </div>

            <div class="endpoint">
                <div class="header">
                    <span class="method get">GET</span>
                    <span class="url">/api/cards/?username=&lt;username&gt;</span>
                </div>
                <div class="desc"><strong>Get User Cards</strong></div>
                <p class="section-title">Response (200 OK):</p>
                <pre>{
  "cards": [
    {
      "id": "uuid",
      "user_id": "user-uuid",
      "card_name": "Salary Card",
      "card_number": "8600123412341234",
      "balance": 1000000,
      "currency": "UZS",
      "card_type": "Uzcard",
      "expiration_date": "12/28",
      "is_removed": false,
      "created_at": "2024-01-01T00:00:00",
      "updated_at": "2024-01-01T00:00:00"
    }
  ]
}</pre>
            </div>

            <div class="endpoint">
                <div class="header">
                    <span class="method get">GET</span>
                    <span class="url">/api/cards/&lt;card_id&gt;</span>
                </div>
                <div class="desc"><strong>Get Card by ID</strong></div>
                <p class="section-title">Response (200 OK):</p>
                <pre>{
  "card": {
    "id": "uuid",
    "user_id": "user-uuid",
    "card_name": "Salary Card",
    "card_number": "8600123412341234",
    "balance": 1000000,
    "currency": "UZS",
    "card_type": "Uzcard",
    "expiration_date": "12/28",
    "is_removed": false,
    "created_at": "2024-01-01T00:00:00",
    "updated_at": "2024-01-01T00:00:00"
  }
}</pre>
            </div>
        </div>
    </details>

    <!-- TRANSACTIONS -->
    <details>
        <summary>Transactions (/api/transactions)</summary>
        <div class="content">
            <div class="endpoint">
                <div class="header">
                    <span class="method get">GET</span>
                    <span class="url">/api/transactions/?username=&lt;username&gt;</span>
                </div>
                <div class="desc"><strong>Get User Transactions</strong></div>
                <p class="section-title">Response (200 OK):</p>
                <pre>{
  "is_success": true,
  "message": "Transactions retrieved successfully.",
  "data": [
    {
      "id": "uuid",
      "user_id": "user-uuid",
      "amount": 50000,
      "currency": "UZS",
      "merchant": "Korzinka",
      "date": "2023-11-01T10:00:00",
      "category": "Food",
      "card_id": "card-uuid",
      "status": "SUCCESS",
      "external_id": "ext-123",
      "transaction_type": "P2M_PAYMENT",
      "transaction_direction": "OUTGOING",
      "fee": 0,
      "processed_at": "2023-11-01T10:00:05",
      "sender_info": { "type": "CARD", "name": "Khasan" },
      "receiver_info": { "type": "MERCHANT", "merchant_name": "Korzinka" },
      "metadata": {},
      "gateway": "HUMO",
      "rrn": "123456789",
      "description": "Groceries",
      "is_recurring": false,
      "created_at": "2023-11-01T10:00:00"
    }
  ]
}</pre>
            </div>

            <div class="endpoint">
                <div class="header">
                    <span class="method post">POST</span>
                    <span class="url">/api/transactions/</span>
                </div>
                <div class="desc"><strong>Create Transaction</strong></div>
                <p class="section-title">Request Body (Detailed):</p>
                <pre>{
  "user_id": "uuid",
  "amount": 50000,
  "currency": "UZS",
  "transaction_type": "P2M_PAYMENT",
  "transaction_status": "SUCCESS",
  "transaction_direction": "OUTGOING",
  "description": "Groceries",
  "date": "2023-10-27T10:00:00",
  "card": {
    "card_id": "uuid",
    "masked": "8600****1234",
    "brand": "Uzcard"
  },
  "sender": { "type": "CARD", "name": "Khasan" },
  "receiver": { "type": "MERCHANT", "merchant_name": "Korzinka" },
  "external_id": "ext-123",
  "fee": 0,
  "gateway": "HUMO",
  "rrn": "123456789",
  "metadata": {}
}</pre>
                <p class="section-title">Response (200 OK):</p>
                <pre>{
  "is_success": true,
  "message": "Transaction created successfully.",
  "data": {
    "id": "uuid",
    "user_id": "user-uuid",
    "amount": 50000,
    "currency": "UZS",
    "merchant": "Korzinka",
    "date": "2023-10-27T10:00:00",
    "category": "Food",
    "card_id": "card-uuid",
    "status": "SUCCESS",
    "external_id": "ext-123",
    "transaction_type": "P2M_PAYMENT",
    "transaction_direction": "OUTGOING",
    "fee": 0,
    "processed_at": null,
    "sender_info": { "type": "CARD", "name": "Khasan" },
    "receiver_info": { "type": "MERCHANT", "merchant_name": "Korzinka" },
    "metadata": {},
    "gateway": "HUMO",
    "rrn": "123456789",
    "description": "Groceries",
    "is_recurring": false,
    "created_at": "2023-10-27T10:00:00"
  }
}</pre>
            </div>
        </div>
    </details>

    <!-- DASHBOARD -->
    <details>
        <summary>Dashboard (/api/dashboard)</summary>
        <div class="content">
            <div class="endpoint">
                <div class="header">
                    <span class="method get">GET</span>
                    <span class="url">/api/dashboard/?username=&lt;username&gt;</span>
                </div>
                <div class="desc"><strong>Get Dashboard Data</strong> (Fast, no LLM)</div>
                <p>Returns summary, category distribution, alerts, and health score. For AI-generated insights, use the separate <code>/insights</code> endpoint.</p>
                <p class="section-title">Query Parameters:</p>
                <pre>username (string) - required</pre>
                <p class="section-title">Response (200 OK):</p>
                <pre>{
  "is_success": true,
  "message": "Dashboard data retrieved successfully.",
  "data": {
    "summary": {
        "total_income": 3000000,
        "total_spending": 500000,
        "savings_potential": 2500000,
        "previous_month_spending": 400000,
        "spending_change_percent": 25.0
    },
    "category_distribution": { "Food": 200000, "Transport": 50000 },
    "previous_month_categories": { "Food": 150000 },
    "alerts": ["High shopping expenses detected"],
    "health_score": { "score": 85, "status": "Doing Great", "color": "Green" }
  }
}</pre>
            </div>

            <div class="endpoint">
                <div class="header">
                    <span class="method get">GET</span>
                    <span class="url">/api/dashboard/insights?username=&lt;username&gt;</span>
                </div>
                <div class="desc"><strong>Get Dashboard Insights</strong> (LLM-based, may take a few seconds)</div>
                <p>Returns AI-generated financial insights based on spending patterns. Supports multiple languages.</p>
                <p class="section-title">Query Parameters:</p>
                <pre>username (string) - required
language (string) - optional: "en", "uz", "ru" (default: "en")</pre>
                <p class="section-title">Headers:</p>
                <pre>Accept-Language (optional): Language preference (e.g., "uz", "ru", "en")</pre>
                <p class="section-title">Response (200 OK):</p>
                <pre>{
  "is_success": true,
  "message": "Dashboard insights generated successfully.",
  "data": {
    "insights": [
      "Spending on Food increased by 33% compared to last month.",
      "Your savings rate is healthy at 83%.",
      "Consider reviewing entertainment expenses."
    ]
  }
}</pre>
            </div>

            <div class="endpoint">
                <div class="header">
                    <span class="method get">GET</span>
                    <span class="url">/api/dashboard/goal-insights/&lt;goal_id&gt;</span>
                </div>
                <div class="desc"><strong>Get Goal Insights</strong> (LLM-based, may take a few seconds)</div>
                <p>Returns AI-generated insights for a specific goal. Supports multiple languages.</p>
                <p class="section-title">Query Parameters:</p>
                <pre>language (string) - optional: "en", "uz", "ru" (default: "en")</pre>
                <p class="section-title">Headers:</p>
                <pre>Accept-Language (optional): Language preference (e.g., "uz", "ru", "en")</pre>
                <p class="section-title">Response (200 OK):</p>
                <pre>{
  "is_success": true,
  "message": "Goal insights generated successfully.",
  "data": {
    "insights": [
      "You need to save 20% more to reach your goal on time.",
      "Consider reducing dining out expenses."
    ]
  }
}</pre>
            </div>
        </div>
    </details>

    <!-- GOALS -->
    <details>
        <summary>Goals (/api/goals)</summary>
        <div class="content">
            <div class="endpoint">
                <div class="header">
                    <span class="method post">POST</span>
                    <span class="url">/api/goals/</span>
                </div>
                <div class="desc"><strong>Create Goal</strong></div>
                <p class="section-title">Request Body:</p>
                <pre>{
  "user_id": "uuid",
  "name": "New Laptop",
  "target_amount": 10000000,
  "current_amount": 0,
  "currency": "UZS",
  "target_date": "2025-12-31T00:00:00",
  "status": "ACTIVE",
  "priority": "HIGH",
  "description": "For work"
}</pre>
                <p class="section-title">Response (200 OK):</p>
                <pre>{
  "is_success": true,
  "message": "Goal created successfully.",
  "data": {
    "id": "uuid",
    "user_id": "user-uuid",
    "name": "New Laptop",
    "target_amount": 10000000,
    "current_amount": 0,
    "currency": "UZS",
    "target_date": "2025-12-31T00:00:00",
    "status": "ACTIVE",
    "priority": "HIGH",
    "description": "For work",
    "created_at": "2023-11-01T10:00:00"
  }
}</pre>
            </div>

            <div class="endpoint">
                <div class="header">
                    <span class="method get">GET</span>
                    <span class="url">/api/goals/?username=&lt;username&gt;</span>
                </div>
                <div class="desc"><strong>Get User Goals</strong></div>
                <p class="section-title">Response (200 OK):</p>
                <pre>{
  "is_success": true,
  "message": "Goals retrieved successfully.",
  "data": [
    {
      "id": "uuid",
      "user_id": "user-uuid",
      "name": "New Laptop",
      "target_amount": 10000000,
      "current_amount": 1000000,
      "currency": "UZS",
      "target_date": "2025-12-31T00:00:00",
      "status": "ACTIVE",
      "priority": "HIGH",
      "description": "For work",
      "created_at": "2023-11-01T10:00:00",
      "progress_percentage": 10.0,
      "estimated_months": 5.5
    }
  ]
}</pre>
            </div>

            <div class="endpoint">
                <div class="header">
                    <span class="method put">PUT</span>
                    <span class="url">/api/goals/</span>
                </div>
                <div class="desc"><strong>Update Goal</strong></div>
                 <p class="section-title">Request Body:</p>
                 <pre>{
  "goal_id": "uuid",
  "user_id": "user-uuid",
  "name": "New Laptop Pro",
  "target_amount": 15000000,
  "current_amount": 1000000,
  "currency": "UZS",
  "target_date": "2025-12-31T00:00:00",
  "status": "ACTIVE",
  "priority": "MEDIUM",
  "description": "For work"
}</pre>
                <p class="section-title">Response (200 OK):</p>
                <pre>{
  "is_success": true,
  "message": "Goal updated successfully.",
  "data": {
    "id": "uuid",
    "user_id": "user-uuid",
    "name": "New Laptop Pro",
    "target_amount": 15000000,
    "current_amount": 1000000,
    "currency": "UZS",
    "target_date": "2025-12-31T00:00:00",
    "status": "ACTIVE",
    "priority": "MEDIUM",
    "description": "For work",
    "created_at": "2023-11-01T10:00:00"
  }
}</pre>
            </div>
            
            <div class="endpoint">
                <div class="header">
                    <span class="method get">GET</span>
                    <span class="url">/api/goals/&lt;goal_id&gt;?username=&lt;username&gt;</span>
                </div>
                <div class="desc"><strong>Get Goal By ID</strong></div>
                <p class="section-title">Query Parameters:</p>
                <pre>username (string) - required</pre>
                <p class="section-title">Response (200 OK):</p>
                <pre>{
  "is_success": true,
  "message": "Goal retrieved successfully.",
  "data": {
    "id": "uuid",
    "user_id": "user-uuid",
    "name": "New Laptop",
    "target_amount": 10000000,
    "current_amount": 1000000,
    "currency": "UZS",
    "target_date": "2025-12-31T00:00:00",
    "status": "ACTIVE",
    "priority": "HIGH",
    "description": "For work",
    "created_at": "2023-11-01T10:00:00"
  }
}</pre>
            </div>

            <div class="endpoint">
                <div class="header">
                    <span class="method get">GET</span>
                    <span class="url">/api/goals/&lt;goal_id&gt;/timeline?username=&lt;username&gt;</span>
                </div>
                <div class="desc"><strong>Predict Goal Timeline</strong> (Fast, no LLM)</div>
                <p>Uses Monte Carlo simulation to predict when a goal will be reached. For AI interpretation, use the separate <code>/timeline/interpretation</code> endpoint.</p>
                <p class="section-title">Query Parameters:</p>
                <pre>username (string) - required</pre>
                <p class="section-title">Response (200 OK):</p>
                <pre>{
  "is_success": true,
  "message": "Goal timeline prediction completed.",
  "data": {
    "deterministic_months": 4.5,
    "monte_carlo": {
      "p10": 3.8,
      "p50": 4.5,
      "p90": 5.2
    },
    "success_probability": 95.0,
    "real_monthly_contribution": 2000000,
    "timeline_data": [
      {
        "month": 0,
        "deterministic": 1000000,
        "p10_optimistic": 1000000,
        "p50_median": 1000000,
        "p90_pessimistic": 1000000
      },
      {
        "month": 1,
        "deterministic": 3000000,
        "p10_optimistic": 3300000,
        "p50_median": 3000000,
        "p90_pessimistic": 2700000
      }
    ]
  }
}</pre>
            </div>

            <div class="endpoint">
                <div class="header">
                    <span class="method get">GET</span>
                    <span class="url">/api/goals/&lt;goal_id&gt;/timeline/interpretation?username=&lt;username&gt;</span>
                </div>
                <div class="desc"><strong>Get Timeline Interpretation</strong> (LLM-based, may take a few seconds)</div>
                <p>Returns AI-generated interpretation of the Monte Carlo simulation results. Supports multiple languages.</p>
                <p class="section-title">Query Parameters:</p>
                <pre>username (string) - required
language (string) - optional: "en", "uz", "ru" (default: "en")</pre>
                <p class="section-title">Headers:</p>
                <pre>Accept-Language (optional): Language preference (e.g., "uz", "ru", "en")</pre>
                <p class="section-title">Response (200 OK):</p>
                <pre>{
  "is_success": true,
  "message": "Goal timeline interpretation generated.",
  "data": {
    "interpretation": "Based on your current savings rate of 2,000,000 UZS/month, you're on track to reach your goal in approximately 4-5 months. The Monte Carlo simulation shows a 95% probability of success by your target date."
  }
}</pre>
            </div>

            <div class="endpoint">
                <div class="header">
                    <span class="method get">GET</span>
                    <span class="url">/api/goals/&lt;goal_id&gt;/recommendations?username=&lt;username&gt;</span>
                </div>
                <div class="desc"><strong>Get Agrobank Product Recommendations</strong> (LLM-based, may take a few seconds)</div>
                <p>Returns 0-3 relevant Agrobank products to help achieve the goal faster. Supports multiple languages.</p>
                <p class="section-title">Query Parameters:</p>
                <pre>username (string) - required
language (string) - optional: "en", "uz", "ru" (default: "en")</pre>
                <p class="section-title">Headers:</p>
                <pre>Accept-Language (optional): Language preference (e.g., "uz", "ru", "en")</pre>
                <p class="section-title">Response (200 OK):</p>
                <pre>{
  "is_success": true,
  "message": "Product recommendations generated successfully.",
  "data": {
    "recommendations": [
      {
        "product_id": "deposit_stable",
        "product_name": "Agrobank Deposit 'Stable Income'",
        "category": "Deposits",
        "type": "savings",
        "description": "High-yield savings deposit",
        "reason": "Earn 18% annual interest to grow your savings faster",
        "link": "https://agrobank.uz/deposits"
      },
      {
        "product_id": "card_cashback",
        "product_name": "Agrobank Card 'Cashback'",
        "category": "Cards",
        "type": "debit",
        "description": "Cashback on all purchases",
        "reason": "Get 5% cashback on all purchases to reduce spending",
        "link": "https://agrobank.uz/cards"
      }
    ]
  }
}</pre>
            </div>
        </div>
    </details>

    <!-- SHOP AGENT -->
    <details>
        <summary>Shop Agent (/api/shop)</summary>
        <div class="content">
            <div class="endpoint">
                <div class="header">
                    <span class="method post">POST</span>
                    <span class="url">/api/shop/search</span>
                </div>
                <div class="desc"><strong>AI Product Search</strong></div>
                <p>Search products using natural language. Returns relevant items, AI insights, and installment plans.</p>
                <p class="section-title">Query Parameters:</p>
                <pre>language (string) - optional: "en", "uz", "ru" (default: "en")</pre>
                <p class="section-title">Request Body:</p>
                <pre>{ "query": "I need to buy new galaxy s25 ultra" }</pre>
                <p class="section-title">Response (200 OK):</p>
                <pre>{
  "data": {
    "insight": "Great choice with the Galaxy S25 Ultra! The best way to make this purchase is with the Agrobank 'Open' card—enjoy 0% interest and no down payment, so you can get your new phone today without any upfront costs!",
    "products": [
      {
        "all_count": 79,
        "id": 358207,
          "image": "https://mini-io-api.texnomart.uz/catalog/product/3582/358207/208310/0ab7e8c3-fab8-41a5-a970-d3e4b4d1e893.webp",
          "sale_price": 26099000,
          "name": "Samsung Galaxy S25 Ultra 12/256GB Titanium Gray Smartfoni",
        "opencard_month_text": "12 months",
        "opencard_monthly_payment": 2174917,
        "opencard_total_price": 26099000,
        "product_url": "https://texnomart.uz/product/detail/358207"
      },
      {
        "all_count": 53,
        "id": 358175,
        "image": "https://mini-io-api.texnomart.uz/catalog/product/3581/358175/208210/baebb227-d7b2-4a8c-998f-f911d88abd4a.webp",
        "sale_price": 28065000,
        "name": "Samsung Galaxy S25 Ultra 12/512GB Titanium Gray",
        "opencard_month_text": "12 months",
        "opencard_monthly_payment": 2338750,
        "opencard_total_price": 28065000,
        "product_url": "https://texnomart.uz/product/detail/358175"
      },
      {
        "all_count": 5,
        "id": 358174,
        "image": "https://mini-io-api.texnomart.uz/catalog/product/3581/358174/208204/b2799e96-bce9-4c0e-9d45-264edaebc1f0.webp",
        "sale_price": 28065000,
        "name": "Samsung Galaxy S25 Ultra 12/512GB Titanium Black",
        "opencard_month_text": "12 months",
        "opencard_monthly_payment": 2338750,
        "opencard_total_price": 28065000,
        "product_url": "https://texnomart.uz/product/detail/358174"
      },
      {
        "all_count": 24,
        "id": 358178,
        "image": "https://mini-io-api.texnomart.uz/catalog/product/3581/358178/208183/061d94a4-0c47-4b6a-ad80-ce6710efc284.webp",
        "sale_price": 26099000,
        "name": "Samsung Galaxy S25 Ultra 12/256GB Titanium Blue",
        "opencard_month_text": "12 months",
        "opencard_monthly_payment": 2174917,
        "opencard_total_price": 26099000,
        "product_url": "https://texnomart.uz/product/detail/358178"
      },
      {
        "all_count": 111,
        "id": 358840,
        "image": "https://mini-io-api.texnomart.uz/catalog/product/3588/358840/211779/a5430217-0f8e-4cd8-89bd-59352352f508.webp",
        "sale_price": 28065000,
        "name": "Samsung Galaxy S25 Ultra 12/512GB Titanium Jetblack",
        "opencard_month_text": "12 months",
        "opencard_monthly_payment": 2338750,
        "opencard_total_price": 28065000,
        "product_url": "https://texnomart.uz/product/detail/358840"
      },
      {
        "all_count": 143,
        "id": 358841,
        "image": "https://mini-io-api.texnomart.uz/catalog/product/3588/358841/211786/09a3ba36-4eb5-437e-8e8d-5808a8ad40ee.webp",
        "sale_price": 26099000,
        "name": "Samsung Galaxy S25 Ultra 12/256GB Titanium Jetblack",
        "opencard_month_text": "12 months",
        "opencard_monthly_payment": 2174917,
        "opencard_total_price": 26099000,
        "product_url": "https://texnomart.uz/product/detail/358841"
      }
    ],
    "shown": 6,
    "total_found": 20,
    "translated_query": "смартфон galaxy s25 ultra",
    "user_query": "I need to buy new galaxy s25 ultra"
  },
  "status": "success"
}</pre>
            </div>
        </div>
    </details>

    <!-- BASE RESPONSE SCHEMA -->
    <details>
        <summary>Base Response Schema</summary>
        <div class="content">
            <div class="endpoint">
                 <div class="desc"><strong>Common Response Format</strong></div>
                 <p>All API responses follow this standard structure.</p>
                 <pre>{
  "is_success": true,   // Boolean indicating success/failure
  "message": "string",  // Status message
  "data": any,          // Response payload (object, array, or null)
  "errors": ["string"]  // List of error messages (if any)
}</pre>
            </div>
        </div>
    </details>

</body>
</html>
"""


@docs_bp.route("/", methods=["GET"])
def get_docs():
    return render_template_string(HTML_TEMPLATE)
