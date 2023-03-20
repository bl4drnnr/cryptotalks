import { atom } from 'recoil';

export enum NotificationType {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info'
}

interface INotificationMessage {
  show: boolean;
  content: string;
  type: NotificationType,
  duration: number;
  devInfo?: string;
}

export const theme = atom<'dark' | 'light'>({
  key: 'theme',
  default: 'dark',
});

export const notificationMessageAtom = atom<INotificationMessage>({
  key: 'notificationMessageAtom',
  default: {
    show: false,
    content: '',
    type: NotificationType.INFO,
    duration: 0,
  },
});
