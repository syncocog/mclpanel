# Contributing to MCLEGENDS.GG

Thank you for your interest in contributing! This guide will help you get started.

## Development Setup

1. Fork the repository
2. Clone your fork
3. Install dependencies
4. Create a feature branch
5. Make your changes
6. Submit a pull request

## Code Style

### Backend (TypeScript/NestJS)
- Use ESLint configuration provided
- Follow NestJS best practices
- Use dependency injection
- Write unit tests for services

### Frontend (TypeScript/React)
- Use functional components
- Follow React hooks patterns
- Use Tailwind CSS for styling
- Keep components small and focused

### Daemon (Go)
- Follow Go conventions
- Use gofmt for formatting
- Write idiomatic Go code
- Handle errors properly

## Commit Messages

Use conventional commits:
```
feat: add new feature
fix: bug fix
docs: documentation changes
style: formatting changes
refactor: code refactoring
test: add tests
chore: maintenance tasks
```

## Pull Request Process

1. Update documentation
2. Add tests for new features
3. Ensure all tests pass
4. Update CHANGELOG.md
5. Request review from maintainers

## Testing

Run tests before submitting:
```bash
# Backend
cd backend && npm test

# Frontend
cd frontend && npm test

# Daemon
cd daemon && go test ./...
```

## Questions?

Open an issue or join our Discord community.
