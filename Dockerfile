# Stage 1: Build the React Frontend
FROM node:18-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Build the Spring Boot Backend
FROM eclipse-temurin:17-jdk-alpine AS backend-build
WORKDIR /app/backend
# Copy the gradle files first for dependency caching
COPY backend/gradlew .
COPY backend/gradle/ gradle/
COPY backend/build.gradle .
COPY backend/settings.gradle .
# Make gradlew executable and download dependencies
RUN chmod +x gradlew
RUN ./gradlew dependencies --no-daemon || true

# Copy the rest of the backend code
COPY backend/src src/
# Copy the built frontend from Stage 1 into the backend's static folder
COPY --from=frontend-build /app/frontend/dist/ src/main/resources/static/
# Build the JAR file
RUN ./gradlew bootJar --no-daemon

# Stage 3: Create the final lightweight runtime image
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
# Copy the built JAR from Stage 2
COPY --from=backend-build /app/backend/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
