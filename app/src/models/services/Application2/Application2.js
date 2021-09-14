'use strict';

const ApplicationStorage2 = require('./ApplicationStorage2');
const Error = require('../../utils/Error');

class Application2 {
  constructor(req) {
    this.body = req.body;
    this.params = req.params;
    this.auth = req.auth;
  }

  async findOneByClubNum() {
    const clubNum = Number(this.params.clubNum);

    try {
      const { application } = await ApplicationStorage2.findOneByClubNum(
        clubNum
      );

      return { success: true, application };
    } catch (err) {
      return Error.ctrl('서버 에러입니다. 서버 개발자에게 문의해주세요.', err);
    }
  }
}

module.exports = Application2;
