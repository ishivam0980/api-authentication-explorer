# API Authentication Explorer

A modern, interactive web application that demonstrates four common API authentication methods used in web development. This project serves as both a learning tool and a reference implementation for understanding different authentication approaches.

## 🚀 Features

- **Interactive UI**: Clean, modern interface with responsive design
- **Multiple Authentication Methods**: Demonstrates four different auth techniques
- **Real API Integration**: Makes actual API calls to demonstrate authentication
- **Detailed Responses**: Formatted JSON responses for easy readability
- **Error Handling**: Comprehensive error handling with detailed error information

## 🔐 Authentication Methods Demonstrated

1. **No Authentication** - Public endpoints with unrestricted access
2. **Basic Authentication** - Username/password authentication using Base64 encoding
3. **API Key Authentication** - Access using a unique API key in query parameters
4. **Bearer Token Authentication** - Token-based authentication in the Authorization header

## 🛠️ Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: EJS templating, CSS3, Font Awesome
- **HTTP Requests**: Axios
- **Database Interface**: pg (PostgreSQL client)

## 📋 Prerequisites

- Node.js (v14.x or higher)
- npm (v6.x or higher)
- API credentials from the AppBrewery Secrets API

## 🔧 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ishivam0980/api-authentication-explorer.git
   cd api-authentication-explorer
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Create API credentials:

   - Visit [https://secrets-api.appbrewery.com/](https://secrets-api.appbrewery.com/)
   - Register for an account
   - Generate your unique credentials (username, password, API key, and bearer token)
4. Create a `.env` file in the root directory with your credentials:

   ```
   USERNAME="your_username"
   PASSWORD="your_password"
   API_KEY="your_api_key"
   BEARER_TOKEN="your_bearer_token"
   ```
5. Start the application:

   ```bash
   npm start
   ```

   For development with automatic restart:

   ```bash
   nodemon index.js
   ```
6. Open your browser and navigate to:

   ```
   http://localhost:3000
   ```

## 🧩 Project Structure

```
api-authentication-explorer/
├── index.js           # Main application file with route handlers
├── package.json       # Project dependencies and scripts
├── .env               # Environment variables for API credentials
├── public/            # Static assets (CSS, client-side JS)
└── views/
    └── index.ejs      # Main view template with UI components
```

## 🔍 How It Works

Each authentication method is implemented as a separate route in the Express application:

- **`/`** - Home route with welcome information
- **`/noAuth`** - Demonstrates API access without authentication
- **`/basicAuth`** - Shows how to use Basic Authentication
- **`/apiKey`** - Demonstrates API Key authentication in query parameters
- **`/bearerToken`** - Shows Bearer Token authentication in headers

## 🧪 Testing the Authentication Methods

1. Click on the **No Auth** button to access a public endpoint
2. Try the **Basic Auth** button to use username/password authentication
3. Use the **API Key** button to see API Key authentication in action
4. Click the **Bearer Token** button to demonstrate token-based authentication

## 📚 Learning Resources

- [MDN Web Docs: HTTP Authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication)
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [JWT.io - JSON Web Tokens](https://jwt.io/)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 Notes

- This application uses real API calls to the AppBrewery Secrets API
- Each authentication method demonstrates a different way to secure endpoints
- Your credentials are stored only in your local .env file and are not shared
