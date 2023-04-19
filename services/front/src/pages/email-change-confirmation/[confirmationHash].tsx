import React from 'react';

import { useRouter } from 'next/router';

import { useHandleException } from '@hooks/useHandleException.hook';

const EmailChangeConfirmation = () => {
  const router = useRouter();
  const { handleException } = useHandleException();

  const [confirmationStatus, setConfirmationStatus] = React.useState(1);

  React.useEffect(() => {
    const { confirmationHash } = router.query;
    if (confirmationHash) {
      confirmEmailChange(confirmationHash as string)
        .then(() => setConfirmationStatus(2));
    }
  }, [router.query]);

  const handleRedirect = async (path: string) => {
    await router.push(`${path}`);
  };

  const confirmEmailChange = async (hash: string) => {
    try {

    } catch (e) {
      setConfirmationStatus(3);
      handleException(e);
    }
  };

  return (
    <div>

    </div>
  );
};

  export default EmailChangeConfirmation;
