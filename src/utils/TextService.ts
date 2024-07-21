import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { SALT_ROUND } from 'src/common/constants';

@Injectable()
export class TextService {
  /**
   * Metodo para encriptar un password
   * @param password contraeña
   */
  static async encrypt(password: string) {
    return await hash(password, SALT_ROUND);
  }

  static async compare(
    passwordInPlainText: string | Buffer,
    hashedPassword: string,
  ) {
    return await compare(passwordInPlainText, hashedPassword);
  }

  static decodeBase64 = (base64: string) => {
    const text = TextService.atob(base64);
    return decodeURI(text);
  };

  static atob = (a: string) => Buffer.from(a, 'base64').toString('ascii');

  static btoa = (b: string) => Buffer.from(b).toString('base64');

  static base64Decode(base64) {
    return Buffer.from(base64, 'base64').toString('utf-8');
  }
}
