'use strict';

const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;
class Auth {
  // clubNum은 동그라미에서 동아리 가입 승인이 완료된 후 재로그인 할 때 생성
  static async createJWT(student, clubNum) {
    const payload = {
      clubNum,
      id: student.id,
      name: student.name,
      email: student.email,
      profilePath: student.profileImageUrl,
      isAdmin: student.adminFlag,
    };
    return jwt.sign(payload, SECRET_KEY, {
      algorithm: 'HS256',
      expiresIn: '1d',
      issuer: 'wooahan agile',
    });
  }

  static async verifyJWT(token) {
    try {
      return jwt.verify(token, SECRET_KEY);
    } catch (err) {
      return err;
    }
  }
}

module.exports = Auth;
