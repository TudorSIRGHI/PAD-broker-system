# Transport Management Platform: Microservices-Based System

## Overview

The Transport Management Platform is a comprehensive system developed using microservices architecture to efficiently manage dispatcher and driver operations. This document provides an in-depth look at the platform's architecture, technology stack, data management, and deployment process.

## Application Benefits

The use of microservices architecture offers several key advantages:
- **Scalability**: The platform is designed to scale individual services, such as **Dispatcher Management** and **Driver Management**, independently to handle varying loads. This modularity ensures resource optimization during high-traffic periods.
- **Fault Isolation**: With microservices, an issue in one service (e.g., dispatcher operations) does not disrupt the entire platform, thus maintaining reliability.
- **Enhanced Security**: Each service has distinct security measures, allowing granular control over access and protecting sensitive data.
- **Real-Time Capabilities**: The integration of a **Lobby Mechanism** supported by WebSockets facilitates real-time interaction between dispatchers and drivers, enhancing responsiveness and user experience.
- **Continuous Deployment**: Microservices enable quicker updates and isolated deployments, minimizing risk and accelerating development cycles.

## Service Boundary

### Architecture Diagram

![Microservice Diagram 2](https://github.com/user-attachments/assets/8883e8ea-cfe1-46bc-9d1d-579012d80a31)

### Key Components

- **API Gateway (Java)**: Serves as the entry point for client requests, directing them to the appropriate microservices via REST and balancing the load.
- **Service Discovery (Java)**: Provides dynamic registration and discovery of microservices, enabling seamless gRPC communication between them.
- **Dispatcher Management Microservice (Node.js)**: Manages dispatcher activities, including registration and order creation, with data stored in **MongoDB**.
- **Driver Management Microservice (Node.js)**: Manages driver-related tasks, such as registration and order lookup, connected to its own **MongoDB** database.
- **Redis Cache**: Deployed in a Docker container, it improves system performance by caching frequently requested data.
- **ELK Stack (Elasticsearch, Logstash, Kibana)**: Used for centralized logging, monitoring, and visualization of system logs.
- **ETL Service**: Extracts, transforms, and loads data into a **Data Warehouse (MongoDB)** for advanced reporting and analysis.
- **Data Warehouse (MongoDB)**: Acts as the main repository for processed data, supporting data aggregation and business intelligence.

## Technology Stack

### Programming Languages & Frameworks
- **Java**: Used in the API Gateway and Service Discovery for efficient routing, load balancing, and service registration.
- **Node.js**: Runs the Dispatcher and Driver Management Microservices with Express.js, providing a fast, non-blocking server environment.

 
### Communication & Service Discovery
- **HTTP & REST**: Used for client-to-service communication, enabling lightweight, stateless interactions.
- **WebSockets**: Supports real-time communication for interactive features such as dispatcher-driver updates.
- **gRPC**: Ensures efficient inter-service communication with high performance and low latency.
- **Eureka**: Employed for service registration and discovery, allowing services to find and interact with each other dynamically.

### Databases & Storage
- **MongoDB**: Utilized for both the Dispatcher and Driver Management databases for flexible and scalable data storage.
- **Redis**: Provides a caching mechanism to enhance performance and reduce direct database queries.

### Containerization
- **Docker**: Ensures consistency in deployment across environments with isolated containers for each service.
- **Docker Compose**: Simplifies the orchestration of multi-container applications for easier deployment and scaling.
### Monitoring & Data Processing
- **ELK Stack**: Integrated for centralized logging and real-time monitoring, enabling quick issue detection and system analysis.
- **ETL Service**: Responsible for the data pipeline that extracts, processes, and loads data into the **Data Warehouse**.

## Data Management

### Database Structure
Each microservice is paired with its own database, ensuring data isolation and autonomous management.

#### Dispatcher Management Microservice
- **Database**: MongoDB
- **Sample Data Entry**:
  ```json
  {
    "name": "NewUser",
    "procent": "100",
    "orderId": "66fef01d63576c466f16f186"
  }
  ```

#### Driver Management Microservice
- **Database**: MongoDB
- **Sample Data Entry**:
  ```json
  {
    "name": "NewUser",
    "carNumber": "ABC123"
  }
  ```

## API Overview

### Dispatcher Management Endpoints
1. **Register Dispatcher**
   - **Endpoint**: `POST http://localhost:3001/dispatcher/register`
   - **Request Body**:
     ```json
     {
       "name": "NewUser",
       "procent": "100",
       "orderId": "66fef01d63576c466f16f186"
     }
     ```

2. **Create Order**
   - **Endpoint**: `POST http://localhost:3001/dispatcher/order`
   - **Request Body**:
     ```json
     {
       "pointA": "Moldova",
       "pointB": "Franta",
       "price": 500,
       "products": "Mere, Pere, Struguri"
     }
     ```

### Driver Management Endpoints
1. **Register Driver**
   - **Endpoint**: `POST http://localhost:3000/driver/register`
   - **Request Body**:
     ```json
     {
       "name": "NewUser",
       "carNumber": "ABC123"
     }
     ```

2. **Find Order by ID**
   - **Endpoint**: `POST http://localhost:3000/driver/findOrder/:id`
   - **Path Parameter**: `id` - The ID of the order to search for.

## Real-Time Communication

The **Lobby Mechanism** enables real-time communication between dispatchers and drivers via WebSockets. This feature allows users to join, send messages, and leave virtual lobbies for seamless interaction and live updates.

### WebSocket Events
- **Join Lobby**
  - **Event**: `joinLobby`
  - **Payload**:
    ```json
    {
      "lobbyName": "DeliveryGroup",
      "username": "dispatcher01"
    }
    ```

- **Send Message**
  - **Event**: `message`
  - **Payload**:
    ```json
    {
      "message": "Order confirmed!",
      "username": "dispatcher01"
    }
    ```

- **Leave Lobby**
  - **Event**: `leaveLobby`
  - **Payload**:
    ```json
    {
      "username": "dispatcher01"
    }
    ```

## Deployment Guide

### Run Services
1. **Run MongoDB Containers**:
   ```bash
   docker run --name dispatcher -d -p 27017:27017 -v mongodata:/data/db_dispatcher mongo
   docker run --name driver -d -p 27018:27017 -v mongodata:/data/db_driver mongo
   ```

2. **Run Redis Container**:
   ```bash
   docker run --name redis-container -d -p 6379:6379 redis:latest
   ```

3. **Deploy the Platform**:
   ```bash
   docker-compose up --build
   ```

### Verify Deployment
Use the following commands to check service status:
```bash
curl http://localhost:3000/status
curl http://localhost:3001/status
```

### Stop the Platform
```bash
docker-compose down
```

## Logging and Monitoring

The platform's centralized logging and monitoring are managed with the **ELK Stack**, providing real-time insights and streamlined troubleshooting.
