# Liquid Soap Preparation App

This project consists of a React frontend (client) and an Express backend (server).

## Prerequisites

- Node.js installed on your machine.
- npm (Node Package Manager).

## Getting Started

To run the application, you need to start both the server and the client.

### 1. Start the Server

Navigate to the `server` directory and start the backend:

```powershell
cd server
npm install
npm run dev
```

The server will run on [http://localhost:5000](http://localhost:5000).

### 2. Start the Client

In a new terminal, navigate to the `client` directory and start the frontend:

```powershell
cd client
npm install
npm run dev
```

The client will run on [http://localhost:5173](http://localhost:5173) (default Vite port).

## API Endpoints

- `GET /materials`: Fetches the list of materials for soap preparation.
- `GET /steps`: Fetches the steps of the procedure.
- `GET /media`: Fetches media assets (diagrams, etc.).
