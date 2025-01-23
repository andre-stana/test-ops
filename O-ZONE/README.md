# O-ZONE - AREA

## Description

O-ZONE est notre interprétation du projet Area de Tek3. Ce projet permet de créer des automatisations entre différents services en ligne.

## Getting Started

### Dependencies

* Describe any prerequisites, libraries, OS version, etc., needed before installing program.
* ex. Windows 10

### Installing

* How/where to download your program
* Any modifications needed to be made to files/folders

### Executing program

* How to run the program
* Step-by-step bullets
```
code blocks for commands
```

## Help

Any advise for common problems or issues.
```
command to run if program contains helper info
```

## Authors

<table>
    <td align="center">
            <a href="https://www.linkedin.com/in/guillian-tissier/">
                <img src="https://media.licdn.com/dms/image/v2/D4D03AQHkw6rOGSdVRA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1683189055608?e=1743033600&v=beta&t=w8L14_EADAlTkeFbmN3WU24-8xT_sdDzwQeVZAGOUrI" width="80px;" alt="Guillian Tissier" />
                <br />
                <sub>
                    <b>Guillian Tissier</b>
                </sub>
            </a>
            <br />
            <a href="https://github.com/andre-stana/O-ZONE/commits?author=guillian-tissier" title="Coding">💻</a>
            <a href="https://github.com/andre-stana/O-ZONE/commits?author=guillian-tissier" title="Maintenance">🚧</a>
        </td>
        <td align="center">
            <a href="https://www.linkedin.com/in/baptiste-rachez-3ab068278/">
                <img src="https://media.licdn.com/dms/image/v2/D4E35AQE2ZB4DpW7aGA/profile-framedphoto-shrink_800_800/profile-framedphoto-shrink_800_800/0/1722732994059?e=1738058400&v=beta&t=fey81H_iPezrvJ4hD7_n5CXQTccLGDaVdoq9CDGvRtM" width="80px;" alt="Baptiste Rachez" />
                <br />
                <sub>
                    <b>Baptiste Rachez</b>
                </sub>
            </a>
            <br />
            <a href="https://github.com/andre-stana/O-ZONE/commits?author=panini2" title="Coding">💻</a>
            <a href="https://github.com/andre-stana/O-ZONE/commits?author=panini2" title="Maintenance">🚧</a>
        </td>
        <td align="center">
            <a href="https://www.linkedin.com/in/andre-stana/">
                <img src="https://media.licdn.com/dms/image/v2/D4E03AQGxr0asP78dvQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1677175317951?e=1743033600&v=beta&t=IBe_sjdvRNh7uSQHTYbZ9nN-LWpipL9hpS1LkqJq_7g" width="80px;" alt="André Stana" />
                <br />
                <sub>
                    <b>André Stana</b>
                </sub>
            </a>
            <br />
            <a href="https://github.com/andre-stana/O-ZONE/commits?author=deedax" title="Coding">💻</a>
            <a href="https://github.com/andre-stana/O-ZONE/commits?author=deedax" title="Maintenance">🚧</a>
        </td>
        <td align="center">
            <a href="https://www.linkedin.com/in/enzo-cesaretti/">
                <img src="https://media.licdn.com/dms/image/v2/D4D03AQE1LeK1wWM-yA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1699904832696?e=1741824000&v=beta&t=5IssYuarokVfzWs0Sd13qlvKj1VZyaz1BAbHPp70thU" width="80px;" alt="Enzo Cesaretti" />
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

### Prérequis

Avant d'installer et de lancer le projet, assurez-vous d'avoir les éléments suivants installés sur votre machine :

- Docker
- Docker Compose
- Node.js (version 14 ou supérieure)
- npm (version 6 ou supérieure)

### Installation

1. Clonez le dépôt Git sur votre machine locale :

    ```bash
    git clone https://github.com/andre-stana/O-ZONE.git
    cd O-ZONE
    ```

2. Créez un fichier [.env](http://_vscodecontentref_/0) dans les répertoires [backend](http://_vscodecontentref_/1) et [frontend](http://_vscodecontentref_/2) en utilisant les exemples fournis (`.env.example`).

3. Installez les dépendances pour le frontend et le backend :

    ```bash
    cd frontend
    npm install
    cd ../backend
    npm install
    ```

### Lancer le projet

Pour lancer le projet, suivez les étapes ci-dessous :

1. Assurez-vous que Docker et Docker Compose sont installés et en cours d'exécution.

2. Lancez les conteneurs Docker :

    ```bash
    docker compose -f dev.docker-compose.yml up --build
    ```

3. Accédez à l'application via votre navigateur à l'adresse suivante :

    ```
    http://<votre-ip>:8081
    ```

### Dépendances

Le projet utilise les dépendances suivantes :

- Backend :
  - TypeScript
  - Express
  - PostgreSQL
  - Prisma ORM
  - JsonWebToken

- Frontend :
  - React


- App :
  - Swift


### Aide

Pour toute aide ou problème, vous pouvez consulter la documentation ou contacter les auteurs du projet.

## Auteurs

- Guillian Tissier - [guillian.tissier@epitech.eu](mailto:guillian.tissier@epitech.eu)
- Nathan Couturier - [nathan.couturier@epitech.eu](mailto:nathan.couturier@epitech.eu)
- Andre Stana - [andre.stana@epitech.eu](mailto:andre.stana@epitech.eu)
- Enzo Cesaretti - [enzo.cesaretti@epitech.eu](mailto:enzo.cesaretti@epitech.eu)
- Baptiste Rachez - [baptiste.rachez@epitech.eu](mailto:baptiste.rachez@epitech.eu)

## Historique des versions

- 0.0
  - Initialisation du projet
- 0.1
  - Première version fonctionnelle

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](/LICENSE) pour plus de détails.

## Remerciements

Nous tenons à remercier tous ceux qui ont contribué à ce projet, ainsi que nos professeurs et mentors pour leur soutien et leurs conseils.
