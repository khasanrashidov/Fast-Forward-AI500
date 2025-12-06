Goal: {goal_name}
Progress: {progress_percent}% ({current_amount}/{target_amount} {currency})
Remaining: {remaining_amount} {currency} in {months_remaining} months

Financial Status:
- Salary: {user_salary} {currency}/month
- Monthly Spending: {monthly_spending} {currency} ({spending_rate}% of income)
- Current Savings: {current_monthly_savings} {currency}/month
- Required Savings: {required_monthly_savings} {currency}/month
- Gap: {savings_gap} {currency} (positive = need more)

Top Spending: {top_category} ({top_category_amount} {currency})

Generate 3 insights (MAX 15 words each):
1. Savings & Budget - state current vs required, be realistic
2. Goal Optimization - ONE specific action (cut category, increase income, etc)
3. Spending Alert - ONLY if is_overspending={is_overspending} is true OR savings_gap > required_monthly_savings/2, otherwise null
