# Fedex Assignment

This is a signup form implementation using Angular 17 and a custom State management system.

## Getting Started

#### Run the project

In order to run project, please run following commands

-   `npm install`
-   `ng serve`

#### Test the project

- To run unit tests,

	`ng test`

- To run component tests,

	`npx cypress open` select **Component Testing**

- To run E2E tests,

	`npx cypress open` select **E2E Testing**. Please make sure that application is also running before starting E2E tests

## Architecture

This implementation is designed with simplicity in mind. It implements basics but leaves the room for extendibility. Here are some of the design decisions that are taken in this project.

### Domain Driven Design

This application follows a domain driven design. At the moment, there is only one domain which is **User** in this application. **User** domain contains all the functionality related to **User** management that can be used within the same domain or other domains (later). **User** domain contains two types of libraries

-   `data-access` - This is the library that exposes all the data interaction layers. It exposes `types`, `services` that communicate with backend, transforms `requests`/`responses` etc.
-   `features` - This type of library encapsulates a feature, which is generally built using `data-access` and `ui` libraries. In this case, there is a `feature-signup`

### Shared

Shared folder contains some shared functionality that can be used throughout the application.

-   **Store** - Custom state management system, [described here](#state-management)
-   **UI** - This library contains reusable components and styles.
-   **Tokens** - Angular `InjectionTokens` that can be used.

#### State Management

Because of the size of this project, no third party state management library like NgRx is used. Instead, a reusable service called `Store` (located at `src/app/shared/store/store.service.ts`) is implemented. It exposes a `public` `getState` method that consumers can subscribe to and get the latest state. It also exposes a `protected` `setState` method. The reason it's protected is to keep control on who can and can't modify state directly.

It can be used as following

```ts
export interface UserState extends StoreState {
	name: string | undefined;
}

const initialState: UserState = {
	name: undefined,
	status: Status.IDLE,
};

@Injectable({
	providedIn: 'root',
})
export class UserStoreService extends Store<UserState> {
	private readonly userApiService = inject(UserApiService);

	constructor() {
		super(initialState);

		this.getState()
			.pipe(
				// only emit when user status is successful
				filter(({ status }) => Status.SUCCESSFUL)
			)
			.subscribe(console.log);
	}

	setUserName(name: string) {
		this.setState({ name });
	}
}
```

#### API_HOST

InjectionToken for API_HOST, to be used in API calls. This can be provided in app.config,

```ts
export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes),
		{
			provide: API_HOST,
			useValue: new URL('http://myapi.com/api'),
		},
	],
};
```

If it is not provided, uses the default value which is `https://jsonplaceholder.typicode.com`

### Testing

I personally find Testing to be a crucial part of the development life cycle. A lot of teams think that achieving 100% coverage of code is the goal but that only leads to flaky and slow tests suites that can't be relied on.

This project uses three test approaches,

-   **Unit Testing**

    I've only use Unit tests where a business logic needs to be tested, I've covered the `StoreService` and **password validator** with the unit tests because we are interested in testing the `outputs` of functions based on given `inputs`.

-   **Component Testing**

    When working on big projects, we have several dumb components and some smart components that are used in different places. For such components, I used Component testing using Cypress. An example is `SignUpComponent` (located at `src/app/user/feature-signup/sign-up/sign-up.component.cy.ts`).

    It this suite, I test the behavior of the component.

-   **E2E Testing**

    To ensure the quality, we also need end to end tests that ensure a certain part of the application is working as intended. They mimic an end user's behavior. I've tested the whole signup process using Cypress in `cypress/e2e/tests/signup.cy.ts`. In this suite, I basically follow the process from homepage to going to signup and then coming back on homepage again, making sure that things work.

Using different approaches to test different aspects of application ensures that we don't end up with a bulky and flaky test suite.

### Styles and Design System

For styling, I've used **Tailwind** library. It offers a variety of utils to use and style your application quickly. I also created a quick design system that can be accessed at `/design-system`. When the project grows, we can use a tool like **Storybook** to maintain it. The idea is not to write the same component many times.

### Tooling

-   Linting using ESLint
-   Prettier for formatting code

### Other notes

-   Angular 17 features (standalone components, control flows, module less)
-   Atomic commits
