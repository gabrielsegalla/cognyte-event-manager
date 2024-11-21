# Cognyte - Event Management Application

This is a full-stack application for managing events, developed using Java with Spring Boot for the backend and React with Next.js for the frontend.

## Technologies Used

- **Backend**: Java with Spring Boot
- **Frontend**: React with Next.js, React Hooks
- **Styling**: Tailwind CSS, Reactstrap
- **Database**: PostgreSQL
- **ORM**: Hibernate (for database interaction)



## Setup Instructions

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