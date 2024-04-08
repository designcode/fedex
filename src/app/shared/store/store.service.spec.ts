import { Observable, take } from 'rxjs';
import { Status, Store, StoreState } from './store.service';

describe('Store Service', () => {
	const initialState = {
		status: Status.IDLE,
		error: undefined,
	};
	let service: Store<StoreState>;

	beforeEach(() => {
		service = new Store<StoreState>(initialState);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('getState', () => {
		it('getState should return an Observable', () => {
			expect(service['getState']()).toBeInstanceOf(Observable);
		});

		it('getState should emit the current state', done => {
			service['getState']()
				.pipe(take(1))
				.subscribe(state => {
					expect(state).toEqual(initialState);
					done();
				});
		});
	});

	describe('setState', () => {
		it('setState should update the state', done => {
			service['setState']({ status: Status.PENDING });

			service['getState']()
				.pipe(take(1))
				.subscribe(state => {
					expect(state).toEqual({
						status: Status.PENDING,
						error: undefined,
					});
					done();
				});
		});
	});
});
