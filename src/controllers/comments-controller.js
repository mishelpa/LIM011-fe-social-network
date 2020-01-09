import { deleteComment, updateComment } from '../models/model-firebase.js';

export const deleteCommentPublication = (idPost, id) => {
  deleteComment(idPost, id);
};

export const updateCommentPublication = (idPost, id, obj) => {
  updateComment(idPost, id, obj);
};
