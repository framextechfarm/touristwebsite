const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
    try {
        const {
            tripDate,
            nights,
            category,
            totalPersons,
            males,
            females,
            children,
            mobileNumber,
            needCab,
            location
        } = req.body;

        // 1. Save to Database
        const enquiry = await prisma.enquiry.create({
            data: {
                tripDate,
                nights: parseInt(nights),
                category,
                totalPersons: parseInt(totalPersons),
                males: parseInt(males || 0),
                females: parseInt(females || 0),
                children: parseInt(children || 0),
                mobileNumber: mobileNumber,
                needCab: needCab === 'yes' || needCab === true,
                location,
                status: 'new'
            }
        });

        res.status(201).json({ 
            success: true, 
            message: "Enquiry submitted successfully!",
            id: enquiry.id 
        });
    } catch (error) {
        console.error("Enquiry submission failed:", error);
        res.status(500).json({ error: "Failed to submit enquiry" });
    }
});

module.exports = router;
