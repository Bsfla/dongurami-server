'use strict';

const Student = require('../../models/services/Student/Student');

const process = {
  // 아이디(학번) 찾기
  findId: async (req, res) => {
    const student = new Student(req.body);
    const response = await student.findId();

    if (response.success) {
      return res.status(200).json(response);
    }
    if (response.isError) {
      return res.status(500).json(response.clientMsg);
    }
    return res.status(400).json(response);
  },
};

module.exports = {
  process,
};
