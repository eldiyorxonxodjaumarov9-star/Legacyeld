export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  message?: string;
  createdAt: string;
};

export type PublicUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  message?: string;
};

export function toPublicUser(user: User): PublicUser {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    message: user.message,
  };
}
