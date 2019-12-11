import {createAuth} from '../models/model-firebase.js';

export const createUser = (email, password) => {
    createAuth(email, password)
    
}

