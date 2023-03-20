export const validateEmail = (email: string) => {
  if (email) {
    const regex = new RegExp('[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?');
    return regex.test(email);
  } else if (email === '') {
    return 1;
  } else {
    return null;
  }
};

export const validatePassword = (password: string) => {
  if (password) {
    const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$');
    return regex.test(password);
  } else {
    return null;
  }
};

export const validatePasswordLength = (password: string) => {
  if (password) {
    return password.length >= 8;
  } else {
    return null;
  }
};

export const validatePasswordRules = (password: string) => {
  const legitPassword = [
    { error: false, text: 'Password length should be more than 8 characters' },
    { error: false, text: 'Password should contain at least one lowercase character' },
    { error: false, text: 'Password should contain at least one special character' },
    { error: false, text: 'Password should contain at least one digit character' },
    { error: false, text: 'Password should contain at least one uppercase character' }
  ];
  if (password) {
    if (password.length >= 8) {
      legitPassword[0].error = true;
    }
    if (/[a-z]/.test(password)) {
      legitPassword[1].error = true;
    }
    if (/[#?!@$%^&*-]/.test(password)) {
      legitPassword[2].error = true;
    }
    if (/\d/.test(password)) {
      legitPassword[3].error = true;
    }
    if (/[A-Z]/.test(password)) {
      legitPassword[4].error = true;
    }
  }
  return legitPassword;
};

export const validate2fa = (i: string) => {
  if (i.length > 1) {
    i = i.slice(0, 1);
  }
  return i;
};
