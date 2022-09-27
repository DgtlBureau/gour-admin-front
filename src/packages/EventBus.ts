import { Notification, NotificationType } from '../@types/entities/Notification';

export enum EventTypes {
  routerPush = 'router.push',
  notification = 'notification',
  removeNotification = 'removeNotification',
}

type EventArguments = {
  [EventTypes.routerPush]: string;
  [EventTypes.notification]: Notification;
  [EventTypes.removeNotification]: string;
};

type EventListenerCallback<T extends EventTypes> = (payload: EventArguments[T]) => void;

type DispatchNotificationOptions = Partial<Omit<Notification, 'message'>>;

const listeners: Record<EventTypes, EventListenerCallback<EventTypes>[]> = {
  [EventTypes.routerPush]: [],
  [EventTypes.notification]: [],
  [EventTypes.removeNotification]: [],
};

class EventBus {
  listeners = listeners;

  emit<K extends EventTypes>(key: K, payload: EventArguments[K]) {
    this.listeners[key].forEach(callback => callback(payload));
  }

  on<K extends EventTypes>(key: K, callback: EventListenerCallback<K>) {
    this.listeners[key].push(callback as EventListenerCallback<EventTypes>);
  }

  off<K extends EventTypes>(key: K, callback: EventListenerCallback<K>) {
    const index = this.listeners[key].indexOf(
      callback as EventListenerCallback<EventTypes>
    );

    if (index === -1) {
      return;
    }

    this.listeners[key].splice(index, 1);
  }
}

export const eventBus = new EventBus();

export const dispatchNotification = (
  message: Notification['message'],
  options: DispatchNotificationOptions = {}
) => {
  eventBus.emit(EventTypes.notification, {
    message,
    type: options.type ?? NotificationType.SUCCESS,
    ...options,
  });
};
