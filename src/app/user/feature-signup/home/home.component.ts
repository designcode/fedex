import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserStoreService } from '@user/data-access';
import { map } from 'rxjs';

@Component({
	selector: 'app-fedex-home',
	standalone: true,
	imports: [AsyncPipe, RouterLink],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
	private readonly userStore = inject(UserStoreService);

	readonly vm$ = this.userStore.getState().pipe(map(({ user }) => user));
}
