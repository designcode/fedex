import { InjectionToken } from '@angular/core';

/*
	InjectionToken for API_HOST, to be used in API calls.
	Can be provided in app.config,

	```ts
	export const appConfig: ApplicationConfig = {
		providers: [
			provideRouter(routes),
			{
				provide: API_HOST,
				useValue: ''
			}
		],
	};
	```

	If not provided, uses the default value provided here
*/
export const API_HOST = new InjectionToken<URL>('API_HOST', {
	providedIn: 'root',
	factory: () => new URL('https://jsonplaceholder.typicode.com'),
});
