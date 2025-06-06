# Etapa de construcción
FROM eclipse-temurin:17-jdk-jammy AS build
WORKDIR /usr/app
COPY . .
RUN ./mvnw clean package -DskipTests

# Etapa final
FROM eclipse-temurin:17-jre-jammy
ENV DATABASE_URL=""
ENV DATABASE_USERNAME=""
ENV DATABASE_PASSWORD=""

WORKDIR /app
COPY --from=build /usr/app/target/*.jar /app/runner.jar

EXPOSE 8080

ENTRYPOINT ["sh", "-c", "java -jar /app/runner.jar --spring.datasource.url=$DATABASE_URL --spring.datasource.username=$DATABASE_USERNAME --spring.datasource.password=$DATABASE_PASSWORD"]
