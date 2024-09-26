# Contributor Guide

Welcome to the **@formsible/element** repository! We're thrilled that you're interested in contributing to our project. This guide will walk you through how you can help improve the project, report issues, submit pull requests, and more.

## Table of Contents
1. [Getting Started](#getting-started)
2. [How to Contribute](#how-to-contribute)
   - [Reporting Bugs](#reporting-bugs)
   - [Suggesting Features](#suggesting-features)
   - [Submitting Pull Requests](#submitting-pull-requests)
3. [Code Guidelines](#code-guidelines)
   - [Coding Style](#coding-style)
   - [Commit Messages](#commit-messages)
4. [Testing](#testing)
5. [Release Process](#release-process)
6. [Communication](#communication)
7. [Code of Conduct](#code-of-conduct)

---

## Getting Started

Before you begin contributing, make sure you have the following setup on your local machine:

1. **Node.js**: We recommend using the latest LTS version. Download it from [Node.js](https://nodejs.org).
2. **NPM**: Node.js comes with NPM by default, but you can upgrade it to the latest version using `npm install -g npm`.

### Clone the Repository

Fork the repository on GitHub and clone it locally using:

```bash
git clone https://github.com/formsible/element.git
cd element
```

### Install Dependencies

Once you've cloned the repository, install the project dependencies by running:

```bash
npm install
```

### Development Setup

You can start the development server or build the project using the following commands:

```bash
# Start the development server
npm run serve

# Build the project
npm run build

# Run the tests
npm run test
```

---

## How to Contribute

There are several ways you can contribute to the project:

### Reporting Bugs

If you find a bug, please file an issue. When reporting a bug, please include the following:

- **Clear description** of the issue.
- **Steps to reproduce** the issue.
- The expected behavior versus what happened.
- The version of the project you are using.

Create a bug report [here](https://github.com/formsible/element/issues).

### Suggesting Features

We encourage you to suggest new features! Please describe:

- The feature or enhancement you're proposing.
- Why this feature would be useful.
- Any possible alternatives you've considered.

Create a feature request [here](https://github.com/formsible/element/issues).

### Submitting Pull Requests

We love receiving pull requests! If you plan to contribute code, here are some steps to follow:

1. **Fork the repo** and create your feature branch from `main`:
   ```bash
   git checkout -b feature/your-feature
   ```

2. **Make changes** in your forked repository. Follow the [Code Guidelines](#code-guidelines) to maintain code quality.
   
3. **Run tests** to ensure everything works:
   ```bash
   npm run test
   ```

4. **Commit your changes**:
   ```bash
   git commit -m "Add a brief description of your changes"
   ```

5. **Push your branch** to GitHub:
   ```bash
   git push origin feature/your-feature
   ```

6. **Submit a pull request** to the `main` branch of the original repository. Reference any related issues in your PR description. Your pull request will be reviewed, and feedback may be provided.

---

## Code Guidelines

To maintain a clean and consistent codebase, please follow these guidelines.

### Coding Style

- **ESLint**: We use ESLint to enforce JavaScript style rules. Run `npm run lint` before committing your changes.
- **Prettier**: The code should be formatted using Prettier. Install and configure Prettier in your editor to auto-format code.

Some general style tips:
- Use `camelCase` for variables and functions.
- Use `PascalCase` for Vue components.
- Keep functions small and focused.
- Prefer modern ES6+ syntax (e.g., arrow functions, destructuring, etc.).

### Commit Messages

Commit messages should be concise but descriptive. Use the following format for your commit messages:

```
<type>(<scope>): <short summary>
```

Example commit message types:
- **feat**: A new feature.
- **fix**: A bug fix.
- **docs**: Documentation updates.
- **style**: Code formatting, no logic change.
- **refactor**: Code changes that neither fix a bug nor add a feature.

Example:
```
feat(button): add loading spinner to submit button
```

---

## Testing

Before submitting a pull request, ensure that all existing tests pass and that new features or fixes are covered by tests.

1. Run all tests:
   ```bash
   npm run test
   ```

2. If you are fixing a bug or adding a feature, include unit or integration tests for it.

3. We use **Jest** for unit testing. You can find the test files in the `tests/` folder.

---

## Release Process

We use automated publishing via GitHub Actions. After merging pull requests into the `main` branch, our CI/CD pipeline will run tests and, if successful, publish the package to NPM.

You don’t need to worry about publishing the package manually.

---

## Communication

Feel free to reach out to the maintainers or fellow contributors in the following ways:

- **GitHub Discussions**: [formsible.com]
- **Slack/Discord/Forum**: [formsible.com]
- **Email**: [xinchao@formsible.com]

---

## Code of Conduct

To ensure a welcoming environment for all contributors, please adhere to our [Code of Conduct](./CODE_OF_CONDUCT.md). We have a zero-tolerance policy towards harassment, discrimination, and disrespectful behavior.

---

## Thank You!

Thank you for considering contributing to **@formsible/element**. Your support and contributions help us improve the project and make it better for everyone!

