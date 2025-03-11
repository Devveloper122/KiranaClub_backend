# Image Processing Job Manager

## Description

This project is a backend service for managing and processing store images asynchronously. It allows users to submit jobs containing multiple store visits, where each visit has images that need to be processed. The system validates store IDs, fetches images, calculates dimensions of the image, and handles errors gracefully.

- The project is built using **Node.js**, **Express.js**, and **MongoDB**.
- **Mongoose** is used for MongoDB interactions.
- Images are processed asynchronously.
- Store IDs are validated against a pre-loaded collection in MongoDB.
- Errors are stored in a structured format to indicate which store failed and why.


## API Endpoints:

1. Submit a Job :
   POST /api/jobs  

   - Accepts a JSON payload with store visits and image URLs.  
   - Validates store IDs before processing.  
   - Stores images and their metadata asynchronously.  

2. Get Job Status:
   GET /api/jobs/:jobId  

   - Returns the status (pending, completed, failed) of a job.  
   - If failed, includes detailed error messages for stores where image processing failed.  



## Installation and Setup

Ensure you have the following installed:

- **Node.js** (>= 16.x)
- **MongoDB** (Local or Cloud instance)
- **Docker** (optional, if running with Docker)

### Work Environment:

- Work Environment
- OS: Ubuntu 22.04 / Windows 11
- Editor: VS Code
- Database: MongoDB (Compass / Atlas)
- Technologies: Node.js, Express.js, Mongoose, Docker


### Steps to Run the Project Locally without docker:

1. Clone the repository:
   ```sh
   git clone https://github.com/Devveloper122/KiranaClub_backend.git
   cd KiranaClub_backend
   npm install
   npm run server.js


### Steps to Run the Project docker:

1. Clone the repository:
   ```sh
   git clone https://github.com/Devveloper122/KiranaClub_backend.git
   cd KiranaClub_backend
   docker build -t kirana-club-image.
   docker run -p 3000:3000 kirana-club-image


# Possible Improvements can make:

- can use Authentication and provide RBAC to user and admin.
- Use Cloud Storage (AWS S3, Google Cloud Storage) instead of storing images locally.
- Implement a queue system (like BullMQ with Redis) for better job management.
- Use **RabbitMQ** to **queue image processing jobs** asynchronously.  
  Prevent overload by **distributing job processing** among worker nodes.  
  Improves **scalability and reliability** by ensuring failed jobs can be retried.  
  Helps in **prioritizing critical jobs** over normal jobs. 





