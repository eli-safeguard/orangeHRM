README

## Setup
1. If necessary, install an IDE like VS Code
    - https://code.visualstudio.com/download
2. If necessary, install NodeJS version 18
    - https://nodejs.org/en/download
3. Clone the repository
4. Open the project in your IDE 
5. In a terminal in your IDE, run "npm init playwright@latest"
    - answer questions: use Typescript, rest accept the default answer
6. Next, "npm install"

## Running tests
1. Run "npm test" (for headless execution)
    - Assuming all tests pass, run "npx playwright show-report" to generate a report.
2. To watch tests run step-by-step, "npm test -- --debug"