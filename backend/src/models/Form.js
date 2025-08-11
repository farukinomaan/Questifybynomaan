/**
 * @copyright Nomaan Faruki - 2025
 */

import mongoose from 'mongoose';

const formSchema= new mongoose.Schema({
    title:{ type:String, required:true},
    headerImage:{type:String},
    questions:[{type: mongoose.Schema.Types.ObjectId, ref:'Question'}],
},{timestamps: true});

const Form = mongoose.model('Form', formSchema);
export default Form;