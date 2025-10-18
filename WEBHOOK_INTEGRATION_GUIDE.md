# StratAI Webhook Integration Guide

## Overview
All workflows expose webhook endpoints that can be integrated into your existing systems.

## Integration Points

### 1. Trigger Email After Report Generation
**Endpoint:** POST `/stratai-email-trigger`

Add this call at the end of your main workflow:
```javascript
// In Main Workflow - After "Save to Airtable" node
// Add HTTP Request node
{
  "method": "POST",
  "url": "https://your-n8n.com/webhook/stratai-email-trigger",
  "body": {
    "report_id": "{{ $json.report_id }}",
    "user_email": "{{ $json.user_email }}",
    "company_name": "{{ $json.company_name }}",
    "confidence_score": "{{ $json.confidence_score }}",
    "google_doc_url": "{{ $('Create Google Doc').item.json.documentUrl }}",
    "strategic_question": "{{ $json.strategic_question }}",
    "notification_type": "report_complete"
  }
}
```

### 2. Trigger Low Confidence Alert
**Endpoint:** POST `/stratai-confidence-check`

Add conditional check in Extract & Validate node:
```javascript
// After confidence calculation
if (finalScore < 60) {
  // Trigger low confidence alert
  fetch('https://your-n8n.com/webhook/stratai-confidence-check', {
    method: 'POST',
    body: JSON.stringify({
      report_id: reportId,
      confidence_score: finalScore,
      user_email: userEmail,
      company_name: companyName,
      strategic_question: question,
      limitations: limitations
    })
  });
}
```

### 3. Post to Slack
**Endpoint:** POST `/stratai-slack-notify`
```bash
curl -X POST https://your-n8n.com/webhook/stratai-slack-notify \
  -H "Content-Type: application/json" \
  -d '{
    "report_id": "RPT-123",
    "company_name": "Azure",
    "confidence_score": "85.5",
    "strategic_question": "Should we adopt AMD GPUs?",
    "google_doc_url": "https://docs.google.com/...",
    "slack_channel": "#strategy-team"
  }'
```

### 4. Export PDF
**Endpoint:** POST `/stratai-export-pdf`
```bash
curl -X POST https://your-n8n.com/webhook/stratai-export-pdf \
  -H "Content-Type: application/json" \
  -d '{
    "report_id": "RPT-123",
    "google_doc_id": "1abc...xyz",
    "user_email": "user@company.com"
  }'
```

## Workflow Orchestration

### Complete Integration Flow
```
Main Workflow
    ↓
Generate Report
    ↓
[Parallel Triggers]
    ├→ Email Notification (if enabled)
    ├→ Slack Post (if configured)
    ├→ Low Confidence Alert (if score < 60%)
    └→ PDF Export (if requested)
```

### Implementation Example

In your main workflow, add an HTTP Request node after "Respond to Webhook":
```json
{
  "nodes": [
    {
      "parameters": {
        "url": "https://your-n8n.com/webhook/stratai-email-trigger",
        "method": "POST",
        "bodyParameters": {
          "parameters": [
            {
              "name": "report_id",
              "value": "={{ $('Extract & Validate').item.json.report_id }}"
            },
            {
              "name": "user_email",
              "value": "={{ $('Extract Form Data').item.json.user_email }}"
            }
          ]
        }
      },
      "name": "Trigger Email Notification",
      "type": "n8n-nodes-base.httpRequest"
    }
  ]
}
```

## Error Handling

All webhooks return standard JSON responses:

**Success:**
```json
{
  "success": true,
  "action_taken": "email_sent|slack_posted|pdf_exported",
  "timestamp": "2025-01-18T..."
}
```

**Error:**
```json
{
  "success": false,
  "error": "Error message",
  "timestamp": "2025-01-18T..."
}
```

## Rate Limits

- Email notifications: 100/hour per user
- Slack posts: 50/hour
- PDF exports: 20/hour per user

## Testing

Use the test scripts in `/test-scripts/`:
```bash
# Test email notification
./test-scripts/test-email.sh

# Test slack integration
./test-scripts/test-slack.sh

# Test PDF export
./test-scripts/test-pdf.sh
```
