# Contributing to XSLT Trainer

Thank you for your interest in contributing to XSLT Trainer! This document provides guidelines for contributing to the project.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## How Can I Contribute?

### Reporting Bugs

Before creating a bug report:
- Check if the issue has already been reported
- Collect information about the bug (steps to reproduce, expected vs actual behavior)
- Include screenshots if applicable

When creating a bug report, include:
- **Title**: A clear and descriptive title
- **Description**: A detailed description of the issue
- **Steps to Reproduce**: Numbered steps to reproduce the behavior
- **Expected Behavior**: What you expected to happen
- **Actual Behavior**: What actually happened
- **Environment**: OS, browser, .NET version, Node.js version
- **Screenshots**: If applicable

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:
- Use a clear and descriptive title
- Provide a detailed description of the suggested enhancement
- Explain why this enhancement would be useful
- List any alternative solutions you've considered

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Make your changes** following the coding guidelines below
3. **Test your changes** thoroughly
4. **Update documentation** if needed
5. **Submit a pull request**

## Development Process

### Setting Up Your Development Environment

See [DEVELOPMENT.md](DEVELOPMENT.md) for detailed setup instructions.

### Branching Strategy

- `main`: Production-ready code
- `feature/*`: New features
- `bugfix/*`: Bug fixes
- `hotfix/*`: Urgent production fixes

Example:
```bash
git checkout -b feature/add-advanced-exercises
git checkout -b bugfix/fix-xslt-transformation-error
```

### Coding Guidelines

#### C# Backend

- Follow [Microsoft C# Coding Conventions](https://docs.microsoft.com/dotnet/csharp/fundamentals/coding-style/coding-conventions)
- Use meaningful variable and method names
- Add XML documentation comments for public APIs
- Keep methods focused and concise
- Use async/await for asynchronous operations
- Handle exceptions appropriately

Example:
```csharp
/// <summary>
/// Transforms XML using the provided XSLT template.
/// </summary>
/// <param name="request">The transformation request containing XML and XSLT.</param>
/// <returns>The transformation result.</returns>
public XsltTransformResponse Transform(XsltTransformRequest request)
{
    // Implementation
}
```

#### JavaScript/React Frontend

- Follow [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- Use functional components with hooks
- Keep components small and focused
- Use meaningful component and variable names
- Add PropTypes or TypeScript types (if applicable)
- Extract reusable logic into custom hooks

Example:
```javascript
// Good
function ExerciseCard({ exercise, onSelect }) {
  const handleClick = () => onSelect(exercise);
  
  return (
    <div className="exercise-card" onClick={handleClick}>
      <h3>{exercise.title}</h3>
      <p>{exercise.description}</p>
    </div>
  );
}

// Avoid
function Card({ e }) {
  return <div onClick={() => doStuff(e)}>{e.t}</div>;
}
```

#### CSS

- Use clear, descriptive class names
- Follow BEM naming convention when appropriate
- Keep selectors simple and performant
- Group related properties together
- Use CSS variables for common values

Example:
```css
.exercise-list {
  padding: 20px;
}

.exercise-list__item {
  border: 1px solid #ddd;
  border-radius: 8px;
}

.exercise-list__item--selected {
  border-color: #007bff;
}
```

### Testing

#### Backend Tests

```bash
cd backend/XsltTrainer.Api
dotnet test
```

Write unit tests for:
- Services
- Controllers
- Complex business logic

#### Frontend Tests

```bash
cd frontend
npm test
```

Write tests for:
- Components
- Utility functions
- API service layer

### Commit Messages

Write clear and meaningful commit messages:

```
feat: add advanced XSLT exercises
fix: correct XML transformation error handling
docs: update deployment guide
style: format code according to guidelines
refactor: simplify exercise service logic
test: add tests for XSLT transformation
chore: update dependencies
```

Format:
```
<type>: <subject>

<body>

<footer>
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Pull Request Process

1. **Update your branch** with the latest changes from main:
   ```bash
   git checkout main
   git pull origin main
   git checkout your-feature-branch
   git rebase main
   ```

2. **Ensure all tests pass**:
   ```bash
   # Backend
   cd backend/XsltTrainer.Api && dotnet test
   
   # Frontend
   cd frontend && npm test && npm run lint
   ```

3. **Update documentation** if you've changed APIs or added features

4. **Create the pull request**:
   - Use a clear title describing the change
   - Fill out the pull request template
   - Link any related issues
   - Add screenshots for UI changes
   - Request review from maintainers

5. **Address review feedback**:
   - Make requested changes
   - Push updates to your branch
   - Re-request review when ready

## Adding New Features

### Adding a New Exercise

1. Add the exercise to `backend/XsltTrainer.Api/Services/ExerciseService.cs`
2. Test the exercise works correctly
3. Add documentation if the exercise introduces new concepts

### Adding a New API Endpoint

1. Create or update the controller
2. Add the corresponding service method
3. Update the frontend API service
4. Add tests
5. Update API documentation

### Adding a New React Component

1. Create the component file
2. Create the corresponding CSS file
3. Write tests
4. Update the parent component
5. Document any new props or usage patterns

## Project-Specific Guidelines

### XSLT Exercises

When adding XSLT exercises:
- Ensure the XSLT is valid and well-formed
- Provide clear, educational examples
- Include helpful hints
- Test with various inputs
- Document any XSLT-specific features used

### UI/UX Changes

For UI changes:
- Follow the existing design patterns
- Ensure responsiveness on mobile devices
- Test in multiple browsers
- Provide screenshots in the PR
- Consider accessibility

### API Changes

For API changes:
- Maintain backward compatibility when possible
- Update API documentation
- Version the API if making breaking changes
- Update the frontend to use new endpoints

## Questions?

If you have questions:
- Check existing documentation
- Look for similar issues or pull requests
- Ask in a new issue with the "question" label
- Reach out to the maintainers

## Recognition

Contributors will be recognized in the project's README and release notes.

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

Thank you for contributing to XSLT Trainer! 🎉
