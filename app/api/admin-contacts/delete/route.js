import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const key = searchParams.get('key');

    if (!key) {
      return new Response(JSON.stringify({ error: 'Key is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
    };

    await s3.send(new DeleteObjectCommand(params));

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error deleting from S3:', err);
    return new Response(JSON.stringify({ error: 'Failed to delete submission' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
