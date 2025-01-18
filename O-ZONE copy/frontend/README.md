# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting Started with Docker

This project supports deployment and development using Docker. Follow these steps to get started:

### Prerequisites
- Docker must be installed and running on your machine.
- Ensure that Docker Compose is available.

### Running the App with Docker

To run the application in a Docker container:
1. Build and start the Docker container:

    ```bash
    docker compose up --build
    ```

    This will:
    - Build the Docker image for the frontend.
    - Start the container and expose the app on [http://localhost:3000](http://localhost:3000).

2. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the app.
3. To stop the application, use:

    ```bash
    docker compose down
    ```

### Notes
- Any code changes will be reflected automatically if the container is configured to mount the local project files.
- If the browser does not open automatically, navigate to [http://localhost:3000](http://localhost:3000) manually.

## Available Scripts (Local Development)

In the project directory, you can also run the following commands locally (without Docker):

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified, and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
