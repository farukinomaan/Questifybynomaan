/**
 * @copyright Nomaan Faruki - 2025
 */

import mongoose from 'mongoose';

const responseSchema = new mongoose.Schema({
    formId:{ type: mongoose.Schema.Types.ObjectId, ref:'Form', required: true},
    answers: [{
        questionId: { type: String, required: true },
        answer: mongoose.Schema.Types.Object,
    }],
}, {timestamps: true});

const Response = mongoose.model('Response', responseSchema);
export default Response;