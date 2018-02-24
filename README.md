# User-manager
A demo react app that manages users.

<img src="screenshot-home-page.png" alt="Screenshot of app" />

## Installation
```
git clone https://github.com/oakley808/user-manager.git
yarn install
```

## Development
Run `yarn run start` and open a browser to http://localhost:3001

## Deployment
```
yarn run deploy
```
The `/build/` directory will be pushed to a `gh-pages` branch and published to GitHub pages. Your app will be at: `https://<username>.github.io/user-manager/`


## Testing
Run `yarn run test` or `yarn run test:watch`

A unit test coverage report can be found at `user-manager/coverage/lcov-report/index.html`

<img src="screenshot-unit-testing.png" alt="Screenshot testing coverage" />


## Todo
* Add a pre-commit git hook to lint code and pre-push to run unit tests
* More form validation
* Wrap `<ErrorBoundary>` around page(s)
* Make running unit tests also run linter

## Questions
Questions? Feel free to file an issue in the Github issue tracker.
