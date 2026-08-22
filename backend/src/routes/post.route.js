import { Router } from "express";
import { createPost, deletePost, getPosts, updatePost } from "../controller/post.controller.js"
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

// Protect all post routes
router.use(verifyJWT);

router.route('/create').post(createPost);
router.route('/getPosts').get(getPosts);
router.route('/update/:id').patch(updatePost);
router.route('/delete/:id').delete(deletePost);


export default router;