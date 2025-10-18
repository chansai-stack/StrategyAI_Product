# StratAI N8N Workflows Guide

## Included Workflows

### 1. Main Strategic Intelligence (`stratai-main-workflow.json`)
**Webhook:** POST `/stratai-submit`
**Purpose:** Core multi-agent analysis pipeline
**Features:**
- Form data extraction
- PDF processing (optional)
- 5 parallel specialized agents
- Final synthesis with HHH scoring
- Confidence score calculation
- Google Docs report generation
- Airtable storage

### 2. AI Chat Assistant (`stratai-chat-assistant.json`)
**Webhook:** POST `/stratai-chat`
**Purpose:** Interactive Q&A about generated reports
**Features:**
- Session-based chat
- Report context retrieval from Airtable
- Claude 3.5 Sonnet powered responses
- Follow-up question handling

### 3. Feedback Collection (`stratai-feedback.json`)
**Webhook:** POST `/stratai-feedback`
**Purpose:** Collect user feedback on reports
**Features:**
- Rating system (1-5 stars)
- Qualitative feedback text
- Usefulness tracking
- Recommendation likelihood

### 4. Admin Analytics (`stratai-admin-analytics.json`)
**Webhook:** GET `/stratai-analytics`
**Purpose:** Dashboard metrics for system monitoring
**Features:**
- Total reports generated
- Average confidence scores
- Feedback ratings
- Usage by company
- Recent report listing

## Setup Instructions

### Prerequisites
1. N8N instance (cloud or self-hosted)
2. API Keys:
   - OpenAI API (for GPT-4o)
   - Anthropic API (for Claude)
   - Google Cloud (for Docs/Drive)
   - Airtable API

### Airtable Schema

**Reports Table:**
- report_id (Single line text, Primary)
- timestamp (Date)
- user_email (Email)
- company_name (Single line text)
- job_function (Single line text)
- strategic_question (Long text)
- confidence_score (Number)
- ai_chip_rate (Number)
- crypto_rate (Number)
- ev_rate (Number)
- supply_risk (Number)
- regulatory (Number)
- consumer_rate (Number)
- session_id (Single line text)

**Feedback Table:**
- feedback_id (Single line text, Primary)
- report_id (Link to Reports)
- rating (Number, 1-5)
- feedback_text (Long text)
- useful (Checkbox)
- would_recommend (Checkbox)
- user_email (Email)
- timestamp (Date)

### Installation Steps

1. Import each workflow JSON into N8N
2. Configure credentials:
   - OpenAI API credential
   - Anthropic API credential
   - Google API OAuth2
   - Airtable Token API
3. Update Airtable base IDs in all workflows
4. Test each workflow individually
5. Enable all webhooks

### Testing

Use these curl commands to test:

**Main Analysis:**
```bash
curl -X POST https://your-n8n.com/webhook/stratai-submit \
  -H "Content-Type: application/json" \
  -d @test-data/azure-team-lead.json
```

**Chat:**
```bash
curl -X POST https://your-n8n.com/webhook/stratai-chat \
  -H "Content-Type: application/json" \
  -d '{
    "report_id": "RPT-xxx",
    "message": "Can you explain the confidence score?"
  }'
```

**Feedback:**
```bash
curl -X POST https://your-n8n.com/webhook/stratai-feedback \
  -H "Content-Type: application/json" \
  -d '{
    "report_id": "RPT-xxx",
    "rating": 5,
    "useful": true,
    "feedback_text": "Excellent analysis!"
  }'
```

**Analytics:**
```bash
curl https://your-n8n.com/webhook/stratai-analytics
```

## Workflow Connections
```
Main Workflow → Creates Reports in Airtable
                ↓
Chat Assistant → Reads from Airtable Reports
                ↓
Feedback → Links to Reports in Airtable
           ↓
Admin Analytics → Aggregates Reports + Feedback
```

## Monitoring & Maintenance

- Check N8N execution logs for errors
- Monitor Airtable storage limits
- Track API usage (OpenAI, Anthropic costs)
- Review confidence score distribution
- Analyze feedback for improvements

## Cost Estimates

Per report generation:
- OpenAI GPT-4o: ~$0.15-0.30 (6 agent calls)
- Google Docs API: Free (within limits)
- Airtable: Free (within row limits)
- Total: ~$0.15-0.30 per analysis

Chat interactions:
- Anthropic Claude: ~$0.03-0.08 per response
