import AWS from 'aws-sdk';

export const configKey = {
  s3AccessKey: process.env.AWS_A_KEY as string,
  s3SecretKey: process.env.AWS_S_A_KEY as string,
  s3BucketName: process.env.S3_B_NAME as string,
  s3Region: process.env.S3_R as string,
};

const s3 = new AWS.S3({
  region: configKey.s3Region,
  accessKeyId: configKey.s3AccessKey,
  secretAccessKey: configKey.s3SecretKey,
});

export default s3;
