export class EventBus {
	listeners: {
		[key: string]: ((...args: unknown[]) => unknown)[]
	};
	
    constructor() {
        this.listeners = {};
    }

    on(event: string, callback: () => unknown) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);
  	}

    off(event: string, callback: () => unknown) {
        if (!this.listeners[event]) {
      		throw new Error(`Нет события: ${event}`);
    	}

		this.listeners[event] = this.listeners[event].filter(
			(listener) => listener !== callback
		);
  	}

    emit(event: string, ...args: unknown[]) {
        if (!this.listeners[event]) {
             throw new Error(`Нет события: ${event}`);
		}
		this.listeners[event].forEach(listener => {
			listener(...args);
		});
    }
};
