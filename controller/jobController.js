const Job = require("../models/jobModel.js");
const processImages = require("./processImage.js");


// 1). job submitter:
const jobSubmitter =  async (req, res)=>{

    try {
        // object destructuring:
        const {count, visits} = req.body;
        
        // checking conditions:
        if (!count || !Array.isArray(visits) || (count !== visits.length)) {
            return res.status(400).json({ error: "11" });
        }
        
        // Convert image URLs into objects:
        const formattedVisits = visits.map(visit => ({
            store_id: visit.store_id,
            images: visit.image_url.map(imageUrl => ({ url: imageUrl })),
            visit_time: visit.visit_time
        }));
        
        // Create and save the job
        const newJob = new Job({
            count,
            visits: formattedVisits,
            status: "pending"
        });

        try {
            await newJob.save();

            // processing images asynchronously:
            processImages(newJob._id);

            res.status(201).json({ job_id: newJob._id });
        } 
        catch (error) {
            console.log(error);
            res.status(400).json({message: error.body});
        }

    } 
    catch (error) {
        console.log(error);
        res.status(400).json({message: error.body});
    }
};

// 2).get Job status:
const jobStatus = async (req, res)=>{
    try {
        const { jobid } = req.query;
        const job = await Job.findById(jobid);

        if (!job) {
            return res.status(400).json({});
        }

        if(job.status === "failed"){
            return res.json({
                status: job.status,
                job_id: job._id,
                error: job.errors
            });
        }

        res.status(200).json({
            status: job.status,
            job_id: job._id,
        });

    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
}

module.exports = {
    jobSubmitter,
    jobStatus
};