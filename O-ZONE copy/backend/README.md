# O-Zone
## Backend

[![TypeScript][ts-badge]][ts-url]
[![Documentation][docs-badge]][docs-url]
[![Docker Image][docker-badge]][docker-url]
[![CI-Github Actions][gh-actions-badge]][gh-actions-url]

[ts-badge]: https://img.shields.io/badge/Code_Base-TypeScript-blue
[ts-url]: https://www.typescriptlang.org/

[docs-badge]: https://img.shields.io/badge/docs-Swagger-green
[docs-url]: 127.0.0.1:8081/docs

[docker-badge]: https://img.shields.io/badge/Docker_Image-node%3A22--alpine-blue
[docker-url]: https://hub.docker.com/layers/library/node/22-alpine/images/sha256-3a4802e64ab5181c7870d6ddd8c824c2efc42873baae37d1971451668659483b

[gh-actions-badge]: https://github.com/capsule-rs/capsule/workflows/build/badge.svg
[gh-actions-url]: https://github.com/andre-stana/O-ZONE/actions


## Table of Contents

1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Project Structure](#project-structure)
5. [Environment Configuration](#environment-configuration)
6. [Database](#database)
7. [Testing](#testing)
8. [Troubleshooting](#troubleshooting)
9. [Contributors](#contributors)

---

## Introduction

This backend is designed to handle the area of O-Zone Website and application.
It is built using NodeJS and Express and uses many technologies like: prisma with postegreSQL and passport for data storage.

---

## Prerequisites

- **[Language/Runtime]**: `Node.js >= 16.x` `TypeScript`
- **[Package Manager]**: `npm >= 8.x`
- **Database**: PostgreSQL
- **Other Tools**: [Docker](https://hub.docker.com/layers/library/node/22-alpine/images/sha256-3a4802e64ab5181c7870d6ddd8c824c2efc42873baae37d1971451668659483b) (for containerized environments during developpment and deploy)

---


## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/andre-stana/O-ZONE.git
   cd O-ZONE
   ```
2. Configure the environment:
    Copy all the `.env.example` files to `.env` and adjust the values to match your local setup.

3. Run Docker stack:
    ```bash
    docker compose -f dev.docker-compose.yml api up --build
    # or
    docker compose -f prod.docker-compose.yml api up --build
    ```

---

## Project Structure

```bash
.
├── tsconfig.json
├── src
│   ├── utils
│   ├── types
│   ├── triggers
│   ├── strategies
│   ├── routes
│   ├── reactions
│   ├── middleware
│   ├── index.ts
│   ├── controllers
│   ├── config
│   └── actions
├── README.md
├── prisma
│   ├── schema.prisma
│   └── migrations
├── package.json
├── Dockerfile.prod
├── Dockerfile.dev
└── about.json
```

---

## Environment Configuration

```bash
NODE_ENV=production
DATABASE_URL=postgresql://myuser:mypassword@db:5432/mydatabase?schema=public

API_PORT=8080
API_URL=http://localhost
API_SECRET="your_secret_key"

FRONTEND_PORT=8081
FRONTEND_URL=http://localhost

MOBILE_APP_URL=app://

GOOGLE_CLIENT_ID="<key>"
GOOGLE_CLIENT_SECRET="<key>"

GITHUB_CLIENT_ID="<key>"
GITHUB_CLIENT_SECRET="<key>"

SPOTIFY_CLIENT_ID="<key>"
SPOTIFY_CLIENT_SECRET="<key>"

DISCORD_CLIENT_ID="<key>"
DISCORD_CLIENT_SECRET="<key>"
```

---

## Database

<ADD an image\>

---

## Testing

You can find testing through our github action policy and using cypress
<Need to add details\>

---

## Environment Configuration

- Prisma Issue
Ensure that the correct migration as been make by your side in the database docker volume.

- Port already in use
Change the `PORT` value in the `.env` file.

- Oauth/Webhook do not work
Verify that your `IP` is redirected to a `https://` path.

---

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<table>
        <td align="center">
            <a href="https://www.linkedin.com/in/enzo-cesaretti/">
                <img src="https://media.licdn.com/dms/image/v2/D4D03AQE1LeK1wWM-yA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1699904832696?e=1741824000&v=beta&t=5IssYuarokVfzWs0Sd13qlvKj1VZyaz1BAbHPp70thU" width="80px;" alt="André Stana" />
                <br />
                <sub>
                    <b>Enzo Cesaretti</b>
                </sub>
            </a>
            <br />
            <a href="https://github.com/andre-stana/O-ZONE/commits?author=enzo-cesaretti" title="Coding">💻</a>
            <a href="https://github.com/andre-stana/O-ZONE/commits?author=enzo-cesaretti" title="Maintenance">🚧</a>
        </td>
        <td align="center">
            <a href="https://www.linkedin.com/in/nathan-couturier-44b83626a/">
                <img src="https://media.licdn.com/dms/image/v2/D4E03AQEU3NRWNWVAow/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1730158674810?e=1741824000&v=beta&t=K1NANW4ya4hICPP29nhJdsKN_XfROt_ql3i__tVm-qY" width="80px;" alt="Nathan Couturier" />
                <br />
                <sub>
                    <b>Nathan Couturier</b>
                </sub>
            </a>
            <br />
            <a href="https://github.com/andre-stana/O-ZONE/commits?author=CouturierNathan" title="Coding">💻</a>
            <a href="https://github.com/andre-stana/O-ZONE/commits?author=CouturierNathan" title="Project Management">📆</a>
        </td>
    </tr>
</table>
