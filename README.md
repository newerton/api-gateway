<p align="center">
  <img src="https://raw.githubusercontent.com/newerton/images/main/api-gateway/header.png" width="100%" alt="api-gateway" />
</p>

<p align="center">A microservice with nest framework, typeorm, apache kafka and kubernetes.</p>

## Diagram

<p align="center">
  <img src="https://raw.githubusercontent.com/newerton/images/main/api-gateway/diagram.png" width="100%" alt="api-gateway" />
</p>


## Project (development)
### Technology
- Nestjs
- Apache Kafka
- Docker
- Kubernetes
- KeyCloak
- Stripe Payment
- Queue
- Istio
- Github Actions
- Nextjs
- GraphQL
- Elastic Stack
- Prometheus
- Grafana

### Microservices
 - Auth
 - User
 - Product
 - Category
 - Payment
 - Log
 - Notifications


## Installation

Install Skaffold -  https://skaffold.dev/docs/install/

## Clone other repositories

| Microservice | Repository |
| --- | --- |
| Apache Kafka | https://github.com/newerton/microservice-kafka |
| Keycloak | https://github.com/newerton/microservice-keycloak |
| auth-engine | https://github.com/newerton/auth-engine |
| user-engine | https://github.com/newerton/user-engine |
| product-engine | https://github.com/newerton/product-engine |

## Running the app

Running all microservices in nest

```yaml
# Creates a skaffold.yaml file outside the repository folders

apiVersion: skaffold/v2beta11
kind: Config
build:
  local:
    concurrency: 0 #builds all artifacts parallely
requires:
  - path: ./api-gateway
  - path: ./auth-engine
  - path: ./user-engine

```

```bash
# development
$ skaffold dev --port-forward
```


## Swagger

```url
http://localhost:8000/docs/
```

## Keycloak

```url
http://localhost:8080
```

## Stay in touch

- Author - [Newerton Vargas de Araujo](https://newerton.com)

## License

This microservice is [MIT licensed](LICENSE).
