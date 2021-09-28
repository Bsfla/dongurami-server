'use strict';

const mariadb = require('../../../config/mariadb');

class NotificationStorage {
  static async findAllById(studentId) {
    let conn;
    try {
      conn = await mariadb.getConnection();
      const query = `SELECT no.no AS notificationNum, no.sender_id AS senderId, 
        no.url, no.notification_category_no AS notificationCategoryNum, 
        no.in_date AS inDate FROM notifications AS no 
        WHERE no.recipient_id=(SELECT id FROM students WHERE id = ?)
        ORDER BY inDate DESC
        LIMIT 10;`;
      const notifications = await conn.query(query, studentId);
      console.log(notifications);
      return { success: true, notifications };
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  static async findTitleByBoardNum(boardNum) {
    let conn;

    try {
      conn = await mariadb.getConnection();
      const query = 'SELECT title FROM boards WHERE no = ?;';
      const board = await conn.query(query, boardNum);

      return board[0].title;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  static async findClubNameByClubNum(clubNum) {
    let conn;

    try {
      conn = await mariadb.getConnection();
      const query = 'SELECT name FROM clubs WHERE no = ?;';
      const club = await conn.query(query, clubNum);

      return club[0].name;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  static async createByIdAndTitle(notificationInfo) {
    let conn;
    try {
      conn = await mariadb.getConnection();
      const query = `INSERT INTO notifications (sender_id, recipient_id, url, notification_category_no, title) 
      VALUES (?, ?, ?, ?, ?);`;

      await conn.query(query, [
        notificationInfo.body.senderId,
        notificationInfo.recipientId,
        notificationInfo.body.url,
        notificationInfo.body.notificationCategoryNum,
        notificationInfo.title,
      ]);

      return true;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  static async createByIdAndClubName(notificationInfo) {
    let conn;
    try {
      conn = await mariadb.getConnection();
      const query = `INSERT INTO notifications (sender_id, recipient_id, url, notification_category_no, title) 
      VALUES (?, ?, ?, ?, ?);`;

      await conn.query(query, [
        notificationInfo.senderId,
        notificationInfo.applicant,
        notificationInfo.url,
        notificationInfo.notificationCategroyNum,
        notificationInfo.clubName,
      ]);

      return true;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  static async deleteByNotificationNum(notificationNum) {
    let conn;
    try {
      conn = await mariadb.getConnection();
      const query = 'DELETE FROM notifications WHERE no = ?;';
      const notification = await conn.query(query, notificationNum);

      if (notification.affectedRows) return true;
      return false;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  static async deleteAllById(studentId) {
    let conn;
    try {
      conn = await mariadb.getConnection();
      const query = 'DELETE FROM notifications WHERE recipient_id = ?;';
      const notification = await conn.query(query, studentId);

      if (notification.affectedRows) return true;
      return false;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }
}

module.exports = NotificationStorage;
