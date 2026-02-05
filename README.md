# ⚙️ BDJob - Backend API Server

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="NodeJS" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="ExpressJS" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" />
</p>

## 📖 Overview
The **BDJob Backend** is a robust RESTful API built to power the BDJob marketplace. It manages data persistence using **MongoDB**, handles secure user sessions via **JSON Web Tokens (JWT)**, and ensures data integrity through custom middleware. The server is optimized for high performance and secure cross-origin communication.



## 🛠️ Core Functionalities
* **🔐 Secure Authentication:** Implements JWT-based authentication where tokens are issued upon login and stored in **HTTP-only cookies** for enhanced security.
* **🛡️ Authorization Middleware:** Features a custom `verifyToken` middleware to protect private routes and prevent unauthorized data access.
* **💼 Job Lifecycle Management:** Full CRUD (Create, Read, Update, Delete) operations for job postings, allowing recruiters to manage listings dynamically.
* **📥 Application Tracking:** Efficiently handles job applications and utilizes the `$inc` operator to update applicant counts in real-time.
* **🌐 CORS Integration:** Configured to support multiple origins, ensuring seamless communication with production environments like Netlify and Vercel.

## 📡 Key API Endpoints

### Authentication
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/jwt` | Creates a JWT token and sets it as an HTTP-only cookie. |
| `POST` | `/logout` | Clears the authentication token from the client's browser. |

### Jobs & Applications
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/jobs` | Fetches all available jobs with optional category filtering. |
| `GET` | `/jobs/:id` | Retrieves detailed information for a specific job posting. |
| `POST` | `/postedjobs` | Allows authenticated users to create a new job listing. |
| `PATCH` | `/jobs/:id` | Increments the total number of applicants for a specific job. |
| `DELETE` | `/postedjobs/:id` | Enables users to remove their specific job postings. |

---

## 🚀 Step-by-Step Installation Guide

Follow these instructions to set up the development environment on your local machine:

### 1. Clone the Repository
First, open your terminal and clone the backend repository from GitHub:
```bash
git clone [https://github.com/Ashikur07/bdjobs-backend](https://github.com/Ashikur07/bdjobs-backend)
cd bdjobs-backend
