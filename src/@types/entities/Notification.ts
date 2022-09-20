import { ReactNode } from 'react';
import { iNotification, iNotificationDismiss } from 'react-notifications-component';

export enum NotificationType {
  DANGER = 'danger',
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  DEFAULT = 'default',
}
export interface Notification extends Partial<iNotification> {
  type: NotificationType;
  message: string | ReactNode;
  title?: string;
  dismiss?: iNotificationDismiss;
}
