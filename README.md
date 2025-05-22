

# Todo Summary Assistant

## Setup Instructions

1. Clone the repository and navigate to the project folder.
2. Install dependencies by running `npm install` or `yarn install`.
3. Configure environment variables:

    Create a `.env` file in the root directory.
    Add your Slack webhook URL and LLM API credentials.
4. Start the development server with `npm start` or `yarn start`.
5. Open the app in your browser at `http://localhost:3000`.

## Slack and LLM Setup Guidance

Slack Incoming Webhook:

   Create a new Slack app in your workspace.
   Enable Incoming Webhooks and create a webhook URL linked to your target channel.
   Copy this webhook URL and set it in your `.env` file as `REACT_APP_SLACK_WEBHOOK_URL`.
   This webhook allows the app to post todo summaries directly to your Slack channel without manual intervention.

Language Model (LLM) API:

   Obtain an API key from your preferred LLM provider (e.g., OpenAI).
   Configure the API endpoint and key in your environment variables (`REACT_APP_LLM_API_KEY` and `REACT_APP_LLM_API_URL`).
   The app sends the list of todos to this LLM API, which generates a human-readable summary.
   This summary is then sent to Slack via the webhook.

## Design and Architecture Decisions

Frontend Framework: React functional components with hooks were chosen for simplicity, reusability, and clear state management.
Component Structure:

  `TodoForm` manages new todo input.
   `TodoList` displays todos, supports editing and deletion with inline editing.
   `SummaryButton` triggers the summary generation and posting process.
API Layer: All backend calls (CRUD and summary) are abstracted into `api.js`, providing a clean separation between UI and data logic.
Editing Feature: Inline editing enhances UX by allowing quick task updates without navigating to different views.
Slack Integration: Using Incoming Webhooks simplifies Slack communication with no complex OAuth needed.
LLM Summarization: Outsourcing the summary generation to an LLM API makes the system intelligent without building complex summarization logic in-house.
User Experience:

   Loading states prevent duplicate operations.
   Success and error messages guide the user.
   Responsive and accessible UI styling ensures usability across devices.


