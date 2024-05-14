const express = require('express');
const cors = require('cors');
// const jwt = require('jsonwebtoken');
// const cookieParser = require('cookie-parser');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:5174',
    ],
    credentials: true
}));

app.use(express.json());
// app.use(cookieParser());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ny1xaie.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)

        // database collection 
        const jobsCollection = client.db('assignment_11').collection('Jobs');
        const postedJobsCollection = client.db('assignment_11').collection('postedjobs');
        const applyJobsCollection = client.db('assignment_11').collection('applyJobs');



        // service related api

        // get all jobs
        app.get('/jobs', async (req, res) => {
            let query = {};
            if (req.query?.job_type) {
                query = { job_type: req.query.job_type }
            }
            const result = await jobsCollection.find(query).toArray();
            res.send(result);
        })

        // get single job data
        app.get('/jobs/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await jobsCollection.findOne(query);
            res.send(result);
        })

        // Postedjobs 
        app.post('/postedjobs', async (req, res) => {
            const newItems = req.body;
            const result = await postedJobsCollection.insertOne(newItems);
            res.send(result);
        })

        // get all postedjobs
        app.get('/postedjobs', async (req, res) => {
            let query = {};
            if (req.query?.email) {
                query = { email: req.query.email }
            }
            const result = await postedJobsCollection.find(query).toArray();
            res.send(result);
        })

        // get single postedjobs data
        app.get('/postedjobs/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await postedJobsCollection.findOne(query);
            res.send(result);
        })

        // delete posted jobs
        app.delete('/postedjobs/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await postedJobsCollection.deleteOne(query);
            res.send(result);
        })

        // update posted jobs information
        app.put('/postedjobs/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) }
            const options = { upsert: true };
            const updatedJobs = req.body;
            console.log(updatedJobs);

            const jobs = {
                $set: {
                    job_title: updatedJobs.job_title,
                    job_type: updatedJobs.job_type,
                    banner: updatedJobs.banner,
                    salary_range: updatedJobs.salary_range,
                    job_posting_date: updatedJobs.job_posting_date,
                    application_deadline: updatedJobs.application_deadline,
                    job_applicants_number: updatedJobs.job_applicants_number,
                    description: updatedJobs.description,
                    name: updatedJobs.name,
                    email: updatedJobs.email,
                }
            }

            const result = await postedJobsCollection.updateOne(filter, jobs, options);
            res.send(result);

            // if (result.modifiedCount === 1) {
            //     const applyJobsFilter = { _id: new ObjectId(id) };
            //     const applyJobsUpdate = { $inc: { job_applicants_number: 1 } };
            //     await applyJobsCollection.updateOne(applyJobsFilter, applyJobsUpdate);
            // }
        })

        //apply job data post
        app.post('/applyJobs', async (req, res) => {
            const newItems = req.body;
            const result = await applyJobsCollection.insertOne(newItems);
            res.send(result);
        })

        // get applyjobs all data with use query
        app.get('/applyJobs', async (req, res) => {
            let query = {};
            if (req.query?.applyr_email) {
                query = { applyr_email: req.query.applyr_email }
            }
            const result = await applyJobsCollection.find(query).toArray();
            res.send(result);
        })

        // add a patch method
        app.patch('/postedjobs/:id', (req, res) => {
            const jobId = req.params.id;
            const filter = { _id: new ObjectId(jobId) };
            const update = { $inc: { job_applicants_number: 1 } };
            postedJobsCollection.updateOne(filter, update, (err, result) => {
                if (err) {
                    console.error('Error updating job application count:', err);
                    res.status(500).send('Error updating job application count');
                    return;
                }
                console.log('Job application count updated successfully');
                res.send('Job application count updated successfully');      
            });
        })


        // add a patch method
        app.patch('/jobs/:id', (req, res) => {
            const jobId = req.params.id;
            const filter = { _id: new ObjectId(jobId) };
            const update = { $inc: { job_applicants_number: 1 } };
            jobsCollection.updateOne(filter, update, (err, result) => {
                if (err) {
                    console.error('Error updating job application count:', err);
                    res.status(500).send('Error updating job application count');
                    return;
                }
                console.log('Job application count updated successfully');
                res.send('Job application count updated successfully');      
            });
        })



        // Send a ping to confirm a successful connection
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('doctor is running')
})

app.listen(port, () => {
    console.log(`Car Doctor Server is running on port ${port}`)
})