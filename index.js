import express from 'express';
import pg from 'pg';
import axios from 'axios';
import env from 'dotenv';
//install express pg ejs axios
env.config();
const app = express();
const port = 3000;

const username=process.env.USERNAME; //enter the username using the appbrewery website https://secrets-api.appbrewery.com/
const password=process.env.PASSWORD; //enter the password using the appbrewery website https://secrets-api.appbrewery.com/
const apiKey=process.env.API_KEY; //enter the api key using the appbrewery website https://secrets-api.appbrewery.com/
const bearerToken=process.env.BEARER_TOKEN; //enter the bearer token using the appbrewery website https://secrets-api.appbrewery.com/

//use ejs
app.set('view engine', 'ejs');
app.use(express.static("public")); //to apply css 

// Default route handler
app.get('/', async (req, res) => {
  const welcomeMessage = {
    title: "Welcome to API Authentication Explorer",
    message: "This application demonstrates different authentication methods used in modern web APIs.",
    instructions: "Click on any authentication method button above to see it in action.",
    authMethods: [
      { name: "No Auth", description: "Access public endpoints without any credentials" },
      { name: "Basic Auth", description: "Use username/password for authentication" },
      { name: "API Key", description: "Access resources using a unique key" },
      { name: "Bearer Token", description: "Use token-based authentication for secure access" }
    ]
  };
  
  res.render("index.ejs", { content: JSON.stringify(welcomeMessage, null, 2) });
});

// No Authentication endpoint
app.get('/noAuth', async (req, res) => {
  try {
    console.log("🔓 Accessing endpoint with No Authentication");
    const response = await axios.get('https://secrets-api.appbrewery.com/random');
    
    const formattedData = {
      status: "Success",
      authType: "No Authentication",
      timestamp: new Date().toISOString(),
      data: response.data
    };
    
    res.render("index.ejs", { content: JSON.stringify(formattedData, null, 2) });  
    console.log("✅ No Auth request successful");
  } catch (error) {
    console.error('❌ Error in No Auth request:', error.message);
    handleApiError(res, error, "No Authentication");
  }
});

// Basic Authentication endpoint
app.get('/basicAuth', async (req, res) => {
  try {
    console.log("🔐 Accessing endpoint with Basic Authentication");
    console.log(`Using credentials: ${username}:******`);
    
    const response = await axios.get('https://secrets-api.appbrewery.com/all?page=1',{
      auth:{
        username: username,
        password: password
      }
    });
    
    const formattedData = {
      status: "Success",
      authType: "Basic Authentication",
      timestamp: new Date().toISOString(),
      username: username,
      totalSecrets: response.data.length,
      data: response.data
    };
    
    res.render("index.ejs", { content: JSON.stringify(formattedData, null, 2) });
    console.log("✅ Basic Auth request successful");
  } catch (error) {
    console.error('❌ Error in Basic Auth request:', error.message);
    handleApiError(res, error, "Basic Authentication");
  }
});

// API Key Authentication endpoint
app.get('/apiKey', async (req, res) => {
  try {
    console.log("🔑 Accessing endpoint with API Key Authentication");
    console.log(`Using API Key: ${apiKey.substring(0, 8)}...`);
    
    const response = await axios.get('https://secrets-api.appbrewery.com/filter?score=5',{
      params:{
        apiKey: apiKey
      }
    });
    
    const formattedData = {
      status: "Success",
      authType: "API Key Authentication",
      timestamp: new Date().toISOString(),
      keyUsed: `${apiKey.substring(0, 8)}...`,
      resultsFound: response.data.length,
      data: response.data
    };
    
    res.render("index.ejs", { content: JSON.stringify(formattedData, null, 2) });
    console.log("✅ API Key request successful");
  } catch (error) {
    console.error('❌ Error in API Key request:', error.message);
    handleApiError(res, error, "API Key Authentication");
  }
});

// Bearer Token Authentication endpoint
app.get('/bearerToken', async (req, res) => {
  try {
    console.log("👑 Accessing endpoint with Bearer Token Authentication");
    console.log(`Using Bearer Token: ${bearerToken.substring(0, 8)}...`);

    const response = await axios.get('https://secrets-api.appbrewery.com/secrets/2', {
      headers: { 
        Authorization: `Bearer ${bearerToken}` 
      }
    });
    
    const formattedData = {
      status: "Success",
      authType: "Bearer Token Authentication",
      timestamp: new Date().toISOString(),
      tokenUsed: `${bearerToken.substring(0, 8)}...`,
      data: response.data
    };
    
    res.render("index.ejs", { content: JSON.stringify(formattedData, null, 2) });
    console.log("✅ Bearer Token request successful");
  } catch (error) {
    console.error('❌ Error in Bearer Token request:', error.message);
    handleApiError(res, error, "Bearer Token Authentication");
  }
});

// Error handling helper function
function handleApiError(res, error, authType) {
  const errorResponse = {
    status: "Error",
    authType: authType,
    timestamp: new Date().toISOString(),
    error: error.message,
    details: error.response ? {
      status: error.response.status,
      statusText: error.response.statusText,
      data: error.response.data
    } : "No additional error details available"
  };
  
  res.render("index.ejs", { content: JSON.stringify(errorResponse, null, 2) });
}

// Start the server
app.listen(port, () => {
  console.log(`
  🚀 API Authentication Explorer Server
  ====================================
  ✅ Server running at http://localhost:${port}
  📝 Available endpoints:
    - / (Home)
    - /noAuth (No Authentication)
    - /basicAuth (Basic Authentication)
    - /apiKey (API Key Authentication)
    - /bearerToken (Bearer Token Authentication)
  ====================================
  `);
});