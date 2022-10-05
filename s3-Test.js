require('dotenv').config();
const AWS = require('aws-sdk');
// S3 setup
const bucketName = "10467874-wikipedia-store";
const s3 = new AWS.S3({ apiVersion: "2006-03-01" });
s3.createBucket({ Bucket: bucketName })
    .promise()
    .then(() => console.log(`Created bucket: ${bucketName}`))
    .catch((err) => {
        // We will ignore 409 errors which indicate that the bucket already exists
        if (err.statusCode !== 409) {
            console.log(`Error creating bucket: ${err}`);
        }
    });
//Basic key/key - fixed here, modify for the route code
const key = 'Woof';
const s3Key = `wikipedia-${key}`;
//Create params for putObject call
const objectParams = { Bucket: bucketName, Key: s3Key, Body: 'Sam Wonder Dog' };
//Create object upload promise
s3.putObject(objectParams)
    .promise()
    .then(() => {
        console.log(
            `Successfully uploaded data to ${bucketName}/${s3Key}`
        );
    })
    .catch((err) => {
        console.log(err, err.stack);
    });