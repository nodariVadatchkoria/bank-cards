# Contributing to Bank Cards Catalog

Thank you for your interest in contributing to the Bank Cards Catalog! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn
- Git

### Development Setup

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/bank-cards.git
   cd bank-cards
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📋 How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in the [Issues](https://github.com/yourusername/bank-cards/issues) section
2. If not, create a new issue with:
   - A clear, descriptive title
   - Steps to reproduce the bug
   - Expected vs actual behavior
   - Screenshots if applicable
   - Browser and OS information

### Suggesting Features

1. Check if the feature has already been suggested
2. Create a new issue with:
   - A clear, descriptive title
   - Detailed description of the feature
   - Use cases and benefits
   - Mockups or examples if applicable

### Code Contributions

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the existing code style
   - Add comments for complex logic
   - Update documentation if needed

3. **Test your changes**
   ```bash
   npm run build
   npm run lint
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add: brief description of your changes"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Provide a clear description of your changes
   - Reference any related issues
   - Include screenshots if applicable

## 🎨 Code Style Guidelines

### TypeScript
- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid `any` type when possible

### React Components
- Use functional components with hooks
- Follow the existing naming conventions
- Keep components focused and reusable

### Styling
- Use inline styles for component-specific styling
- Follow the existing design patterns
- Ensure responsive design

### File Organization
- Keep related files together
- Use descriptive file and folder names
- Follow the existing project structure

## 🧪 Testing

### Manual Testing
- Test all CRUD operations (Create, Read, Update, Delete)
- Test responsive design on different screen sizes
- Test with different browsers
- Test error scenarios

### Code Quality
- Run `npm run lint` to check for code style issues
- Run `npm run build` to ensure the project builds successfully
- Ensure all TypeScript types are properly defined

## 📝 Documentation

### Code Documentation
- Add JSDoc comments for complex functions
- Include inline comments for non-obvious logic
- Update README.md if you add new features

### API Documentation
- Document any new API endpoints
- Include request/response examples
- Update the API section in README.md

## 🐛 Bug Fixes

### Priority Levels
1. **Critical**: Security vulnerabilities, data loss, app crashes
2. **High**: Major functionality broken, UI completely unusable
3. **Medium**: Minor functionality issues, UI inconsistencies
4. **Low**: Cosmetic issues, minor improvements

### Fix Process
1. Identify the root cause
2. Write a test case that reproduces the bug
3. Implement the fix
4. Ensure all tests pass
5. Update documentation if needed

## ✨ Feature Development

### Feature Planning
1. Discuss the feature in an issue first
2. Get approval from maintainers
3. Create a detailed implementation plan
4. Break down into smaller tasks if needed

### Implementation
1. Start with the core functionality
2. Add proper error handling
3. Include responsive design
4. Add appropriate tests
5. Update documentation

## 🔄 Pull Request Process

### Before Submitting
- [ ] Code follows the project's style guidelines
- [ ] All tests pass
- [ ] Documentation is updated
- [ ] No console errors or warnings
- [ ] Responsive design is maintained

### PR Description Template
```markdown
## Description
Brief description of the changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Manual testing completed
- [ ] All existing tests pass
- [ ] New tests added (if applicable)

## Screenshots
Include screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (or documented)
```

## 📞 Getting Help

### Communication Channels
- GitHub Issues for bug reports and feature requests
- GitHub Discussions for general questions
- Pull Request comments for code review discussions

### Response Times
- Critical bugs: Within 24 hours
- Feature requests: Within 1 week
- General questions: Within 3 days

## 🏆 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- GitHub contributors page

## 📜 Code of Conduct

### Our Pledge
We are committed to providing a welcoming and inclusive environment for all contributors.

### Expected Behavior
- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Respect different viewpoints

### Unacceptable Behavior
- Harassment or discrimination
- Personal attacks
- Spam or off-topic discussions
- Any other unprofessional conduct

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Bank Cards Catalog! 🎴
