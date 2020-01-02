/* eslint-disable no-console */
import {
  addPost, deletePost, updatePost, showPost, saveLikes, showLikes, addComments, showComments,
} from '../models/model-firebase.js';
import { userActive } from './profile-controller.js';
import { postView } from '../views/posts.js';
import { commentView } from '../views/comments.js';

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
    name_user: user.displayName,
    date_post: datePublication(date),
    status: statusPost,
  };
  addPost('post', obj)
    .then((docRef) => {
      console.log('Document written with ID: ', docRef);
      document.querySelector('#message-post').value = '';
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
};


export const borrar = (ide) => {
  deletePost(ide)
    .then(() => {
      console.log('Document successfully deleted!');
    }).catch((error) => {
      console.error('Error removing document: ', error);
    });
};

export const actualizar = (ide, obj) => {
  updatePost(ide, obj)
    .then(() => {
      console.log('Document successfully updated!');
    })
    .catch((error) => {
      // The document probably doesn't exist.
      console.error('Error updating document: ', error);
    });
};

export const mostrar = () => {
  showPost()
    .onSnapshot((querySnapshot) => {
      document.querySelector('#all-publications').innerHTML = '';
      querySnapshot.forEach((doc) => {
        postView(doc);
      });
    });
};

export const guardarLikes = (idPost, obj, ide) => {
  saveLikes(idPost, obj, ide)
    .then(() => {
      console.log('like registrado');
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
};

export const mostrarLikes = (idPost, paintLikes) => {
  showLikes(idPost, paintLikes)
    .onSnapshot((querySnapshot) => {
      const count = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        count.push(doc.data());
      });
      console.log(count);
      paintLikes(count);
      // Likes.innerHTML = count;
    });
};

export const createComments = (idPost, obj) => {
  addComments(idPost, obj)
    .then((docRef) => {
      console.log('Document written with ID: ', docRef);
      document.querySelector('#comment-post').value = '';
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
};

export const mostrarComments = (idPost) => {
  showComments(idPost)
    .then((querySnapshot) => {
      document.querySelector(`#${idPost}`).innerHTML = '';
      querySnapshot.forEach((doc) => {
        commentView(doc);
      });
    });
};
