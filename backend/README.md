

# Express.js Backend

This is a backend application built with Express.js, running on port 7000. The application uses nodemon for development to automatically restart the server on file changes.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Environment Variables](#environment-variables)
- [Security](#security)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/vimal20002/vooshAssignment.git
   cd vooshAssignment
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

1. Start the server with nodemon:
   ```bash
   nodemon
   ```

   The server will start on `http://localhost:7000`.

## Endpoints

Here are some example endpoints:

- `GET /todos` - Get all todos
- `POST /todos` - Create a new todo
- `GET /todos/:id` - Get a specific todo by ID
- `PATCH /todos/:id` - Update a specific todo by ID
- `DELETE /todos/:id` - Delete a specific todo by ID
- `POST /auth/login` - For logging in 
- `POST /auth/signup` - For createing a new user
- `POST /auth/google` - To validate google token


## Environment Variables

I Have Provided .env
## Security

To enhance the security of your application, consider the following measures:

- Use `helmet` to set various HTTP headers for security.
- Use `xss-clean` to sanitize user input and prevent XSS attacks.
- Validate and sanitize all user inputs.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
