# XSLT-trainer

An interactive XSLT training application designed to help users learn XSLT transformations through hands-on exercises. Built with React frontend and C# .NET API backend, ready for deployment on Azure.

## Features

- **Interactive XSLT Editor**: Write and test XSLT transformations in real-time
- **Practice Exercises**: Multiple exercises with varying difficulty levels
- **Instant Feedback**: See transformation results immediately
- **Side-by-side Comparison**: Compare your output with expected results
- **RESTful API**: Backend API for XSLT transformation and exercise management

## Project Structure

```
XSLT-trainer/
├── backend/                    # C# .NET Web API
│   └── XsltTrainer.Api/
│       ├── Controllers/        # API Controllers
│       ├── Models/            # Data Models
│       ├── Services/          # Business Logic
│       └── Program.cs         # Application entry point
│
├── frontend/                   # React Application
│   ├── src/
│   │   ├── components/        # React Components
│   │   ├── services/          # API Service Layer
│   │   └── App.jsx            # Main App Component
│   └── public/                # Static Assets
│
└── README.md
```

## Prerequisites

### Backend
- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0) or later
- Visual Studio 2022 or Visual Studio Code (optional)

### Frontend
- [Node.js](https://nodejs.org/) (v18 or later)
- npm (comes with Node.js)

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend/XsltTrainer.Api
```

2. Restore dependencies:
```bash
dotnet restore
```

3. Run the API:
```bash
dotnet run
```

The API will start at `https://localhost:5001` (or `http://localhost:5000`)

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will open at `http://localhost:5173`

## API Endpoints

### Exercises
- `GET /api/exercises` - Get all exercises
- `GET /api/exercises/{id}` - Get a specific exercise

### XSLT Transformation
- `POST /api/xslt/transform` - Transform XML using XSLT
  ```json
  {
    "xmlInput": "<xml>...</xml>",
    "xsltTemplate": "<xsl:stylesheet>...</xsl:stylesheet>"
  }
  ```

## Deployment to Azure

### Backend Deployment (Azure App Service)

1. Create an Azure App Service:
```bash
az webapp create --resource-group <resource-group> --plan <app-service-plan> --name <app-name> --runtime "DOTNET|8.0"
```

2. Deploy the API:
```bash
cd backend/XsltTrainer.Api
dotnet publish -c Release
# Use Azure Portal or Azure CLI to deploy the published files
```

### Frontend Deployment (Azure Static Web Apps)

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Deploy to Azure Static Web Apps:
   - Use Azure Portal to create a Static Web App
   - Connect to your GitHub repository
   - Set build configuration:
     - App location: `/frontend`
     - API location: (leave empty or configure separately)
     - Output location: `dist`

Alternatively, use Azure Static Web Apps CLI:
```bash
npm install -g @azure/static-web-apps-cli
swa deploy --app-location ./frontend --output-location dist
```

### Environment Configuration

Update the frontend API base URL in production:
- For Azure deployment, update `frontend/src/services/api.js`
- Set the correct backend URL in the CORS configuration in `backend/XsltTrainer.Api/Program.cs`

## Development

### Backend Development
- The backend uses ASP.NET Core Web API with controllers
- XSLT transformation is handled by the `System.Xml.Xsl` namespace
- Swagger UI is available at `/swagger` in development mode

### Frontend Development
- Built with React 19 and Vite
- Uses modern React hooks (useState, useEffect)
- CSS modules for component styling

## Technologies Used

### Backend
- .NET 8.0
- ASP.NET Core Web API
- System.Xml.Xsl for XSLT processing
- Swagger/OpenAPI

### Frontend
- React 19
- Vite (build tool)
- Modern JavaScript (ES6+)
- CSS3

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the terms specified in the LICENSE file.

## Support

For issues, questions, or contributions, please open an issue in the GitHub repository.
