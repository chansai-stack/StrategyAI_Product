# StratAI - Complete N8N Workflow Integration Guide

## All 14 Production Workflows

### Core System (Workflows 1-4)
1. **Main Strategic Intelligence** - Multi-agent analysis pipeline
2. **AI Chat Assistant** - Interactive Q&A about reports
3. **Feedback Collection** - User satisfaction tracking
4. **Admin Analytics** - Dashboard metrics

### Communication & Notifications (Workflows 5-8)
5. **Email Notifications** - Report completion, alerts
6. **Scheduled Weekly Reports** - Automated Monday digest
7. **Low Confidence Alerts** - Quality monitoring
8. **Slack Integration** - Team collaboration

### Advanced Features (Workflows 9-12)
9. **PDF Export** - Download reports as PDF
10. **Microsoft Teams** - Enterprise notifications
11. **Monthly Executive Summary** - Leadership reporting
12. **Competitor Monitoring** - Market intelligence alerts

### User Management (Workflows 13-14)
13. **User Onboarding** - Welcome sequence
14. **Usage Analytics** - Behavioral tracking

## Complete Airtable Schema

### Tables Required

**1. Reports**
```
- report_id (Primary, Single line text)
- timestamp (Date)
- user_email (Email)
- company_name (Single line text)
- job_function (Single line text)
- strategic_question (Long text)
- confidence_score (Number, 2 decimals)
- ai_chip_rate (Number)
- crypto_rate (Number)
- ev_rate (Number)
- supply_risk (Number)
- regulatory (Number)
- consumer_rate (Number)
- session_id (Single line text)
- google_doc_url (URL)
- executive_summary (Long text)
```

**2. Feedback**
```
- feedback_id (Primary, Single line text)
- report_id (Link to Reports)
- rating (Number, 1-5)
- feedback_text (Long text)
- useful (Checkbox)
- would_recommend (Checkbox)
- user_email (Email)
- timestamp (Date)
```

**3. Alerts**
```
- alert_id (Primary, Single line text)
- report_id (Link to Reports)
- alert_type (Single select: low_confidence, competitor, system)
- confidence_score (Number)
- user_email (Email)
- timestamp (Date)
- action_taken (Single line text)
```

**4. CompetitorAlerts**
```
- alert_id (Primary, Single line text)
- topic (Single line text)
- significance (Single select: High, Medium, Low)
- analysis (Long text)
- article_count (Number)
- articles (Long text, JSON)
- timestamp (Date)
- notified_users (Multiple collaborator)
```

**5. Users**
```
- user_email (Primary, Email)
- user_name (Single line text)
- company_name (Single line text)
- job_function (Single line text)
- signup_timestamp (Date)
- onboarding_stage (Single select: welcome, active, churned)
- reports_generated (Number)
- last_report_date (Date)
```

## API Credentials Setup

### Required API Keys

1. **OpenAI** (for GPT-4o)
   - Get from: https://platform.openai.com/api-keys
   - Used in: Main workflow, Monthly summary, Competitor monitoring
   - Cost: ~$0.15-0.30 per analysis

2. **Anthropic** (for Claude)
   - Get from: https://console.anthropic.com/
   - Used in: AI Chat Assistant
   - Cost: ~$0.03-0.08 per chat

3. **Google Cloud**
   - OAuth2 for Docs/Drive
   - Setup: https://console.cloud.google.com/
   - Enable APIs: Google Docs, Google Drive
   - Used in: Report generation, PDF export

4. **Airtable**
   - Token API
   - Get from: https://airtable.com/account
   - Used in: All data storage

5. **Gmail** (optional but recommended)
   - OAuth2
   - Same Google Cloud project
   - Used in: All email notifications

6. **Slack** (optional)
   - OAuth2
   - Create app: https://api.slack.com/apps
   - Scopes needed: chat:write, files:write
   - Used in: Slack notifications

7. **Microsoft Teams** (optional)
   - Incoming Webhook URL
   - Setup: Teams → Connectors → Incoming Webhook
   - Used in: Teams notifications

8. **News API** (for competitor monitoring)
   - Get from: https://newsapi.org/
   - Free tier: 100 requests/day
   - Used in: Competitor monitoring

## Deployment Checklist

### Phase 1: Core System (Week 1)
- [ ] Import workflows 1-4
- [ ] Setup Airtable base with all tables
- [ ] Configure OpenAI API key
- [ ] Configure Google Cloud OAuth
- [ ] Configure Airtable API
- [ ] Test main analysis workflow
- [ ] Test chat assistant
- [ ] Verify data flows to Airtable

### Phase 2: Notifications (Week 2)
- [ ] Import workflows 5-8
- [ ] Setup Gmail OAuth
- [ ] Setup Slack OAuth (if using)
- [ ] Test email notifications
- [ ] Test weekly digest (manually trigger)
- [ ] Test low confidence alerts
- [ ] Configure Slack channel

### Phase 3: Advanced Features (Week 3)
- [ ] Import workflows 9-12
- [ ] Setup Microsoft Teams webhook (if using)
- [ ] Setup News API key
- [ ] Test PDF export
- [ ] Test Teams notifications
- [ ] Configure competitor monitoring keywords
- [ ] Test monthly summary (manually trigger)

### Phase 4: User Management (Week 4)
- [ ] Import workflows 13-14
- [ ] Setup user onboarding trigger
- [ ] Test welcome email sequence
- [ ] Configure analytics dashboard
- [ ] Setup monitoring alerts

## Workflow Orchestration Map
User Submits Form
↓
Main Workflow (1)
├→ Generate Report
├→ Save to Airtable
├→ Create Google Doc
└→ Trigger Notifications
├→ Email Notification (5)
├→ Slack Post (8)
├→ Teams Post (10)
└→ Low Confidence Check (7)
└→ Send Alert if <60%
User Asks Question
↓
Chat Assistant (2)
├→ Fetch Report from Airtable
├→ Claude generates response
└→ Return to user
User Provides Feedback
↓
Feedback Collection (3)
├→ Save to Airtable
└→ Update metrics
Scheduled Tasks
├→ Every Monday 9am: Weekly Digest (6)
├→ Every 6 hours: Competitor Monitor (12)
└→ 1st of month: Executive Summary (11)
New User Signs Up
↓
Onboarding Sequence (13)
├→ Day 0: Welcome email
├→ Day 2: Check activity
└→ If no reports: Nudge email
