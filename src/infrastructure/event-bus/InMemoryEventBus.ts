import { BaseEvent, ClinicalEventType } from '../../domain/models/events';

type EventHandler<T = unknown> = (event: BaseEvent<T>) => void;

export class InMemoryEventBus {
  private static instance: InMemoryEventBus;
  private handlers: Map<ClinicalEventType, Set<EventHandler<any>>> = new Map();

  private constructor() {}

  public static getInstance(): InMemoryEventBus {
    if (!InMemoryEventBus.instance) {
      InMemoryEventBus.instance = new InMemoryEventBus();
    }
    return InMemoryEventBus.instance;
  }

  public subscribe<T>(eventType: ClinicalEventType, handler: EventHandler<T>): () => void {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, new Set());
    }
    const set = this.handlers.get(eventType)!;
    set.add(handler as EventHandler<any>);

    // Unsubscribe function
    return () => {
      set.delete(handler as EventHandler<any>);
    };
  }

  public publish<T>(eventType: ClinicalEventType, payload: T): void {
    const event: BaseEvent<T> = {
      id: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: eventType,
      timestamp: new Date().toISOString(),
      payload
    };

    const targetHandlers = this.handlers.get(eventType);
    if (targetHandlers) {
      targetHandlers.forEach(handler => {
        try {
          handler(event);
        } catch (err) {
          console.error(`[EventBus] Error handling event ${eventType}:`, err);
        }
      });
    }
  }
}
