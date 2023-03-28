import express  from "express";
import mongoose from "mongoose";
import { registerValidation, loginValidation,  postCreateValidation} from "./validations.js";
import { UserController, PostController } from "./Controller/index.js";
import cors from 'cors';
import { handleValidationErrors, checkAuth } from "./utils/index.js";

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err));

const app = express();

app.use(express.json());
app.use(cors());

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login)
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.update);

app.listen(process.env.PORT || 4444, (err) => {
    if(err) {
        return console.log(err);
    }

    console.log('Server OK');
}); 
