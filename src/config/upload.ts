import multer from 'multer';

export default {
  storage: multer.diskStorage({
    destination: '',
  }),
};
