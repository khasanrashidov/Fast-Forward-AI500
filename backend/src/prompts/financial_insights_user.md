User Profile:
- Salary: {salary} UZS/month
- Age: {age}
- Family size: {family_size}

Current Month Spending:
- Total spending: {total_spending} UZS
- Savings: {savings} UZS
- Savings rate: {savings_rate}%

Current Month Categories:
{spending_breakdown}

Previous Month Comparison:
- Previous month total: {previous_month_spending} UZS
- Overall change: {spending_change_percent}%
- Previous month categories:
{previous_month_breakdown}

Category-Level Changes (Month-over-Month):
{category_changes}

Anomaly Detection:
{anomaly_info}

Data Availability Check:
- Has previous month data: {previous_month_spending} > 0

Generate insights:
1. One category-based insight (analyze a specific category from current month data)
2. One trend-based insight:
   - If previous month data exists (previous_month_spending > 0): Compare current vs previous month
   - If NO previous month data (previous_month_spending = 0): Analyze current spending vs income ratio and suggest budgeting strategies
3. One anomaly alert (ONLY if has_anomaly is true: {has_anomaly})