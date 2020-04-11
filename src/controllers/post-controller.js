/* eslint-disable no-console */
import {
  addPost, deletePost, updatePost, showPost, deleteEleArray,
  addComments, showComments, addEleArray, getLike,
} from '../models/model-firebase.js';
import { userActive } from './profile-controller.js';

export const datePublication = (datePost) => {
  const yearPost = datePost.getFullYear();
  const monthPost = datePost.getMonth() + 1;
  const dayPost = datePost.getDate();
  const hourPost = datePost.toLocaleTimeString();
  const completeDate = `${dayPost}/${monthPost}/${yearPost} a las ${hourPost}`;
  return completeDate;
};

export const createPost = (event) => {
  event.preventDefault();
  const post = document.querySelector('#message-post').value;
  const statusPost = document.querySelector('#status-post').value;
  const date = new Date();
  const user = userActive();
  const obj = {
    message: post,
    id_user: user.uid,
    photo_user: user.photoURL,
    name_user: user.displayName,
    date_post: datePublication(date),
    status: statusPost,
    likeEmail: [],
  };
  addPost('post', obj)
    .then(() => {
      document.querySelector('#message-post').value = '';
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
};


export const deletePublication = (ide) => {
  deletePost(ide)
    .then(() => {
      console.log('Document successfully deleted!');
    }).catch((error) => {
      console.error('Error removing document: ', error);
    });
};

export const updatePublication = (ide, obj) => {
  updatePost(ide, obj)
    .then(() => {
      console.log('Document successfully updated!');
    })
    .catch((error) => {
      console.error('Error updating document: ', error);
    });
};

export const showUserPost = () => {
  showPost();
};

export const likes = (idPost, emailUser) => {
  getLike(idPost)
    .then((doc) => {
      const arrayEmail = doc.data().likeEmail;
      if (arrayEmail.length === 0) {
        addEleArray(idPost, emailUser);
      } else {
        arrayEmail.forEach((ele) => {
          if (ele !== emailUser) {
            addEleArray(idPost, emailUser);
          } else {
            deleteEleArray(idPost, emailUser);
          }
        });
      }
    });
};

export const createComments = (idPost, obj) => {
  addComments(idPost, obj)
    .then(() => {
      document.querySelector(`#comment-post-${idPost}`).value = '';
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
};

export const showCommentPublication = (idPost, callback) => {
  showComments(idPost, callback);
};
