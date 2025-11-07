# Azure Deployment Guide

This guide provides step-by-step instructions for deploying the XSLT Trainer application to Azure.

## Architecture

- **Frontend**: Azure Static Web Apps or Azure App Service (Web App)
- **Backend**: Azure App Service (Web App)
- **Database**: Not required for this application (in-memory data)

## Prerequisites

1. Azure subscription
2. Azure CLI installed (`az --version` to check)
3. GitHub account (for CI/CD)
4. .NET 8.0 SDK
5. Node.js 20+

## Option 1: Azure Static Web Apps + Azure App Service

This is the recommended approach for production deployments.

### Step 1: Deploy Backend API

1. **Create a resource group:**
```bash
az group create --name rg-xslt-trainer --location eastus
```

2. **Create an App Service Plan:**
```bash
az appservice plan create \
  --name plan-xslt-trainer \
  --resource-group rg-xslt-trainer \
  --sku B1 \
  --is-linux
```

3. **Create the Web App:**
```bash
az webapp create \
  --name app-xslt-trainer-api \
  --resource-group rg-xslt-trainer \
  --plan plan-xslt-trainer \
  --runtime "DOTNET|8.0"
```

4. **Deploy the API:**
```bash
cd backend/XsltTrainer.Api
dotnet publish -c Release -o ./publish
cd publish
zip -r ../publish.zip .
cd ..

az webapp deployment source config-zip \
  --resource-group rg-xslt-trainer \
  --name app-xslt-trainer-api \
  --src publish.zip
```

5. **Configure CORS:**
```bash
az webapp cors add \
  --resource-group rg-xslt-trainer \
  --name app-xslt-trainer-api \
  --allowed-origins https://your-static-web-app-url.azurestaticapps.net
```

### Step 2: Deploy Frontend to Azure Static Web Apps

1. **Create Static Web App via Azure Portal:**
   - Go to [Azure Portal](https://portal.azure.com)
   - Search for "Static Web Apps"
   - Click "Create"
   - Select your subscription and resource group
   - Name: `swa-xslt-trainer`
   - Region: Choose closest to your users
   - Deployment source: GitHub
   - Sign in to GitHub and select your repository
   - Build configuration:
     - Build preset: Custom
     - App location: `/frontend`
     - Api location: (leave empty)
     - Output location: `dist`

2. **Update API URL in Frontend:**

Before building, update `frontend/src/services/api.js`:
```javascript
const API_BASE_URL = 'https://app-xslt-trainer-api.azurewebsites.net/api';
```

3. **The GitHub Action will automatically:**
   - Build your frontend
   - Deploy to Azure Static Web Apps
   - Provide a URL like: `https://<random-name>.azurestaticapps.net`

## Option 2: Both as App Services

If you prefer to deploy both frontend and backend as App Services:

### Backend (Same as above)

### Frontend App Service

1. **Create another Web App for Frontend:**
```bash
az webapp create \
  --name app-xslt-trainer-frontend \
  --resource-group rg-xslt-trainer \
  --plan plan-xslt-trainer \
  --runtime "NODE|20-lts"
```

2. **Build and Deploy Frontend:**
```bash
cd frontend
npm install
npm run build

# Create a simple server.js for serving the built app
cat > dist/server.js << 'EOF'
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(__dirname));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on port ${port}`));
EOF

# Add express to package.json dependencies
cd dist
npm init -y
npm install express
zip -r ../frontend.zip .
cd ..

az webapp deployment source config-zip \
  --resource-group rg-xslt-trainer \
  --name app-xslt-trainer-frontend \
  --src frontend.zip
```

## Option 3: Using Docker and Azure Container Instances

1. **Build Docker Images:**
```bash
# Build backend
docker build -t xslt-trainer-api:latest ./backend/XsltTrainer.Api

# Build frontend
docker build -t xslt-trainer-frontend:latest ./frontend
```

2. **Push to Azure Container Registry:**
```bash
# Create ACR
az acr create \
  --resource-group rg-xslt-trainer \
  --name acrxslttrainer \
  --sku Basic

# Login to ACR
az acr login --name acrxslttrainer

# Tag and push images
docker tag xslt-trainer-api:latest acrxslttrainer.azurecr.io/xslt-trainer-api:latest
docker tag xslt-trainer-frontend:latest acrxslttrainer.azurecr.io/xslt-trainer-frontend:latest

docker push acrxslttrainer.azurecr.io/xslt-trainer-api:latest
docker push acrxslttrainer.azurecr.io/xslt-trainer-frontend:latest
```

3. **Deploy using docker-compose or Azure Container Instances**

## Environment Variables

### Backend
- `ASPNETCORE_ENVIRONMENT`: `Production`
- `ASPNETCORE_URLS`: `http://+:8080`

### Frontend
Update the API URL in the code or use environment variables during build.

## Setting up CI/CD with GitHub Actions

The repository includes GitHub Actions workflows:

1. **Backend CI/CD** (`.github/workflows/backend-ci-cd.yml`)
   - Builds and tests the .NET application
   - Creates deployment artifact
   - (Uncomment deployment section when ready)

2. **Frontend CI/CD** (`.github/workflows/frontend-ci-cd.yml`)
   - Installs dependencies
   - Runs linter
   - Builds the React application
   - (Uncomment deployment section when ready)

### Configure Secrets

Add these secrets to your GitHub repository:

1. **For App Service deployment:**
   - `AZURE_WEBAPP_PUBLISH_PROFILE`: Download from Azure Portal → App Service → Get Publish Profile

2. **For Static Web Apps:**
   - `AZURE_STATIC_WEB_APPS_API_TOKEN`: Automatically created when you set up Static Web App

## Monitoring and Logging

1. **Enable Application Insights:**
```bash
az monitor app-insights component create \
  --app app-xslt-trainer-insights \
  --location eastus \
  --resource-group rg-xslt-trainer
```

2. **Connect to App Service:**
```bash
INSIGHTS_KEY=$(az monitor app-insights component show \
  --app app-xslt-trainer-insights \
  --resource-group rg-xslt-trainer \
  --query instrumentationKey -o tsv)

az webapp config appsettings set \
  --name app-xslt-trainer-api \
  --resource-group rg-xslt-trainer \
  --settings APPLICATIONINSIGHTS_CONNECTION_STRING="InstrumentationKey=$INSIGHTS_KEY"
```

## Cost Optimization

- **Free Tier Options:**
  - Azure Static Web Apps: 100 GB bandwidth/month free
  - App Service: F1 (Free) tier available but with limitations
  
- **Recommended Starting Tier:**
  - App Service Plan: B1 (Basic) - ~$13/month
  - Can scale up/down based on usage

## Troubleshooting

### Backend not responding
- Check App Service logs: `az webapp log tail --name app-xslt-trainer-api --resource-group rg-xslt-trainer`
- Verify .NET runtime version
- Check CORS settings

### Frontend can't reach backend
- Verify API URL is correct
- Check CORS configuration on backend
- Ensure both apps are running

### Build failures
- Check GitHub Actions logs
- Verify all dependencies are correctly specified
- Ensure .NET and Node.js versions match

## Next Steps

1. Set up custom domain
2. Configure SSL/TLS certificates
3. Implement authentication (Azure AD B2C)
4. Add Application Insights for monitoring
5. Set up Azure DevOps for more advanced CI/CD

## Support

For issues with Azure deployment, consult:
- [Azure App Service documentation](https://docs.microsoft.com/azure/app-service/)
- [Azure Static Web Apps documentation](https://docs.microsoft.com/azure/static-web-apps/)
