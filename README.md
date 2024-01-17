<p align="center">
  <img src="https://raw.githubusercontent.com/newerton/images/main/api-gateway/header.png" width="100%" alt="api-gateway" />
</p>

<p align="center">A microservice with nest framework, typeorm, apache kafka and kubernetes.</p>

## Diagram

<p align="center">
  <img src="https://raw.githubusercontent.com/newerton/images/main/api-gateway/diagram.png" width="100%" alt="api-gateway" />
</p>


## Project (development)

| Technology          |   |
|---------------------|:--------:|
| Nestjs              | ✅     |
| Apache Kafka        | ✅     |
| Docker              | ✅     |
| Kubernetes          | ✅     |
| KeyCloak            | ✅     |
| Stripe Payment      | 🟦     |
| Queue               | 🟦     |
| Istio               | 🟦     |
| Github Actions      | 🟦     |
| Nextjs              | 🟦     |
| GraphQL             | 🟦     |
| Elastic Stack       | 🟦     |
| Prometheus          | 🟦     |
| Grafana             | 🟦     |

| Microservices   |   |
|----------------|:--------:|
| Auth           | ✅     |
| User           | ✅     |
| Product        | ✅     |
| Category       | 🟦     |
| Payment        | 🟦     |
| Log            | 🟦     |
| Notifications  | ✅     |

✅ Developed 🟦 Not developed

## Clone other repositories

| Microservice | Repository |
| --- | --- |
| Helm Services | https://github.com/newerton/microservice-k8s |
| auth-engine | https://github.com/newerton/auth-engine |
| notification-engine | https://github.com/newerton/notification-engine |
| product-engine | https://github.com/newerton/product-engine |
| user-engine | https://github.com/newerton/user-engine |

## Installation

Install Tilt ❤️ (*A toolkit for fixing the pains of microservice development.*) - https://tilt.dev/

## Execute Tilt

Execute Tilt inside microservice-k8s folder

```cli
git clone git@github.com:newerton/microservice-k8s.git
cd microservice-k8s
tilt up
```
## Running the api-gateway

Inside api-gateway folder

```cli
npm install
npm run start:dev
```

## Swagger

```url
http://localhost:8000/api-docs/
```

## Keycloak

```url
http://auth.microservice.local
```

## Stay in touch

- Author - [Newerton Vargas de Araujo](https://newerton.com)

## License

This microservice is [MIT licensed](LICENSE).
