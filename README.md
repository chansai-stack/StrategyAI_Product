# StratAI - Multi-Agent Strategic Intelligence Platform

**Real-time, confidence-scored strategic insights for hardware executives**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![N8N](https://img.shields.io/badge/Built%20with-N8N-orange)](https://n8n.io)

## 🎯 Problem

Hardware executives making million-dollar allocation decisions rely on fragmented intelligence:
- **70%** report analyst reports arrive after market shifts
- **68%** spend $250K-$1M annually on static, rear-view insights  
- **46%** struggle with data silos across teams

**Result:** 6+ weeks of analysis paralysis while competitors move in days.

## 💡 Solution

StratAI uses a **5-agent ensemble architecture** with HHH evaluation framework to deliver:
- **Real-time market synthesis** from live data sources
- **Confidence-scored recommendations** (explainable to C-suite)
- **Cross-validated insights** across market, risk, and competitive agents
- **Executive-ready reports** in Google Docs with AI chat assistant

## 🏗️ Architecture
```
User Input (Strategic Question + Context)
    ↓
[PDF Parser] → Extract company documents
    ↓
[5 Specialized Agents]
    ├── Market Data Analysis Agent
    ├── Market Intelligence Agent  
    ├── Strategic Analysis Agent
    ├── Risk Management Agent
    └── Competitive Analysis Agent
    ↓
[Final Synthesizer] → HHH Scoring + Confidence Calculation
    ↓
Outputs:
    ├── Executive Report (Google Docs)
    ├── Feedback System (Airtable)
    └── AI Chat Assistant (Claude)
```

### Agent Roles

| Agent | Focus | Weight |
|-------|-------|--------|
| Market Data | Quantitative signals, supply chain metrics | 25% |
| Market Intelligence | Competitive landscape, customer insights | 25% |
| Strategic Analysis | Long-term implications, scenario planning | 20% |
| Risk Management | Supply risk, geopolitical factors, dependencies | 15% |
| Competitive Analysis | Competitor strategies, market positioning | 15% |

## 🚀 Quick Start

### Prerequisites
- N8N instance (self-hosted or cloud)
- OpenAI API key or Anthropic API key
- Google Workspace account (for Docs integration)
- Airtable account (for feedback/analytics)

### Installation

1. **Import N8N Workflow**
```bash
# Download workflow
curl -O https://raw.githubusercontent.com/[your-username]/stratai/main/workflows/n8n-workflow-export.json

# Import into N8N
# Settings → Import from File → Select n8n-workflow-export.json
```

2. **Configure Credentials**
- OpenAI API key (for GPT-4)
- Google OAuth (for Docs/Drive)
- Airtable API key

3. **Update Agent Prompts**
- Copy prompts from `/prompts/` directory
- Paste into respective N8N agent nodes

4. **Deploy Code Nodes**
- Copy JavaScript from `/code-nodes/`
- Update N8N code nodes

### Usage

**Web Form Input:**
```
Strategic Question: "Should we allocate A3 GPUs to existing customers or new prospects?"
Market Intelligence: [Your context]
Strategic Context: [Your situation]
Risk Factors: [Your concerns]
```

**API Input:**
```bash
curl -X POST https://your-n8n.com/webhook/stratai \
  -H "Content-Type: application/json" \
  -d '{
    "strategic_question": "Your question",
    "market_intelligence": "Your context",
    "ai_chip_rate": 90,
    "supply_risk": 75
  }'
```

## 📊 Confidence Scoring

StratAI uses **HHH Framework** (Helpful, Harmless, Honest) to evaluate each agent:
```
Base Score = Σ(Agent_HHH × Weight)
Adjustments:
  +8%: Strong cross-agent agreement
   0%: Moderate agreement  
  -7%: Major conflicts or missing data
  
Final Confidence = Base + Adjustment
```

**Interpretation:**
- **High (>65%)**: Strong consensus, actionable
- **Moderate (40-65%)**: Some conflicts, validate
- **Low (<40%)**: Major gaps, more research needed

## 🎯 Use Cases

### 1. GPU Allocation Strategy
**Persona:** Azure Team Lead  
**Decision:** Custom rate-limiting vs uniform throttling  
**Confidence:** 68-74%

### 2. Semiconductor Supply Chain
**Persona:** Tesla Strategy Director  
**Decision:** Fab acquisition vs supplier diversification  
**Confidence:** 70-78%

### 3. Cloud Quota Management
**Persona:** Google Cloud Startup Lead  
**Decision:** Retention vs new logo acquisition  
**Confidence:** 66-73%

## 📈 Results

- **70-85%** confidence scores on strategic decisions
- **2-minute** report generation vs 6+ weeks manual analysis
- **$250K-$1M** potential savings replacing analyst subscriptions

## 🛠️ Tech Stack

- **Workflow:** N8N (agentic orchestration)
- **LLM:** GPT-4o, Claude 3.5 Sonnet
- **Storage:** Airtable (feedback), Google Drive (reports)
- **Frontend:** N8N Form Trigger (web interface)

## 📚 Documentation

- [Architecture Overview](docs/architecture.md)
- [Agent Prompts](docs/agent-prompts.md)
- [API Documentation](docs/api-documentation.md)
- [Deployment Guide](docs/deployment-guide.md)

## 🧪 Test Data

Sample scenarios in `/test-data/`:
- Azure GPU allocation (Team Lead)
- Google Cloud quota (Executive)
- NVIDIA engineering resources (Manager)
- Tesla semiconductor strategy (Director)

## 🤝 Contributing

Contributions welcome! Please read our contributing guidelines.

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📊 Roadmap

- [ ] **MVP** (2 months): Live dashboard, executive reports, AI chat
- [ ] **Post-MVP** (6 months): Enterprise forecasting, advanced exports
- [ ] **Launch** (8 months): Automated generation, pricing optimization
- [ ] **Growth** (7 months): Integrations, personalization, analytics

## 📄 License

MIT License - see [LICENSE](LICENSE) file

## 🙏 Acknowledgments

Built with insights from 50 hardware executive interviews validating:
- 73% miss opportunities due to delayed intelligence
- 68% overspend on static analyst reports
- Explainability, speed, and integration are critical buying factors

## 📧 Contact

- **Twitter:** [@your-handle]
- **Email:** your-email@domain.com
- **Website:** https://stratai.example.com

---

**Note:** This is an MVP built in 20 hours demonstrating multi-agent AI for strategic intelligence. Production deployment requires additional security, scalability, and compliance considerations.
```

### 2. .gitignore
```
# API Keys
.env
*.key
credentials/

# N8N specific
.n8n/
n8n-local.settings.json

# Node modules
node_modules/
npm-debug.log

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
logs/
*.log

# Temporary files
tmp/
temp/
*.tmp
```

### 3. LICENSE (MIT)
```
MIT License

Copyright (c) 2025 [Chandni Sharma]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

[Standard MIT license text...]

4. docs/architecture.md
Create detailed architecture documentation explaining:

Multi-agent ensemble design
HHH evaluation framework
Confidence score calculation
Data flow diagrams

5. Test Data Files
Create JSON files for each test scenario in /test-data/:
azure-team-lead.json:
json{
  "user_email": "test@azure.com",
  "company_name": "Microsoft Azure",
  "job_function": "Team Lead, Azure OpenAI",
  "strategic_question": "Should we build custom rate-limiting for top 10 customers or implement uniform throttling?",
  "market_intelligence": "I manage 85 Azure OpenAI accounts ($45M ARR)...",
  "user_ai_chip_rate": 88,
  "user_crypto_rate": 12,
  "user_ev_rate": 20,
  "user_supply_risk": 65,
  "user_regulatory": 55,
  "user_consumer_rate": 48
}
Next Steps to Create Repository

Initialize locally:

bashmkdir stratai
cd stratai
git init

Create structure:

bashmkdir -p docs workflows prompts code-nodes test-data examples pitch

Add files:


Create README.md with content above
Add all prompt files from our session
Add JavaScript code nodes
Export N8N workflow as JSON


Create GitHub repo:

bashgit add .
git commit -m "Initial commit: StratAI multi-agent platform"
git branch -M main
git remote add origin https://github.com/[your-username]/stratai.git
git push -u origin main
