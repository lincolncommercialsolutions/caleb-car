import { S3Client, ListObjectsV2Command, GetObjectCommand, GetObjectTaggingCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get('action');

    if (action === 'list') {
      const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Prefix: 'contacts/',
      };
      
      const data = await s3.send(new ListObjectsV2Command(params));
      
      if (!data.Contents || data.Contents.length === 0) {
        return new Response(JSON.stringify([]), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      // Get tags for each object to include category
      const contactsWithCategories = await Promise.all(
        data.Contents.map(async (obj) => {
          try {
            const tagData = await s3.send(new GetObjectTaggingCommand({
              Bucket: process.env.AWS_S3_BUCKET_NAME,
              Key: obj.Key,
            }));
            const categoryTag = tagData.TagSet?.find(tag => tag.Key === 'Category');
            return {
              key: obj.Key,
              lastModified: obj.LastModified,
              category: categoryTag?.Value || 'Uncategorized'
            };
          } catch (err) {
            return {
              key: obj.Key,
              lastModified: obj.LastModified,
              category: 'Uncategorized'
            };
          }
        })
      );
      
      return new Response(JSON.stringify(contactsWithCategories), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else if (action === 'get') {
      const key = searchParams.get('key');
      const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: key,
      };
      
      const data = await s3.send(new GetObjectCommand(params));
      const body = await data.Body.transformToString();
      
      return new Response(JSON.stringify({ content: body }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Invalid action' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error accessing S3:', err);
    return new Response(JSON.stringify({ error: 'Failed to access contacts' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
