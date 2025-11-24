# ProjetoApp 

![TypeScript Badge](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React Native Badge](https://img.shields.io/badge/React_Native-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Node.js Badge](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)

## 📌 Overview

This repository contains the source code for **ProjetoApp**, a comprehensive mobile application designed to facilitate appointment scheduling and management for hairdressers, barbers, and beauty professionals. This project was initially developed as a semester project for an academic course, focusing on implementing new programming languages and technologies, primarily leveraging the power of TypeScript for mobile development.

The application is structured into a client-side (mobile) component built with React Native and a server-side (backend) component.

## ✨ Features

* **Appointment Scheduling:** Users (clients) can view available slots and book services.
* **Professional Dashboard:** Hairdressers can manage their schedule, confirm appointments, and view client history.
* **Service Catalog:** Display list of services, duration, and pricing.
* **User Authentication:** Secure login and registration for both clients and professionals.
* **Cross-Platform:** Mobile application runs on both Android and iOS devices.

## 💻 Technology Stack

The project utilizes a modern and robust stack for mobile and backend development.

### Frontend (Mobile App)

| Category | Technology |
| :--- | :--- |
| Framework | **React Native** |
| Language | **TypeScript** / JavaScript |
| Platform Support | Android (using Kotlin) and iOS (using Swift) |
| Environment |  Expo |

### Backend (API/Server)

| Category | Technology |
| :--- | :--- |
| Runtime | **Node.js** |
| Language | JavaScript/TypeScript |
| Framework | *(Express, NestJS)* |
| Database | *(PostgreSQL)* |

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have the following installed on your system:

* [Node.js](https://nodejs.org/) (LTS version recommended)
* [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)
* [Git](https://git-scm.com/)
* Mobile development environment (e.g., Android Studio and Xcode for native setups, or [Expo CLI](https://docs.expo.dev/get-started/installation/) for a managed workflow).

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Weslleyqueiroz/ProjetoApp.git](https://github.com/Weslleyqueiroz/ProjetoApp.git)
    cd ProjetoApp
    ```

2.  **Install dependencies for the Server (Backend):**
    ```bash
    cd server
    npm install  # or yarn install
    ```

3.  **Install dependencies for the Mobile App (Frontend):**
    ```bash
    cd .. # Go back to the root directory
    npm install  # or yarn install
    ```

4.  **Configure Environment Variables:**
    Create a `.env` file in the root directory and the `server` directory with your database and API configurations.

    *Example (`.env` in root directory for the client):*
    ```
    API_URL=http://<YOUR_LOCAL_IP>:3333/
    ```

### Running the Project

#### 1. Start the Backend Server

Navigate to the `server` directory and run the start command (the exact command may vary):

```bash
cd server
npm run dev # or equivalent start script
