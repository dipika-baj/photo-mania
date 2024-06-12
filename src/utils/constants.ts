export const PASSWORD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export const USERNAME_REGEX = /^[A-Za-z_][A-Za-z0-9_.]{6,29}$/;

export const NAME_REGEX = /^[A-Za-z][A-Za-z0-9_]{2,20}$/;
