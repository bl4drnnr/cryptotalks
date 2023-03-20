import classNames from 'classnames';

import { useNotificationMessageActions } from '@store/global/global.actions';
import { Container, Content } from '@styles/NotificationMessage.style';

export const NotificationMessage = () => {
  const { show, content, type } = useNotificationMessageActions();
  return (
    <>
      {show &&
        <Container className={classNames({ onError: type === 'error', fadeInClass: true })}>
          <Content>{content}</Content>
        </Container>
      }
    </>
  );
};
