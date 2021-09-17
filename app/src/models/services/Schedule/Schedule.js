'use strict';

const ScheduleStorage = require('./ScheduleStorage');
const Error = require('../../utils/Error');

class Schedule {
  constructor(req) {
    this.body = req.body;
    this.params = req.params;
    this.auth = req.auth;
  }

  async findAllByClubNum() {
    const { clubNum } = this.params;

    try {
      const success = await ScheduleStorage.existClub(clubNum);

      if (success) {
        const result = await ScheduleStorage.findAllByClubNum(clubNum);

        return { success: true, result };
      }
      return { success: false, msg: '존재하지 않는 동아리입니다.' };
    } catch (err) {
      return Error.ctrl('개발자에게 문의해주세요.', err);
    }
  }

  async findAllByDate() {
    const { clubNum } = this.params;
    const { date } = this.params;
    const ScheduleInfo = {
      clubNum,
      date,
    };

    try {
      const success = await ScheduleStorage.existClub(clubNum);

      if (success) {
        const result = await ScheduleStorage.findAllByDate(ScheduleInfo);

        return { success: true, result };
      }
      return { success: false, msg: '존재하지 않는 동아리입니다.' };
    } catch (err) {
      return Error.ctrl('개발자에게 문의해주세요.', err);
    }
  }

  async createSchedule() {
    const data = this.body;
    const { clubNum } = this.params;
    const { id } = this.auth;

    try {
      const scheduleInfo = {
        clubNum,
        studentId: id,
        colorCode: data.colorCode,
        title: data.title,
        startDate: data.startDate,
        endDate: data.endDate,
      };

      const success = await ScheduleStorage.createSchedule(scheduleInfo);

      if (success) return { success: true, msg: '일정이 등록되었습니다.' };
      return { success: false, msg: '일정 등록에 실패하였습니다.' };
    } catch (err) {
      return Error.ctrl('개발자에게 문의해주세요.', err);
    }
  }

  async updateSchedule() {
    const data = this.body;
    const { no } = this.params;

    try {
      const scheduleInfo = {
        no,
        colorCode: data.colorCode,
        title: data.title,
        startDate: data.startDate,
        endDate: data.endDate, // 수정하는 사람 =/= 작성자 가능성O => 학생 정보는 수정시 받지 X
      };

      const success = await ScheduleStorage.updateSchedule(scheduleInfo);

      if (success) return { success: true, msg: '일정이 수정되었습니다.' };
      return { success: false, msg: '일정 수정에 실패하였습니다.' };
    } catch (err) {
      return Error.ctrl('개발자에게 문의해주세요.', err);
    }
  }

  async updateOnlyImportant() {
    const data = this.body;
    const { no } = this.params;

    try {
      const scheduleInfo = {
        no,
        important: data.important,
      };

      const success = await ScheduleStorage.updateOnlyImportant(scheduleInfo);

      if (success)
        return { success: true, msg: '주요 일정으로 등록되었습니다.' };
      return { success: false, msg: '주요 일정 등록이되지 않았습니다.' };
    } catch (err) {
      return Error.ctrl('개발자에게 문의해주세요.', err);
    }
  }

  async deleteSchedule() {
    const { no } = this.params;

    try {
      const success = await ScheduleStorage.deleteSchedule(no);

      if (success) return { success: true, msg: '일정이 삭제되었습니다.' };
      return { success: false, msg: '일정이 삭제되지 않았습니다.' };
    } catch (err) {
      return Error.ctrl('개발자에게 문의해주세요.', err);
    }
  }
}

module.exports = Schedule;
