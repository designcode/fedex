import { Observable, BehaviorSubject } from 'rxjs';

export const enum Status {
	'IDLE',
	'PENDING',
	'SUCCESS',
	'ERROR',
}

export interface StoreState {
	status: Status;
	error?: unknown;
}

export class Store<T extends StoreState> {
	private readonly state$: BehaviorSubject<T>;

	constructor(initialState: T) {
		this.state$ = new BehaviorSubject<T>(initialState);
	}

	private get state(): T {
		return this.state$.getValue();
	}

	protected getState(): Observable<T> {
		return this.state$.asObservable();
	}

	protected setState(nextState: T | Partial<T>): void {
		this.state$.next({ ...this.state, ...nextState });
	}
}
