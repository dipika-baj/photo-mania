# Photo Mania

A photo sharing app that allows user to create, edit, delete and view photo and caption

## Table of Content

- [Features](#features)
- [Dependencies](#dependencies)
- [API Installation](#api-installation)
- [Run API](#run-api)
- [Installation](#installation)
- [Run](#run)
- [Wireframe](#wireframe)

## Features

1. Register a user
2. Login and Logout
3. Create a post with image and caption
4. Edit, delete, view posts

## Dependencies

- React
- Tailwind
- Node
- Typescript

## API Installation

### Prerequisites

- Node.js needs to be installed on your device
- ESLint extention must be installed on VS Code
- Prettier extention must be installed on VS Code

### Clone the github repository

Clone the backend api repository using the following command:

```
git clone https://github.com/dipika-baj/photo-mania-backend.git
```

### Change the directory

Navigate to the project directory:

```
cd photo-sharing-app
```

### Install all dependencies

Install all required dependencies for api using npm:

```
npm install
```

### Environment

Specify `.env` file as per `.env.example`

| Name        | Value              | Description                            |
| ----------- | ------------------ | -------------------------------------- |
| DB_PORT     | 3000               | The server runs on port 3000           |
| DB_NAME     | database_name      | The name of the database               |
| DB_HOST     | localhost          | The server uses localhost for database |
| DB_USERNAME | localhost_username | Username of the localhost server       |
| DB_PASSWORD | localhost_password | Password of the localhost server       |
| DB_PORT     | 3306               | MySQL runs on port 3306                |
| SECRET      | jwt_secret         | Secret for JWT                         |
| JWT_EXPIRE  | 1                  | Expiry time for the JWT                |

## Run API

Run the backend API

_XAMPP needs to be installed on the device_

```
npm run dev
```

### Clone the github repository for frontend

Clone the repository using the following command:

```
git clone https://github.com/dipika-baj/photo-mania.git
```

### Change the directory

Navigate to the project directory:

```
cd photo-mania
```

### Install all dependencies

Install all required dependencies using npm:

```
npm install
```

## Run

Start the development server with the following command:

```
npm run dev
```

## Wireframe

You can view the wireframe for the app here: [Figma Wireframe](https://www.figma.com/design/GyAw04xNSd6hA1EwL8vlqy/Photo-Sharing?node-id=0-1&t=B8ZpZwuTDUL9XMvz-0).
