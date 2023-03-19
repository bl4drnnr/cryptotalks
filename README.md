<h1 align="center">
   Cryptotalks
</h1>

# Table of contents
1. [Introduction](#introduction)
2. [Project architecture](#project-architecture)
3. [Services](#services)
   1. [API](#api)
   2. [Front](#front)
   3. [Auth](#auth)
   4. [Crypto rates](#crypto-rates)
4. [Contact and references](#contact-and-references)
5. [License and tech stack](#license)

## Introduction

**Cryptotalks** - is a blog/forum dedicated to all things crypto for the crypto enthusiasts out there. If you're passionate about cryptocurrencies, blockchain technology, and decentralized finance, this is the perfect platform for you.

Our goal is to create a vibrant community where crypto geeks from all over the world can share their knowledge, insights, and experiences with one another. Our blog will feature articles on the latest developments in the crypto world, expert opinions on the hottest topics, and in-depth analysis of new projects and protocols.

Our forum, on the other hand, will provide a space for discussions, debates, and Q&A sessions, where members can ask questions, share ideas, and collaborate on projects. We believe that by bringing together people with diverse backgrounds and expertise, we can foster innovation and drive the growth of the crypto ecosystem.

So, whether you're a seasoned crypto trader, a blockchain developer, or just someone who's curious about this fascinating new technology, we invite you to join our community and be a part of the conversation. Let's explore the future of money together!

## Project architecture

This application has been build according to microservices approach. [In the next](#services) section dedicated to services you will find the detailed description of every service that have been implemented, but before that, **let's discuss what microservices are**. 

Microservices architecture is an approach to building software applications as a collection of small, independently deployable services, each running in its own process and communicating with lightweight mechanisms, such as HTTP APIs or message queues.

The architecture of microservices typically consists of the following components:

1. **_Services_**: Microservices are the individual services that make up the application. Each microservice is a self-contained module that performs a specific business function, such as user authentication or order processing. 
2. **_API Gateway_**: The API gateway is the entry point for all external requests to the application. It receives requests from clients and routes them to the appropriate microservices. It also performs other functions, such as authentication and rate limiting. 
3. **_Service Registry_**: The service registry is a central directory that stores information about all the microservices in the system, including their location and endpoints. This allows the API gateway to route requests to the correct microservice. 
4. **_Load Balancer_**: The load balancer distributes requests across multiple instances of a microservice to ensure that the system can handle high levels of traffic and provide high availability. 
5. **_Database_**: Each microservice typically has its own database, which it uses to store its data. The databases can be of different types and can be located in different physical locations. 
6. **_Monitoring and Logging_**: Monitoring and logging are crucial components of a microservices architecture. They allow developers to track the performance of the system, identify problems, and troubleshoot issues. 
7. **_Deployment and Orchestration_**: Microservices are typically deployed using containerization technologies such as Docker and managed using orchestration platforms such as Kubernetes. This allows developers to easily deploy, scale, and manage the microservices.

Overall, the architecture of microservices is designed to enable teams to build applications that are scalable, resilient, and easy to maintain. It provides a flexible and modular approach to application development that allows developers to focus on building small, focused services that can be quickly deployed and updated independently of each other.

In this project not every component has been implemented, because the description above describes big, production environment, since **_this project has been implemented for study purpose_** there were no need for implementing the whole infrastructure.

Here is more details about the difference between the architecture of microservices described above and the architecture of microservices that has been implemented in this project. The most of them are explained by the **_scale of the project_**, meaning that there were no need of implementation of the entire component. Therefore, they were either simplify or not implemented: 

- **_API Gateway_**: API Gateway normally should be created as a separate service, but since there won't be so many endpoints, **the role of the API Gateway was taken by** [API service](services/api).  
- **_Service Registry_**: The same explanation as for API Gateway. No separate service, was implemented in API.
- **_Load Balancer_**: Not for production.
- **_Monitoring and Logging_**: The monitoring system has been implemented, since, as mentioned previously, there is no production mode, but **some of critical logs are sent to MongoDB**.
- **_Deployment and Orchestration_**: As orchestration for this project **_Docker_** has been used. All services were compiled in [docker-compose](docker-compose.yml) file and can be executed together joined by the same network. Also, in the root folder of the project, in [package.json](package.json) file was written scripts that allow execution services both together and separately either within containers or locally. 

## Services

### API

### Front

### Auth

### Crypto rates

### Database

## Contact and references

- Developer contact - [contact@mikhailbahdashych.me](mailto:contact@mikhailbahdashych.me)
- API service - [services/api](services/api)
- Auth service - [services/auth](services/auth)
- Front service - [services/front](services/front)
- Crypto rates service - [services/crypto-rates](services/crypto-rates)

## License

Licensed by [MIT license](LICENSE).

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
