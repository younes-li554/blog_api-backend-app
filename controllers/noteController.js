const Note = require("../models/note");
const User = require("../models/user");
const createError = require("http-errors");

exports.createNote = async (req, res, next) => {
  try {

    const note = await Note.create({
      ...req.body,
      userId: req.user.id
    });

    res.status(201).json({
      success: true,
      data: note
    });

  } catch (err) {
    next(err);
  }
};

exports.getNotes = async (req, res, next) => {

  try {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await Note.findAndCountAll({
      limit,
      offset,
      include: [
        {
          model: User,
          attributes: ["id", "username"]
        }
      ],
      order: [["createdAt", "DESC"]]
    });

    res.json({
      success: true,
      total: count,
      page,
      limit,
      data: rows
    });

  } catch (err) {
    next(err);
  }

};

exports.getNoteById = async (req, res, next) => {

  try {

    const note = await Note.findByPk(req.params.id);

    if (!note) {
      return next(createError(404, "Note not found"));
    }

    res.json({
      success: true,
      data: note
    });

  } catch (err) {
    next(err);
  }

};

exports.updateNote = async (req, res, next) => {

  try {

    const note = await Note.findByPk(req.params.id);

    if (!note) {
      return next(createError(404, "Note not found"));
    }

    await note.update(req.body);

    res.json({
      success: true,
      data: note
    });

  } catch (err) {
    next(err);
  }

};

exports.deleteNote = async (req, res, next) => {

  try {

    const note = await Note.findByPk(req.params.id);

    if (!note) {
      return next(createError(404, "Note not found"));
    }

    await note.destroy();

    res.json({
      success: true,
      message: "Note deleted"
    });

  } catch (err) {
    next(err);
  }

};