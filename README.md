# QE Daily Learning

A lightweight, reusable Quality Engineering learning system that stores daily lessons in GitHub and publishes the Slack version to `#qe-daily` on working days.

## What this repository does

- Stores each QE Daily lesson as version-controlled JSON.
- Keeps Slack, LinkedIn, and suggested thread-answer variants together.
- Validates required fields and catches duplicate sequence numbers/titles.
- Uses GitHub Actions to publish the day's Slack post at **11:00 AM Asia/Karachi, Monday-Friday**.
- Requires no paid automation platform.

## Workflow

```text
Generate/review content
        ↓
Commit dated JSON file
        ↓
GitHub validation
        ↓
11:00 PKT Mon-Fri
        ↓
GitHub Action
        ↓
Slack incoming webhook
        ↓
#qe-daily
```

## One-time setup

### 1. Create a Slack incoming webhook
Create or configure a Slack app for the target workspace and add an incoming webhook for `#qe-daily`.

### 2. Add the webhook as a GitHub secret
In the repository:

`Settings → Secrets and variables → Actions → New repository secret`

Name it:

`SLACK_WEBHOOK_URL`

Paste the Slack incoming webhook URL as the value.

**Never commit the webhook URL to this repository.**

### 3. Add daily content
Copy `templates/qe-daily-template.json` to `content/YYYY-MM-DD.json` and fill in the fields.

### 4. Validate before pushing

```bash
npm run validate
```

### 5. Test manually
Open **Actions → Post QE Daily to Slack → Run workflow**.

If there is a content file for the current Pakistan date, it will publish it. If no matching file exists, the workflow exits safely without posting.

## Content model

Each daily file contains:

- `date`
- `number`
- `topic_area`
- `title`
- `slack_text`
- `thread_answer`
- `linkedin_text`
- `quality_checks`

## Suggested weekly curriculum

| Day | Theme |
|---|---|
| Monday | Risk-based testing & test design |
| Tuesday | API / backend / databases |
| Wednesday | Automation / Playwright / TypeScript |
| Thursday | Debugging / networking / observability |
| Friday | Quality strategy / AI-assisted QA |

## Cost model

The repository itself does not require Zapier, Make, or a paid automation service. GitHub Actions consumption for one short weekday job is very small; account/repository-specific GitHub usage limits still apply.

## Human approval model

- Slack publishing can be automated after content is reviewed and committed.
- LinkedIn copy is stored here but intentionally **not auto-posted**. Review it before external publication.
