/**
 * @copyright Nomaan Faruki - 2025
 */


import express from 'express';
import { createForm, getForm, submitResponse } from '../controllers/formController.js'; 

const router = express.Router();


router.post('/', createForm);


router.get('/:id', getForm);


router.post('/:id/submit', submitResponse); 

export default router;





