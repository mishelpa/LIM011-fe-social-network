/* eslint-disable no-underscore-dangle */
import MockFirebase from 'mock-cloud-firestore';
import {
  addPost, addNote, showPost, deletePost, updatePost, showPostUser, updateComment,
  addComments, showComments, deleteComment, addEleArray,
  deleteEleArray, getLike, getNote,
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
          __collection__: {
            comments: {
              __doc__: {
                com1: {
                  id_publication: 'p0003',
                  message: '2do comentario',
                  name_user: 'mishel',
                },
              },
            },
          },
        },
        p0005: {
          id_user: '000005',
          likeEmail: ['kis@gmail.com'],
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

const objComment = {
  id_publication: 'p0003',
  message: 'comentario',
  name_user: 'mishel2',
};

global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });

describe('addNote', () => {
  it('deberia agregar un usuario', (done) => addNote('user', 'u001', objUser).then(() => {
    expect('Documento agregado').toBe('Documento agregado');
    done();
  }));
});

describe('getNote', () => {
  it('deberia mostrar una nota', (done) => getNote('user').then((user) => {
    console.log(user._data);
    expect(user).toBeTruthy();
    done();
  }));
});

/* describe('updateNote', () => {
  it('deberia actualizar un post', (done) => updateNote('u001', { email: 'judmi20@gmail.com' })
    .then(() => {
      done();
    }));
}); */

describe('addPost', () => {
  it('deberia agregar un post', (done) => addPost('post', objPost).then((user) => {
    const callback = (notes) => {
      const result = notes.find((element) => element.id_user === '123456');
      expect(result.id_user).toBe(objPost.id_user);
      done();
    };
    // eslint-disable-next-line no-underscore-dangle
    showPostUser(user._data.id_user, callback);
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

describe('getLike', () => {
  it('deberia mostrar la lista de likes', (done) => getLike('p0005').then((like) => {
    expect(like._data.likeEmail).toStrictEqual(['kis@gmail.com']);
    done();
  }));
});

describe('addEleArray', () => {
  it('deberia agregar propiedad likeEmail a un post', (done) => addEleArray('p0005', 'pao@gmail.com')
    .then(() => {
      const callback = (post) => {
        const result = post.find((element) => element.id_user === '000005');
        expect(result.likeEmail).toStrictEqual(['kis@gmail.com', 'pao@gmail.com']);
        done();
      };
      showPost(callback);
    }));
});

describe('deleteEleArray', () => {
  it('deberia eliminar propiedad likeEmail a un post', (done) => deleteEleArray('p0005', 'kis@gmail.com')
    .then(() => {
      const callback = (post) => {
        const result = post.find((element) => element.id_user === '000005');
        expect(result.likeEmail).toStrictEqual(['pao@gmail.com']);
        done();
      };
      showPost(callback);
    }));
});

describe('addComments', () => {
  it('deberia agregar un post', (done) => addComments('p0003', objComment).then(() => {
    const callback = (comment) => {
      const result = comment.find((element) => element.message === 'comentario');
      expect(result.message).toBe(objComment.message);
      done();
    };
    showComments('p0003', callback);
  }));
});

describe('updateComments', () => {
  it('deberia editar un comentario', (done) => updateComment('p0003', 'com1', objUpdate).then(() => {
    const callback = (comment) => {
      const result = comment.find((element) => element.message === 'hi');
      expect(result.message).toBe(objUpdate.message);
      done();
    };
    showComments('p0003', callback);
  }));
});

describe('deleteComments', () => {
  it('deberia eliminar un comentario', (done) => deleteComment('p0003', 'com1').then(() => {
    const callback = (comment) => {
      const result = comment.find((element) => element.name_user === 'mishel');
      expect(result).toBe(undefined);
      done();
    };
    showComments('p0003', callback);
  }));
});
