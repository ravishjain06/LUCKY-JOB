import { application } from "express";
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    requirements:[{      //Skills
        type:String
    }],
    salary:{
        type:String,
        required:true
    },
    experienceLevel:{
        type:Number,
        required:true,
    },
    location:{
        type: String,
        required: true
    },
    position:{            //Opening kitni h
        type:String,
        required:true
    },
    jobType:{            //Opening kitni h
        type:String,
        required:true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true
    }
    ,
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    application: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
    }],
    
},{timestamps:true})

export const Job = mongoose.model('Job',jobSchema)