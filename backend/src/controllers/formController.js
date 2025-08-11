/**
 * @copyright Nomaan Faruki - 2025
 */

import Form from '../models/Form.js';
import Question from '../models/Question.js';
import Response from '../models/Response.js';

export const createForm = async (req, res) => {
    try {
        const { title, headerImage, questions } = req.body;

        const newForm = new Form({ title, headerImage });
        await newForm.save();

        const createdQuestions = await Promise.all(questions.map(q => {
            const newQuestion = new Question({
                ...q,
                formId: newForm._id
            });
            return newQuestion.save();
        }));

        newForm.questions = createdQuestions.map(q => q._id);
        await newForm.save();

        res.status(201).json({ message: 'Form created successfully', formId: newForm._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getForm = async (req, res) => {
    try {
        const form = await Form.findById(req.params.id).populate('questions');
        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }
        res.status(200).json(form);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const submitResponse = async (req, res) => {
    try {
        const { answers } = req.body;
        const newResponse = new Response({ formId: req.params.id, answers });
        await newResponse.save();
        res.status(201).json({ message: 'Response saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};