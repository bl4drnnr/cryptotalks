import { useNotificationMessageActions } from '@store/global/global.actions';
import { NotificationType } from '@store/global/global.state';

const DEFAULT_NOTIFICATION_DURATION = 7500;

export const useNotificationMessage = () => {
  const {
    show,
    setNotificationMessage,
    resetNotificationMessage,
  } = useNotificationMessageActions();

  const showNotificationMessage = ({
                                     content,
                                     type,
                                     duration = DEFAULT_NOTIFICATION_DURATION,
                                   }: { content: string, type: NotificationType, duration?: number }) => {
    if (show) {
      return false;
    }

    setNotificationMessage({
      show: true,
      content,
      type,
      duration,
    });

    setTimeout(() => resetNotificationMessage(), duration);
    return true;
  };

  return { showNotificationMessage };
};
