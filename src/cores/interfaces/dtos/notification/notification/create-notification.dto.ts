export type NotificationData = {
  [key: string]: any;
};

export interface ICreateNotificationDto<T extends NotificationData> {
  service: string;
  type: string;
  notifiableType: string;
  notifiableId: string;
  data: T;
  sentAt?: string;
  readAt?: string;
}
