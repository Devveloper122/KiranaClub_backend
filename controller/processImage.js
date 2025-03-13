const axios = require("axios");
const { imageSizeFromFile } = require('image-size/fromFile');
const fs = require("fs");
const path = require("path");
const Job = require("../models/jobModel.js");
const Store = require("../models/storeModel.js");


//  1). Image Processing Function:
const processImages = async (jobId) => {

    try {
        const job = await Job.findById(jobId);
        if (!job) return;

        console.log(`Processing Job ID: ${jobId}`);

        let errors = [];

        for (const visit of job.visits) {

            // Checking if store_id exists in the database:
            const storeExists = await Store.exists({ StoreID: visit.store_id });

            if (!storeExists) {
                console.log(`StoreID ${visit.store_id} not found in database`);
                errors.push({
                    store_id: visit.store_id,
                    error: "Store ID not found in database"
                });

                // Skip processing images for this store
                continue; 
            }

            // Taking Flag to check if any image in this store_id failed:
            let storeFailed = false;
            let storeErrorMessage = "";

            for (const image of visit.images) {
                try {

                    // Downloading image
                    const response = await axios({
                        url: image.url,
                        responseType: "arraybuffer"
                    });

                    // Save image temporarily
                    const imagePath = path.join(__dirname, "temp_image.jpg");
                    fs.writeFileSync(imagePath, response.data);

                    // Get image dimensions
                    const dimensions = await imageSizeFromFile(imagePath);
                    console.log(dimensions.width, dimensions.height)

                    // deleting temp file
                    fs.unlinkSync(imagePath);

                    // Simulate GPU processing delay (0.1 to 0.4 sec)
                    const delay = Math.random() * (400 - 100) + 100;
                    await new Promise(resolve => setTimeout(resolve, delay));

                    // Update image metadata
                    image.width = dimensions.width;
                    image.height = dimensions.height;
                    image.perimeter = 2 * (dimensions.width + dimensions.height);

                } catch (err) {
                    image.error = err.message;
                    storeFailed = true;
                    storeErrorMessage = `Failed to process images for store ${visit.store_id}`;
                    console.log(`Error processing image ${image.url}: ${err.message}`);
                }
            }

            // If any image failed in this store_id, add to failedStoreIds
            if (storeFailed) {
                errors.push({
                    store_id: visit.store_id,
                    error: storeErrorMessage
                });
            }
        }

        // Convert Set to Array and update errors field
        job.errors = errors;

        // Update job status
        job.status = errors.length > 0 ? "failed" : "completed";

        await job.save();
        console.log(`Job ${jobId} processed successfully`);

    } catch (error) {
        console.log(`Failed to process job ${jobId}:`, error.body);
    }
};

module.exports = processImages;
