import { useRecoilState, useResetRecoilState } from 'recoil';

import { notificationMessageAtom } from '@store/global/global.state';

export const useNotificationMessageActions = () => {
  const [notificationMessage, setNotificationMessage] = useRecoilState(notificationMessageAtom);
  const resetNotificationMessage = useResetRecoilState(notificationMessageAtom);

  return {
    duration: notificationMessage.duration,
    show: notificationMessage.show,
    content: notificationMessage.content,
    type: notificationMessage.type,
    setNotificationMessage,
    resetNotificationMessage
  };
};

