# Step 1: Use an official lightweight Java runtime as a parent image
FROM eclipse-temurin:17-jre-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the pre-built packaged JAR file into the container
# Note: Ensure you run `cd backend && ./gradlew bootJar` before building the Docker image
COPY backend/build/libs/hms-prototype.jar app.jar

# Step 4: Expose port 8080 to the outside world
EXPOSE 8080

# Step 5: Run the JAR file
ENTRYPOINT ["java", "-jar", "app.jar"]
