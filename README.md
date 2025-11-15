## Asset Management Project Backend (Node.js + Express + PostgreSQL + MongoDB + AWS S3)

A production-ready backend that supports: 

## Features 

- Email/password authentication
- Google OAuth login
- Role-based access control (RBAC)
- AWS S3 file uploads
- Asset management
- Analytics endpoints
- Docker deployment
- AWS EC2 hosting

## Tech Stack

- Node.js / Express
- PostgreSQL (NeonDB)
- MongoDB (Mongoose)
- Sequelize ORM
- AWS S3
- Passport.js (Google OAuth)
- JWT Authentication
- Docker & Docker Compose
- AWS EC2

## Local Setup Instructions
1️⃣ Clone Repository
git clone <repo-url>
cd <project-folder>

2️⃣ Install Dependencies
npm install

3️⃣ Create .env
touch .env.example .env

Fill the variables.

4️⃣ Run the Server
npm start

Backend runs at:
http://localhost:3000

## Running With Docker
1️⃣ Build Docker Image
docker build -t asset-backend .

2️⃣ Run with Docker Compose
docker-compose up -d

3️⃣ Check Container Logs
docker logs asset-backend

## Deploying steps for AWS EC2

1️⃣ Launch EC2 Instance

Ubuntu 22.04
t2.micro (which is free tier)

2️⃣ SSH into the Server
ssh -i key.pem ubuntu@YOUR_PUBLIC_IP

3️⃣ Install Docker & Compose
sudo apt update
sudo apt install -y docker.io docker-compose
sudo systemctl enable docker
sudo systemctl start docker

4️⃣ Clone Your Project
sudo apt install git -y
git clone <your-repo-url>
cd <project-folder>

5️⃣ Add .env on EC2
nano .env

Paste real production values.

6️⃣ Start with Docker Compose
docker-compose up -d

Backend becomes live at:
http://YOUR_PUBLIC_IP:3000





