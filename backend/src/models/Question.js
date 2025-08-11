/**
 * @copyright Nomaan Faruki - 2025
 */

import mongoose from 'mongoose';

const questionSchema= new mongoose.Schema({
    formId:{ type: mongoose.Schema.Types.ObjectId, ref:'Form'},
    type: {type: String, enum:['categorize','cloze','comprehension'], required:true},
    questionText: {type:String},
    imageUrl:{type: String},
    // 'data' storing unique prop of each ques type
    data: mongoose.Schema.Types.Mixed,
},{timestamps:true});

const Question = mongoose.model('Question', questionSchema);
export default Question;