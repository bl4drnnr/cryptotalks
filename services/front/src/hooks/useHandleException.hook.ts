import { ApiException } from '@exceptions/api.exception';
import { GeneralException } from '@exceptions/general.exception';
import { useNotificationMessage } from '@hooks/useShowNotificationMessage.hook';
import { NotificationType } from '@store/global/global.state';


export const useHandleException = () => {
  const { showNotificationMessage } = useNotificationMessage();

  const handleException = (error: any) => {

    if (error.message === 'token-expired') {
      localStorage.removeItem('_at');
    }

    if (error instanceof ApiException) {
      showNotificationMessage({
        type: NotificationType.ERROR,
        content: error.description || error.message || error.message,
      });
    } else if (error instanceof GeneralException) {
      showNotificationMessage({
        type: NotificationType.ERROR,
        content: error.message,
      });
    } else {
      showNotificationMessage({
        type: NotificationType.ERROR,
        content: error.toString(),
      });
    }
  };

  return { handleException };
};
