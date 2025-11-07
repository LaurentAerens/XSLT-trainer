# Development Setup Guide

This guide will help you set up your local development environment for the XSLT Trainer application.

## Prerequisites

Make sure you have the following installed:

### Required
- **.NET 8.0 SDK or later**: [Download](https://dotnet.microsoft.com/download)
- **Node.js 20 or later**: [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git**: [Download](https://git-scm.com/)

### Optional but Recommended
- **Visual Studio Code**: [Download](https://code.visualstudio.com/)
- **Visual Studio 2022** (for C# development): [Download](https://visualstudio.microsoft.com/)
- **Docker Desktop** (for containerized development): [Download](https://www.docker.com/products/docker-desktop)

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/LaurentAerens/XSLT-trainer.git
cd XSLT-trainer
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend/XsltTrainer.Api

# Restore dependencies
dotnet restore

# Build the project
dotnet build

# Run the API (starts on http://localhost:5000)
dotnet run
```

The API will be available at:
- HTTP: `http://localhost:5000`
- HTTPS: `https://localhost:5001`
- Swagger UI: `http://localhost:5000/swagger`

### 3. Frontend Setup

Open a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server (starts on http://localhost:5173)
npm run dev
```

The React app will be available at `http://localhost:5173`

## Development Workflow

### Running Both Services

**Option 1: Using Docker Compose (Recommended)**

```bash
# From the root directory
docker-compose up
```

This will start both the backend and frontend services in containers.

**Option 2: Manual (Two Terminal Windows)**

Terminal 1 - Backend:
```bash
cd backend/XsltTrainer.Api
dotnet run
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

### Making Changes

#### Backend Changes

1. Make your changes in the `backend/XsltTrainer.Api` directory
2. The application will hot-reload automatically with `dotnet watch run`
3. Test your changes using Swagger UI or the frontend

```bash
# To run with hot reload
dotnet watch run
```

#### Frontend Changes

1. Make your changes in the `frontend/src` directory
2. Vite will automatically hot-reload your changes
3. Test in the browser

### Building for Production

#### Backend

```bash
cd backend/XsltTrainer.Api
dotnet publish -c Release -o ./publish
```

The compiled application will be in the `publish` folder.

#### Frontend

```bash
cd frontend
npm run build
```

The production-ready files will be in the `dist` folder.

## Project Structure

```
XSLT-trainer/
├── backend/
│   └── XsltTrainer.Api/
│       ├── Controllers/         # API endpoints
│       ├── Models/             # Data models
│       ├── Services/           # Business logic
│       ├── Program.cs          # Application entry point
│       └── appsettings.json    # Configuration
│
├── frontend/
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── ExerciseList.jsx
│   │   │   └── XsltEditor.jsx
│   │   ├── services/          # API clients
│   │   │   └── api.js
│   │   ├── App.jsx            # Main component
│   │   └── main.jsx           # Entry point
│   ├── public/                # Static assets
│   └── package.json           # Dependencies
│
├── .github/workflows/         # CI/CD pipelines
├── docker-compose.yml         # Docker configuration
└── README.md                  # Main documentation
```

## Testing

### Backend Tests

```bash
cd backend/XsltTrainer.Api
dotnet test
```

### Frontend Tests

```bash
cd frontend
npm test
```

### Linting

#### Backend
```bash
cd backend/XsltTrainer.Api
dotnet format
```

#### Frontend
```bash
cd frontend
npm run lint
```

## Common Development Tasks

### Adding a New Exercise

Edit `backend/XsltTrainer.Api/Services/ExerciseService.cs`:

```csharp
new Exercise
{
    Id = 4,
    Title = "Your Exercise Title",
    Description = "Description of the exercise",
    DifficultyLevel = "Beginner|Intermediate|Advanced",
    InputXml = @"<?xml version=""1.0""?>...",
    ExpectedOutput = @"<?xml version=""1.0""?>...",
    Hints = "Optional hints for the user"
}
```

### Adding a New API Endpoint

1. Create or modify a controller in `backend/XsltTrainer.Api/Controllers/`
2. Add the corresponding service method if needed
3. Update the frontend service in `frontend/src/services/api.js`
4. Use the endpoint in your React components

### Adding a New React Component

1. Create component file in `frontend/src/components/`
2. Create corresponding CSS file
3. Import and use in your App or other components

## Environment Variables

### Backend (Optional)

Create `backend/XsltTrainer.Api/appsettings.Development.json`:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  }
}
```

### Frontend

The frontend uses Vite's environment variables. Create `.env.local`:

```env
VITE_API_URL=http://localhost:5000
```

Access in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

## Debugging

### Backend (Visual Studio)

1. Open `backend/XsltTrainer.Api/XsltTrainer.Api.csproj` in Visual Studio
2. Press F5 to start debugging
3. Set breakpoints in your code

### Backend (VS Code)

1. Open the backend folder in VS Code
2. Install C# extension
3. Press F5 and select ".NET Core Launch (web)"
4. Set breakpoints in your code

### Frontend (Browser DevTools)

1. Open the application in your browser
2. Press F12 to open Developer Tools
3. Use the Console, Network, and Sources tabs for debugging

## Troubleshooting

### Port Already in Use

**Backend:**
```bash
# Change port in Properties/launchSettings.json or use:
dotnet run --urls "http://localhost:5001"
```

**Frontend:**
```bash
# Vite will automatically use the next available port
# Or specify in vite.config.js:
server: { port: 3001 }
```

### CORS Errors

Make sure the backend `Program.cs` includes your frontend URL in the CORS policy:

```csharp
policy.WithOrigins("http://localhost:5173", "http://localhost:3000")
```

### npm Install Failures

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### .NET Build Errors

```bash
# Clean and rebuild
dotnet clean
dotnet restore
dotnet build
```

## VS Code Extensions

Recommended extensions for development:

- **C#** (Microsoft)
- **ES7+ React/Redux/React-Native snippets**
- **Prettier - Code formatter**
- **ESLint**
- **Docker**
- **GitLens**

## Additional Resources

- [ASP.NET Core Documentation](https://docs.microsoft.com/aspnet/core/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [XSLT Tutorial](https://www.w3schools.com/xml/xsl_intro.asp)

## Getting Help

- Check the [README.md](README.md) for general information
- Review [AZURE_DEPLOYMENT.md](AZURE_DEPLOYMENT.md) for deployment guidance
- Open an issue on GitHub for bugs or feature requests
- Contact the maintainers

## Next Steps

Once you have your development environment set up:

1. Try running an exercise in the application
2. Make a small change to test your setup
3. Read the codebase to understand the architecture
4. Check out open issues to find something to work on
