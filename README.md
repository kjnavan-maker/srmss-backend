# SRMSS Backend

Smart Route Management and Scheduling System for Public Transport Depots

## Project Overview

SRMSS Backend is the REST API server for the Smart Route Management and Scheduling System. It provides API endpoints for authentication, route management, driver management, vehicle management, scheduling, fuel logs, maintenance records, user management, and reports.

## Main Features

* Admin, manager, and driver login API
* Route management API
* Driver management API
* Vehicle management API
* Schedule management API
* Schedule conflict checking
* Fuel log management API
* Maintenance record management API
* User management API
* Reports and analytics API
* RESTful API structure

## Technologies Used

* Node.js
* Express.js
* MongoDB / Mongoose
* CORS
* dotenv
* JSON Web Token
* bcryptjs
* Nodemon

## Project Setup

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000
ENABLE_DB=false
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run the backend server:

```bash
npm run dev
```

Backend URL:

```text
http://localhost:5000
```

Health Check API:

```text
http://localhost:5000/api/health
```

## Demo Login Credentials

```text
Admin
Username: admin
Password: admin123

Depot Manager
Username: manager
Password: manager123

Driver
Username: driver
Password: driver123
```

## API Endpoints

```text
POST   /api/auth/login

GET    /api/routes
POST   /api/routes
PUT    /api/routes/:id
DELETE /api/routes/:id

GET    /api/drivers
POST   /api/drivers
PUT    /api/drivers/:id
DELETE /api/drivers/:id

GET    /api/vehicles
POST   /api/vehicles
PUT    /api/vehicles/:id
DELETE /api/vehicles/:id

GET    /api/schedules
POST   /api/schedules
PUT    /api/schedules/:id
DELETE /api/schedules/:id

GET    /api/fuel-logs
POST   /api/fuel-logs
PUT    /api/fuel-logs/:id
DELETE /api/fuel-logs/:id

GET    /api/maintenance
POST   /api/maintenance
PUT    /api/maintenance/:id
DELETE /api/maintenance/:id

GET    /api/users
POST   /api/users
PUT    /api/users/:id
DELETE /api/users/:id

GET    /api/reports/summary
GET    /api/reports/monthly
POST   /api/reports/generate
```

## Frontend Connection

This backend connects with the SRMSS frontend running on:

```text
http://localhost:5173
```

Frontend API environment variable:

```env
VITE_API_URL=http://localhost:5000/api
```

## Developed For

CS6003 Advanced Software Engineering Project
