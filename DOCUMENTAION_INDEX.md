# 📚 Complete Documentation Index

## Quick Links

- **[Setup Guide](#setup-guide)** - Get started in 5 minutes
- **[API Documentation](#api-documentation)** - All endpoints and examples
- **[Database Schema](#database-schema)** - ER diagram and relationships
- **[Chat Workflow](#chat-workflow)** - How natural language queries work
- **[Deployment Guide](#deployment-guide)** - Production deployment steps
- **[Environment Variables](#environment-variables)** - Complete reference

---

## Setup Guide

**Location:** [`docs/SETUP.md`](./docs/SETUP.md)

**Contents:**
- Prerequisites (Node.js, Python, PostgreSQL)
- Local development setup
- Database configuration (Docker Compose or local)
- Environment variables for all services
- Running development servers
- Production deployment instructions
- Troubleshooting common issues

**Quick Start:**
```bash
# 1. Install dependencies
npm install

# 2. Start database
docker-compose up -d

# 3. Setup database
cd apps/api
npm run db:generate
npm run db:migrate
npm run db:seed

# 4. Start all services
npm run dev
```

---

## API Documentation

**Location:** [`docs/API_DOCUMENTATION.md`](./docs/API_DOCUMENTATION.md)

**Endpoints:**

### Dashboard Endpoints
- `GET /api/stats` - Dashboard statistics
- `GET /api/invoice-trends` - Monthly trends
- `GET /api/vendors/top10` - Top 10 vendors
- `GET /api/category-spend` - Spend by category
- `GET /api/cash-outflow` - Cash outflow forecast
- `GET /api/invoices` - Paginated invoices with search

### Chat Endpoint
- `POST /api/chat-with-data` - Natural language queries

**Example Request:**
```bash
curl http://localhost:3001/api/stats
```

**Example Response:**
```json
{
  "totalSpendYTD": 250000.00,
  "totalInvoicesProcessed": 45,
  "documentsUploaded": 100,
  "averageInvoiceValue": 2500.00
}
```

---

## Database Schema

**Location:** [`docs/ER_DIAGRAM.md`](./docs/ER_DIAGRAM.md)

**Tables:**
- **vendors** - Vendor information
- **customers** - Customer information
- **invoices** - Invoice records
- **line_items** - Invoice line items
- **payments** - Payment records

**Relationships:**
```
vendors (1) → (N) invoices
customers (1) → (N) invoices
invoices (1) → (N) line_items
invoices (1) → (N) payments
```

**Key Features:**
- UUID primary keys
- Foreign key constraints with CASCADE delete
- Indexes on frequently queried columns
- Decimal precision for currency values

---

## Chat Workflow

**Location:** [`docs/CHAT_WORKFLOW.md`](./docs/CHAT_WORKFLOW.md)

**Flow:**
```
User Input (Natural Language)
    ↓
Frontend (/chat page)
    ↓
Backend API (Express)
    ↓
Vanna AI Service (FastAPI)
    ↓
Groq API (LLM) → SQL Generation
    ↓
PostgreSQL → Execute SQL
    ↓
Return Results
    ↓
Frontend Display
```

**Security:**
- SQL injection prevention
- Only SELECT queries allowed
- Dangerous keywords blocked
- Rate limiting enabled

**Example Queries:**
- "Show me total spend by vendor"
- "What are the top 5 customers?"
- "List all pending invoices"

---

## Deployment Guide

**Location:** [`FINAL_DEPLOYMENT_GUIDE.md`](./FINAL_DEPLOYMENT_GUIDE.md)

**Platforms:**

### Frontend
- **Vercel** (Recommended) - Zero configuration for Next.js
- **Render** - Alternative option

### Backend API
- **Vercel** - Serverless functions
- **Render** - Traditional hosting
- **Railway** - Easy deployment

### Vanna AI
- **Railway** (Recommended) - Better Python support
- **Render** - Alternative option

### Database
- **Railway PostgreSQL** - Free tier available
- **Supabase** - Free tier with good features
- **Vercel Postgres** - Integrated with Vercel

---

## Environment Variables

**Location:** [`ENVIRONMENT_VARIABLES_GUIDE.md`](./ENVIRONMENT_VARIABLES_GUIDE.md)

### Backend API (`apps/api/.env`)
```env
DATABASE_URL="postgresql://user:password@localhost:5432/flowbit_db"
PORT=3001
VANNA_API_BASE_URL=http://localhost:8000
```

### Frontend (`apps/web/.env.local`)
```env
NEXT_PUBLIC_API_BASE=/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Vanna AI (`apps/services/vanna/.env`)
```env
DATABASE_URL=postgresql://user:password@localhost:5432/flowbit_db
GROQ_API_KEY=gsk_your_groq_api_key_here
PORT=8000
```

**Get API Keys:**
- Groq API: https://console.groq.com/keys (free)

---

## Project Structure

```
/
├── apps/
│   ├── web/              # Next.js Frontend
│   │   ├── src/
│   │   │   ├── app/      # App Router pages
│   │   │   ├── components/ # React components
│   │   │   ├── lib/      # Utilities
│   │   │   └── types/    # TypeScript types
│   │   └── package.json
│   │
│   ├── api/              # Express Backend
│   │   ├── src/
│   │   │   ├── index.ts  # Main server
│   │   │   ├── routes/   # API routes
│   │   │   └── middleware/ # Express middleware
│   │   ├── prisma/
│   │   │   ├── schema.prisma # Database schema
│   │   │   └── seed.ts   # Seed script
│   │   └── package.json
│   │
│   └── services/
│       └── vanna/        # Python Vanna AI Service
│           ├── main.py   # FastAPI server
│           ├── requirements.txt
│           └── render.yaml
│
├── data/
│   └── Analytics_Test_Data.json # Test dataset
│
├── docs/                 # Documentation
│   ├── SETUP.md
│   ├── API_DOCUMENTATION.md
│   ├── ER_DIAGRAM.md
│   └── CHAT_WORKFLOW.md
│
├── docker-compose.yml    # PostgreSQL setup
├── package.json          # Monorepo config
└── turbo.json           # Turborepo config
```

---

## Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **UI Library:** shadcn/ui + Radix UI
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **State:** React Hooks

### Backend
- **Runtime:** Node.js 20+
- **Framework:** Express.js
- **Language:** TypeScript
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Validation:** Express middleware

### AI Service
- **Framework:** Python FastAPI
- **LLM Provider:** Groq (Llama 3)
- **Database:** SQLAlchemy + psycopg2
- **API:** REST

### DevOps
- **Monorepo:** Turborepo
- **Package Manager:** npm
- **Database:** Docker Compose (local)
- **Deployment:** Vercel, Render, Railway

---

## Features Implemented

### ✅ Dashboard
- Overview cards with key metrics
- Invoice volume and value trends (line chart)
- Top 10 vendors by spend (bar chart)
- Spend by category (pie chart)
- Cash outflow forecast (bar chart)
- Searchable invoices table with pagination

### ✅ Chat with Data
- Natural language query interface
- SQL generation using Groq LLM
- Real-time query execution
- Results display with SQL preview
- Error handling and validation

### ✅ Backend API
- 7 REST endpoints for dashboard data
- Chat endpoint for natural language queries
- Rate limiting and CORS
- Error handling middleware
- Database connection pooling

### ✅ Database
- Normalized schema with 5 tables
- Foreign key constraints
- Indexes for performance
- Seed script with test data
- Migration system

### ✅ Security
- SQL injection prevention
- CORS configuration
- Rate limiting
- Environment variable management
- Input validation

---

## Testing

### Local Testing

**Backend API:**
```bash
# Health check
curl http://localhost:3001/health

# Get stats
curl http://localhost:3001/api/stats

# Get invoices
curl http://localhost:3001/api/invoices?page=1&limit=10
```

**Vanna AI:**
```bash
# Health check
curl http://localhost:8000/health

# Test query
curl -X POST http://localhost:8000/query \
  -H "Content-Type: application/json" \
  -d '{"query": "Show me total spend by vendor"}'
```

**Frontend:**
- Visit http://localhost:3000/dashboard
- Visit http://localhost:3000/chat

---

## Troubleshooting

### Common Issues

**Database Connection Failed:**
- Check PostgreSQL is running: `docker-compose ps`
- Verify DATABASE_URL is correct
- Check port 5432 is not in use

**Frontend 404 Errors:**
- Verify backend is running on port 3001
- Check NEXT_PUBLIC_API_BASE is set correctly
- Check CORS configuration in backend

**Vanna AI Not Responding:**
- Verify GROQ_API_KEY is set
- Check database connection
- Verify Python dependencies installed

**Build Errors:**
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear Next.js cache: `rm -rf apps/web/.next`
- Regenerate Prisma client: `cd apps/api && npx prisma generate`

---

## Additional Resources

### Deployment Guides
- [`FINAL_DEPLOYMENT_GUIDE.md`](./FINAL_DEPLOYMENT_GUIDE.md) - Complete deployment walkthrough
- [`SWITCH_TO_RAILWAY_NOW.md`](./SWITCH_TO_RAILWAY_NOW.md) - Railway deployment guide
- [`FRONTEND_RENDER_FIX.md`](./FRONTEND_RENDER_FIX.md) - Frontend deployment fixes

### Reference Guides
- [`ENVIRONMENT_VARIABLES_GUIDE.md`](./ENVIRONMENT_VARIABLES_GUIDE.md) - All environment variables
- [`QUICK_DEPLOY_REFERENCE.md`](./QUICK_DEPLOY_REFERENCE.md) - Quick deployment reference
- [`COMPLETE_DEPLOYMENT_STATUS.md`](./COMPLETE_DEPLOYMENT_STATUS.md) - Current deployment status

### Project Documentation
- [`README.md`](./README.md) - Project overview
- [`PROJECT_STATUS.md`](./PROJECT_STATUS.md) - Development status
- [`REQUIREMENTS_ANALYSIS.md`](./REQUIREMENTS_ANALYSIS.md) - Requirements breakdown

---

## Support

For issues or questions:
1. Check the troubleshooting section in [`docs/SETUP.md`](./docs/SETUP.md)
2. Review the relevant documentation above
3. Check deployment guides for platform-specific issues

---

## License

MIT License - See LICENSE file for details

---

**Last Updated:** 2024
**Version:** 1.0.0
