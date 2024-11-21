# Cognyte - Event Management Application

This is a full-stack application for managing events, developed using Java with Spring Boot for the backend and React Hook with Next.js for the frontend.

## Technologies Used

- **Backend**: Java with Spring Boot
- **Frontend**: React with Next.js, React Hooks
- **Styling**: Tailwind CSS, Reactstrap (Bootstrap)
- **Database**: PostgreSQL

## Requirements

Before setting up the application, ensure your environment meets the following requirements:

### Backend
- **Java**: OpenJDK 17  
  Install via your package manager or download from the [OpenJDK website](https://openjdk.org/).  
  
- **Maven**: Apache Maven 3.6+  
  Ensure Maven is installed for dependency management and building.  
- **Database**: PostgreSQL 15+  
  Make sure PostgreSQL is installed and running, or use the provided Docker instructions.  

### Frontend
- **Node.js**: Node.js 20  
  Install Node.js 20 using a version manager like `nvm` or directly from the [Node.js website](https://nodejs.org/).  
 
- **npm**: Included with Node.js installation.  

## Run with Docker
You can use Docker to quickly set up and run the application. Follow these steps:
### Backend

1. Start a PostgreSQL container:
   ```bash
   docker run --name db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=event-manager-database -p 5432:5432 -d postgres:15-alpine
   ```

2. Build the backend Docker image:
   ```bash
   docker build -t event-manager-backend .
   ```

3. Run the backend container and link it to the database:
   ```bash
   docker run --name backend --link db -e SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/event-manager-database -e SPRING_DATASOURCE_USERNAME=postgres -e SPRING_DATASOURCE_PASSWORD=postgres -p 8080:8080 -d event-manager-backend
   ```

   - The backend will be available at [http://localhost:8080](http://localhost:8080).
   - The database will be running on port `5432`.

### Frontend

1. Build the frontend Docker image:
   ```bash
   docker build -t event-manager-frontend .
   ```

2. Run the frontend container:
   ```bash
   docker run --name frontend -p 3000:3000 -d event-manager-frontend
   ```

   - The frontend will be available at [http://localhost:3000](http://localhost:3000).


## Local Development Setup
If you prefer to set up the application manually for local development, follow these steps:

### Backend

1. Clone the repository.
2. Navigate to the `backend` directory and install dependencies:
   ```bash
   ./mvnw clean install
3. Configure the database connection in application.properties:
    ```java
    spring.datasource.url=jdbc:postgresql://localhost:5432/database
    spring.datasource.username=username
    spring.datasource.password=password
    ```
4. Run the Spring Boot application:
    ```bash
    ./mvnw spring-boot:run
    ```
5. The backend will be available at http://localhost:8080.

### Frontend
1. Clone the repository.
2. Navigate to the `frontend` directory and install dependencies:
   ```bash
   npm install
   ```
3. Start the Next.js development server:
    ```bash
   npm run dev
   ```
4. The frontend will be available at http://localhost:3000.