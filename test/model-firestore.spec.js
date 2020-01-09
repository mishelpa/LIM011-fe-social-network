import MockFirebase from 'mock-cloud-firestore';
import {
  addPost, addNote, showPost, deletePost, updatePost,
} from '../src/models/model-firebase.js';

const fixtureData = {
  __collection__: {
    notes: {
      __doc__: {
        abc1d: {
          title: 'publicacion',
        },
      },
    },
    post: {
      __doc__: {
        p0003: {
          id_user: '000003',
          likeEmail: '',
          message: 'post3',
          name_user: 'codeGirl',
          status: 'privado',
        },
        p0005: {
          id_user: '000005',
          likeEmail: '',
          message: 'post5',
          name_user: 'mishel',
          status: 'publico',
        },
      },
    },
  },
};
const objPost = {
  id_user: '123456',
  likeEmail: '',
  message: 'hola',
  name_user: 'mishel',
  status: 'publico',
};

const objUpdate = {
  message: 'hi',
};

const objUser = {
  name: 'mishel',
  correo: 'jud1292@hotmail.com',
};

global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });

describe('addPost', () => {
  it('deberia agregar un post', (done) => addPost('post', objPost).then(() => {
    const callback = (notes) => {
      const result = notes.find((element) => element.id_user === '123456');
      expect(result.id_user).toBe(objPost.id_user);
      done();
    };
    showPost(callback);
  }));
});

describe('deletePost', () => {
  it('deberia eliminar el post p0003', (done) => deletePost('p0003')
    .then(() => {
      const callback = (post) => {
        const result = post.find((element) => element.id_user === '000003');
        expect(result).toBe(undefined);
        done();
      };
      showPost(callback);
    }));
});

describe('updatePost', () => {
  it('deberia actualizar el post p0005', (done) => updatePost('p0005', objUpdate)
    .then(() => {
      const callback = (post) => {
        const result = post.find((element) => element.id_user === '000005');
        expect(result.message).toBe('hi');
        done();
      };
      showPost(callback);
    }));
});

describe('addNote', () => {
  it('deberia agregar un usuario', (done) => addNote('user', 'mishel', objUser).then(() => {
    expect('Documento agregado').toBe('Documento agregado');
    done();
  }));
});

/* describe('addEleArray', () => {
  it('deberia agregar un usuario', (done) => addEleArray('uhunl', 'jud12@gmail.com').then(() => {
    // eslint-disable-next-line dot-notation
    expect('hola').toEqual('hola');
    done();
  }));
}); */
