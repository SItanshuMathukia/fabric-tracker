 # FabricFlow: Enterprise Fabric Inventory Management Platform

> **A full-stack enterprise inventory and transaction management system designed to model real-world textile operations through scalable backend architecture, relational data modeling, and modern web technologies.**

![Python](https://img.shields.io/badge/Python-3.11+-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-green)
![React](https://img.shields.io/badge/React-Frontend-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-ORM-red)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

---

# Abstract

FabricFlow is a full-stack enterprise inventory management platform designed to digitize fabric batch tracking, inventory movement, and transaction-based ledger management for textile businesses.

The system models real-world inventory workflows by maintaining fabric batches, recording purchase and sales transactions, calculating stock availability, and generating accurate batch-level ledger information.

Built using **FastAPI**, **React**, **PostgreSQL**, and **SQLAlchemy**, FabricFlow demonstrates modern software engineering practices including RESTful API design, relational database modeling, modular architecture, data validation, and scalable backend development.

The project serves as a practical exploration of enterprise information systems, transactional data management, and scalable application architecture.

---

# Motivation

Many small and medium-scale textile businesses rely on manual inventory tracking, spreadsheets, and disconnected systems, leading to:

- Inventory inconsistencies
- Difficulty tracking fabric movement
- Manual ledger maintenance
- Limited visibility into stock value
- Increased operational overhead

FabricFlow addresses these challenges by providing a centralized digital platform that maintains accurate inventory state through transaction-driven workflows.

The system explores important software engineering concepts:

- How can transactional systems maintain reliable inventory state?
- How should relational data models represent real-world business processes?
- How can backend services remain modular and scalable?
- How can enterprise workflows be transformed into reliable software systems?

---

# Key Features

## Fabric Batch Management

- Create and manage fabric batches
- Automatic batch identification
- Store fabric metadata:
  - Color
  - Supplier/Party
  - Quantity
  - Rate
  - Pricing information
  - Purchase details

---

## Transaction Management

Supports complete inventory lifecycle tracking:

- Purchase transactions
- Sales transactions
- Returns
- Stock adjustments

Every transaction updates the inventory ledger while maintaining historical records.

---

## Inventory Tracking

Provides real-time inventory insights:

- Current stock availability
- Remaining fabric quantity
- Batch-level inventory status
- Total inventory valuation

---

## Ledger Management

Maintains a complete transaction history for each fabric batch:

- Opening inventory
- Incoming stock
- Outgoing stock
- Adjustments
- Current balance

The ledger design ensures transparency and traceability of inventory changes.

---

# System Architecture

                     React Frontend
                          |
                          |
                          ▼
                   FastAPI Backend
                          |
         ┌────────────────┴────────────────┐
         |                                 |
         ▼                                 ▼
Pydantic Validation              SQLAlchemy ORM
         |                                 |
         └────────────────┬────────────────┘
                          |
                          ▼
                 PostgreSQL Database

---

# Design Decisions

## Transaction-Based Inventory Model

Inventory state is derived from transaction history rather than storing duplicate values.

Benefits:

- Improved consistency
- Complete audit history
- Easier debugging
- Reliable inventory calculations

---

## Relational Database Design

PostgreSQL was selected because inventory systems require:

- ACID-compliant transactions
- Strong relational modeling
- Data consistency
- Structured querying

---

## Layered Backend Architecture

The backend follows a modular structure separating:

- API routes
- Business logic
- Database models
- Data schemas
- Persistence layer

This improves maintainability and scalability.

---

# Engineering Highlights

This project demonstrates:

- RESTful API development
- Enterprise backend architecture
- Relational database modeling
- Transaction management
- ORM-based database interaction
- Schema validation
- Full-stack application development
- Modular software design
- Scalable application structure

---

# Technology Stack

## Frontend

| Technology | Purpose |
|------------|---------|
| React | User Interface |
| JavaScript | Frontend Logic |
| HTML5 | Structure |
| CSS3 | Styling |
| Axios | API Communication |

---

## Backend

| Technology | Purpose |
|------------|---------|
| FastAPI | REST API Framework |
| Python | Backend Development |
| SQLAlchemy | ORM Layer |
| Pydantic | Data Validation |
| Uvicorn | Application Server |

---

## Database

| Technology | Purpose |
|------------|---------|
| PostgreSQL | Relational Data Storage |

---

## Development Tools

- Docker
- Git
- GitHub
- REST APIs
- Swagger/OpenAPI

---

# Project Structure


fabricflow/

├── backend/
│ │
│ ├── app/
│ │ ├── database.py
│ │ ├── main.py
│ │ ├── models/
│ │ ├── schemas/
│ │ ├── routes/
│ │ └── services/
│ │
│ ├── requirements.txt
│ └── .env
│
├── frontend/
│ │
│ ├── src/
│ ├── public/
│ ├── package.json
│ └── vite.config.js
│
├── docs/
│
└── README.md


---

# Getting Started

## Clone Repository

```bash
git clone https://github.com/SitanshuMathukia/fabric-tracker.git

cd fabric-tracker
Backend Setup

Create virtual environment:

python -m venv venv

Activate environment:

Windows:

venv\Scripts\activate

macOS/Linux:

source venv/bin/activate

Install dependencies:

pip install -r requirements.txt
Configure Environment Variables

Create .env file:

DATABASE_URL=postgresql://postgres:password@localhost:5432/fabric_db
Run Backend
uvicorn app.main:app --reload

Backend:

http://localhost:8000

API Documentation:

http://localhost:8000/docs
Frontend Setup

Navigate to frontend:

cd frontend

Install dependencies:

npm install

Run application:

npm run dev

Frontend:

http://localhost:5173
Database Model
Fabric Batch

Stores core fabric information:

FabricBatch
-------------
id
color
party
date
rate
meters
price
Fabric Transaction

Maintains inventory movement:

FabricTransaction
-----------------
id
batch_id
type
meters
rate
amount
API Capabilities
Batch Management

Create and retrieve fabric batches.

Example:

POST /create_batch
Transaction Processing

Record inventory changes.

Example:

POST /transaction
Ledger Retrieval

Generate batch-level transaction history.

Example:

GET /ledger/{batch_id}
Inventory Overview

Retrieve current inventory state.

Example:

GET /inventory
Future Enhancements

Planned improvements include:

JWT authentication
Role-based access control
User management
Barcode and QR code integration
Invoice generation
Excel import/export
Analytics dashboard
Sales forecasting
Purchase order management
Cloud deployment
Automated reporting
Audit logging
Research Relevance

Although developed as an enterprise application, FabricFlow explores concepts relevant to software engineering and information systems research:

Transactional data management
Enterprise application architecture
Reliable state management
Database consistency models
Scalable backend systems
Business process automation
Software architecture patterns

The project demonstrates the application of modern engineering principles to solve real-world operational challenges.

Deployment
Backend
FastAPI
Uvicorn
Render
Frontend
React
Vercel
Database
PostgreSQL
Performance Considerations

The application is designed with:

Modular backend architecture
Efficient relational queries
ORM-based database access
RESTful communication
Scalable service organization
Maintainable code structure


# Author
Sitanshu Mathukia

Software Engineer with experience building scalable backend systems, full-stack applications, and AI-powered solutions.

# Interests

Artificial Intelligence
Large Language Models
Software Engineering
Distributed Systems
Enterprise Application Architecture
Scalable Backend Systems

