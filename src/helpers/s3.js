const S3 = require('aws-sdk/clients/s3');
const fs = require('fs');

const bucket = process.env.AWS_BUCKET;
const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const storage = new S3({
    region,
    accessKeyId,
    secretAccessKey
});

const getBuckets = () => {
    return storage.listBuckets().promise();
}

const uploadToBucket = (file) => {
    const stream = fs.createReadStream(file.tempFilePath);
    const params = {
        Bucket: bucket,
        Key: file.name,
        Body: stream
    };

    return storage.upload(params).promise();
}

module.exports = {
    getBuckets,
    uploadToBucket
}