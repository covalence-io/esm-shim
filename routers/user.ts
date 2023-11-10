import { Router } from 'express';
import multer from 'multer';
import type fileType from 'file-type';

const { fileTypeFromFile } = require('../esm/bundle.js') as typeof fileType;
const upload = multer({ dest: 'uploads' });

export default function users() {
    const router = Router();

    router
        .get('/', (req, res, next) => {
            res.json({
                id: 1,
                firstname: 'Matt',
                lastname: 'Morgan',
            });
        })
        .post('/avatar', upload.single('avatar'), async (req, res, next) => {
            if (!req.file) {
                next(new Error('Avatar not found'));
                return;
            }

            try {
                const type = await fileTypeFromFile(req.file.path);

                console.log(type);
                // do something with type and file
            } catch (e) {
                console.log(e);
            }

            res.redirect('/');
        });

    return router;
}