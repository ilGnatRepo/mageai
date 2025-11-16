# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Mage is an open-source, self-hosted development environment for building, running, and managing data pipelines. It provides a notebook-style UI for writing modular code in Python, SQL, or R. The project is designed for local development and can be scaled to a production environment with Mage Pro.

## Common Development Commands

### Local Environment Setup

1.  **Set up the Poetry virtual environment:**
    ```bash
    make dev_env
    ```

2.  **Start the development environment using Docker Compose:**
    The main script for running the development environment is `scripts/dev.sh`. It accepts a project name and various optional flags to configure the environment.

    ```bash
    ./scripts/dev.sh your_project_name
    ```

### Running Tests and Linters

The `scripts/test.sh` script runs a suite of checks, including linting for both frontend and backend code, as well as running frontend tests. It operates on files that have changed compared to the `master` branch.

```bash
./scripts/test.sh
```

This command will:
- Run `prettier` and `eslint` on changed JavaScript/TypeScript files.
- Run frontend tests using `yarn install_and_test`.
- Run `pre-commit` hooks (which include tools like `black` and `flake8`) on changed Python files.

## High-Level Architecture

### Technology Stack

-   **Backend**: Python, using Poetry for dependency management. The backend server is a `tornado` application.
-   **Frontend**: A React-based application located in `mage_ai/frontend/`. It uses `yarn` for package management.
-   **Development Environment**: Docker Compose is used to orchestrate the services needed for local development, including the backend server, the frontend application, and a database.

### Development Workflow

The development workflow is heavily reliant on Docker. The `scripts/dev.sh` script is the primary entry point for starting the development environment. It uses `docker-compose.yml` to spin up the necessary services. This ensures a consistent development environment across different machines.

### Key Directories

-   `mage_ai/`: Contains the core Python application code.
    -   `mage_ai/server/`: The backend server code.
    -   `mage_ai/frontend/`: The frontend React application source code.
-   `scripts/`: A collection of shell scripts for development, testing, and deployment.
-   `docker-compose.yml`: Defines the services, networks, and volumes for the local development environment.
