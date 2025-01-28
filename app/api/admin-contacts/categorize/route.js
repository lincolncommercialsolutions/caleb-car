import { S3Client, PutObjectTaggingCommand, GetObjectTaggingCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

export async function POST(req) {
  try {
    const { key, category } = await req.json();

    if (!key || !category) {
      return new Response(JSON.stringify({ error: 'Key and category are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
      Tagging: {
        TagSet: [
          {
            Key: 'Category',
            Value: category,
          },
        ],
      },
    };

    await s3.send(new PutObjectTaggingCommand(params));

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error categorizing submission:', err);
    return new Response(JSON.stringify({ error: 'Failed to categorize submission' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function GET(req) {
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

    const data = await s3.send(new GetObjectTaggingCommand(params));
    const categoryTag = data.TagSet?.find(tag => tag.Key === 'Category');

    return new Response(JSON.stringify({ category: categoryTag?.Value || 'Uncategorized' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error getting category:', err);
    return new Response(JSON.stringify({ category: 'Uncategorized' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
