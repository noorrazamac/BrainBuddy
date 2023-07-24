const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const AWS = require('aws-sdk');
const ffmpegPath = require('ffmpeg-static');

AWS.config.update({
  region: 'YOUR_AWS_REGION', 
  accessKeyId: 'YOUR_ACCESS_KEY_ID', 
  secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
});

const s3 = new AWS.S3();
const bucketName = 'YOUR_S3_BUCKET_NAME'; 

async function checkVideoExists(topic) {
  const videoKey = `videos/${topic}.mp4`;

  try {
    // Check if the video exists in S3
    await s3.headObject({ Bucket: bucketName, Key: videoKey }).promise();
    return `https://${bucketName}.s3.amazonaws.com/${videoKey}`;
  } catch (err) {
      if (err.code === 'NotFound') {
        // Video does not exist in S3
        return null;
    }
    throw err;
  }
}

async function createVideo(topic) {
  const videoURL = await checkVideoExists(topic);

  if (videoURL) {
    console.log(`Video "${topic}.mp4" already exists. Streaming URL: ${videoURL}`);
    return;
  }

  const outputFileName = path.join(__dirname, `videos/${topic}.mp4`);

  // FFMpeg command to create the video
  const ffmpegArgs = [
    '-f', 'lavfi',
    '-i', 'color=c=black:s=1280x720:r=30',
    '-vf', `drawtext=text='${topic}':x=(w-text_w)/2:y=(h-text_h)/2:fontsize=72:fontcolor=white`,
    '-t', '10',
    outputFileName
  ];

  // Execute FFMpeg using child_process.spawn
  const ffmpegProcess = spawn(ffmpegPath, ffmpegArgs);

  ffmpegProcess.stdout.on('data', (data) => {
    console.log(data.toString());
  });

  ffmpegProcess.stderr.on('data', (data) => {
    console.error(data.toString());
  });

  ffmpegProcess.on('error', (err) => {
    console.error('Error occurred while running FFMpeg:', err);
  });

  ffmpegProcess.on('close', async (code) => {
    if (code === 0) {
      console.log(`Video "${topic}.mp4" has been created successfully.`);

      // Upload the video to S3
      const videoKey = `videos/${topic}.mp4`;
      const videoFile = fs.readFileSync(outputFileName);

      try {
        await s3.putObject({ Bucket: bucketName, Key: videoKey, Body: videoFile }).promise();
        console.log(`Video "${topic}.mp4" has been uploaded to S3.`);
      } catch (err) {
        console.error('Error occurred while uploading the video to S3:', err);
      }
    } else {
      console.error(`Video creation process exited with code ${code}.`);
    }
  });
}

const topic = 'YOUR_TOPIC_HERE';
createVideo(topic);