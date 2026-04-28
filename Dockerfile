# Stage 1: Build the Spring Boot Backend
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

# Build the JAR file (this will use the cached dependencies)
RUN ./gradlew bootJar --no-daemon

# Stage 2: Create the final lightweight runtime image
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copy the built JAR from Stage 1
COPY --from=backend-build /app/backend/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
