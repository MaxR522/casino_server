import * as argon2 from 'argon2';

const hashPassword = async (password: string) => {
  try {
    const hash = await argon2.hash(password);

    return hash;
  } catch (error: any) {
    throw new Error(error.toString());
  }
};

export default hashPassword;
