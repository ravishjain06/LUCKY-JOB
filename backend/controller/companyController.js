import mongoose from "mongoose";
import { Company } from "../models/companySchema.js";

export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body

        if (!companyName) {
            return res.status(401).json({
                success: false,
                message: "Company name is required"
            })
        }
        let company = await Company.findOne({ name: companyName })

        if (company) {
            return res.status(401).json({
                success: false,
                message: "Company had already been register with this name"
            })
        }

        company = await Company.create({
            name: companyName,
            userId: req.id
        })

        return res.status(201).json({
            success: true,
            message: "Company Register Successfully",
            company
        })
    } catch (error) {
        console.log(error);

    }
}

export const getCompany = async (req, res) => {
    try {
        //We want only loggedIn user company
        const userId = req.id

        const company = await Company.find({ userId })
        if (!company) {
            return res.status(401).json({
                success: false,
                message: "Company Not found"
            })
        }

        return res.status(201).json({
            success: true,
            company
        })

    } catch (error) {
        console.log(error);
    }
}

export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;

        let company = await Company.findById(companyId)

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "No Company found"
            })
        }
        return res.status(201).json({
            success: true,
            company
        })
    } catch (error) {
        console.log(error);

    }


}

export const updateCompany = async (req, res) => {
    try {

        const { name, description, location, website,logo } = req.body

        const updatedData = { name, description, location, website, logo }

        const company = await Company.findByIdAndUpdate(req.params.id, updatedData, { new: true })

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "No Company found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Company Updated.",
                        company
        })

    } catch (error) {
        console.log(error);
    }
}