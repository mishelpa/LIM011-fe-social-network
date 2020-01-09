import { updateNote } from '../models/model-firebase.js';

export const editUser = () => {
  const btnEdit = document.querySelector('#btn-edit-user');
  const btnSave = document.querySelector('#btn-save-user');
  const name = document.querySelector('#name');
  btnEdit.classList.add('hide');
  btnSave.classList.remove('hide');
  name.contentEditable = true;
  name.focus();
};

export const saveUser = (id) => {
  const btnEdit = document.querySelector('#btn-edit-user');
  const btnSave = document.querySelector('#btn-save-user');
  const nameUser = document.querySelector('#name');
  nameUser.contentEditable = false;
  btnEdit.classList.remove('hide');
  btnSave.classList.add('hide');
  const obj = {
    name: nameUser.innerHTML,
  };
  updateNote(id, obj);
};

export const editInfo = () => {
  const btnEditInfo = document.querySelector('#btn-edit-info');
  const btnSaveInfo = document.querySelector('#btn-save-info');
  const info = document.querySelector('#info-user');
  btnEditInfo.classList.add('hide');
  btnSaveInfo.classList.remove('hide');
  info.contentEditable = true;
  info.innerHTML = '';
  info.focus();
};

export const saveInfo = (id) => {
  const btnEditInfo = document.querySelector('#btn-edit-info');
  const btnSaveInfo = document.querySelector('#btn-save-info');
  const info = document.querySelector('#info-user');
  info.contentEditable = false;
  btnEditInfo.classList.remove('hide');
  btnSaveInfo.classList.add('hide');
  const obj = {
    description: info.innerHTML,
  };
  updateNote(id, obj);
};
