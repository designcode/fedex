import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-fedex-design-system',
	standalone: true,
	templateUrl: './design-system.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesignSystemComponent {}
