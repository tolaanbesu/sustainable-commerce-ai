## AI-Powered Sustainable Commerce System
## Project Overview

This project implements AI-powered modules for sustainable commerce, focusing on automating catalog management, generating B2B proposals, and integrating AI business logic in a structured, production-ready way. The system demonstrates how AI can reduce manual work, improve budget allocation, and provide structured outputs for practical business use.

## Implemented Modules
Module 1: AI Auto-Category & Tag Generator
Functionality
* Auto-assigns primary category from a predefined list
* Suggests a sub-category
* Generates 5–10 SEO tags
* Suggests sustainability filters (plastic-free, compostable, vegan, recycled, etc.)
* Returns structured JSON and stores in database

Technical Highlights
* Validates categories, SEO tags, and sustainability filters
* Structured JSON output ensures seamless storage in Firestore
* Logging of AI prompts and responses

## Example JSON Output
{
  "primaryCategory": "Personal Care",
  "subCategory": "Oral Care",
  "seoTags": [
    "Bamboo Toothbrush",
    "Biodegradable Toothbrush",
    "Charcoal Bristles",
    "Eco-friendly Toothbrush",
    "Sustainable Toothbrush"
  ],
  "sustainabilityFilters": [
    "biodegradable",
    "plastic-free",
    "compostable"
  ]
}
Module 2: AI B2B Proposal Generator
Functionality
* Suggests sustainable product mix
* Allocates budget within provided limit
* Estimates cost breakdown
* Generates impact positioning summary
* Returns structured JSON output

Technical Highlights
* Validates budget and product mix
* Ensures AI response is JSON-parsed and safe for database storage
* Logs prompt and AI response

Example JSON Output
{
  "productMix": [
    {
      "productName": "Bamboo Toothbrush",
      "quantity": 500,
      "unitCost": 2,
      "totalCost": 1000
    },
    {
      "productName": "Biodegradable Dental Floss",
      "quantity": 200,
      "unitCost": 3,
      "totalCost": 600
    }
  ],
  "budgetUsed": 1600,
  "remainingBudget": 8400,
  "impactSummary": "This product mix reduces single-use plastics and promotes eco-friendly dental care."
}

## Outlined Modules
Module 3: AI Impact Reporting Generator
Purpose
* Automate impact reporting for orders.

Inputs
* Order details including products, quantities, sourcing info.

Process
* Fetch order/product info from DB
* Estimate plastic saved, carbon avoided, and local sourcing impact
* Generate human-readable impact statement

Outputs

Structured JSON with keys:

{
  "plasticSaved": 0,
  "carbonAvoided": 0,
  "localImpact": "",
  "impactSummary": ""
}

Module 4: AI WhatsApp Support Bot
Purpose
* Provide automated customer support via WhatsApp.

Inputs
* Customer messages (order status, returns, refund requests).

Process
* Parse customer intent
* Query database for relevant order data
* AI generates structured response or escalates to human if high priority
* Logs all conversations

Outputs

Structured JSON:

{
  "message": "",
  "action": "",
  "escalationRequired": false
}

Architecture Overview
+-------------------+       +-------------------+
|   Frontend        | <-->  |   Backend API     |
|(react.js/Postman) |       | (Node.js/Express) |
+-------------------+       +-------------------+
          |                          |
          v                          v
   +-------------------+    +-------------------+
   | AI Service Layer  |--> |  Data Layer       |
   | (Gemini AI SDK)   |    | Firestore / DB    |
   +-------------------+    +-------------------+
          |
          v
+----------------------------+
| Logging & Monitoring       |
| Prompt + Response Logs     |
+----------------------------+
## Frontend/UI

Postman is used for demo. Accepts user input (industry, budget, product info) and sends API requests.

## Backend API Layer

Handles request validation, business logic, and calls AI service layer.

## AI Service Layer

Encapsulates all interactions with Google Gemini AI and ensures structured JSON output.

## Data Layer

Stores categories, proposals, impact reports, and conversation logs.

## Logging & Monitoring

Captures all AI prompts/responses and validation errors.

## AI Prompt Design
Key Principles

* Structured Output: All AI responses must be strict JSON; no markdown or extra explanation.

* Predefined Categories & Filters: AI restricted to allowed categories, sub-categories, and sustainability filters.

* Prompt Engineering: Include clear instructions and input data (industry, budget, products).

* Error Handling: Backend validates AI output and logs any invalid responses.

Example Prompt for Module 2
Budget limit: 10000
Industry: Eco-friendly Personal Care

Return JSON in the following structure:
{
  "productMix": [
    { "productName": "", "quantity": 0, "unitCost": 0, "totalCost": 0 }
  ],
  "budgetUsed": 0,
  "remainingBudget": 0,
  "impactSummary": ""
}


## Running the Project
Install Dependencies
npm install
Set Environment Variables

Add GEMINI_API_KEY and Firestore credentials.

Start Server
npm start
Test Modules in Postman
Module 1
/api/catalog/auto-category

Example URL:

http://localhost:5000/api/catalog/auto-category
Module 2
/api/proposal/generate

Example URL:

http://localhost:5000/api/proposal/generate

Send JSON bodies with required inputs (industry, budget, or product info).

Notes

Fully implemented Module 1 and Module 2

Outlined Module 3 and Module 4

Structured JSON outputs, validation, and logging included