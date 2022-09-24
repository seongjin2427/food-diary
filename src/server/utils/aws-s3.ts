import AWS from 'aws-sdk';

export const configKey = {
  s3AccessKey: process.env.AWS_ACCESS_KEY as string,
  s3SecretKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  s3BucketName: process.env.AWS_S3_BUCKET_NAME as string,
  s3Region: 'ap-northeast-2',
};

const s3 = new AWS.S3({
  region: configKey.s3Region,
  accessKeyId: configKey.s3AccessKey,
  secretAccessKey: configKey.s3SecretKey,
});

export default s3;
