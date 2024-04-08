import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: 'design-system',
		loadComponent: () =>
			import('@shared/ui/components').then(
				({ DesignSystemComponent }) => DesignSystemComponent
			),
	},
	{
		path: 'signup',
		loadComponent: () =>
			import('@user/feature-signup').then(
				({ SignUpComponent }) => SignUpComponent
			),
	},
];
