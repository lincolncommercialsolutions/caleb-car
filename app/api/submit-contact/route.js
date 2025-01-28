import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

export async function POST(req) {
  try {
    const data = await req.json();
    
    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }), 
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Create human-readable contact submission content
    const readableContent = `
Contact Form Submission
======================
Date: ${new Date().toLocaleString()}

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Service Interest: ${data.service || 'Not specified'}

Message:
${data.message}
    `.trim();

    // Generate unique filename with timestamp
    const timestamp = Date.now();
    const sanitizedName = data.name.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 30);
    
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `contacts/contact-${timestamp}-${sanitizedName}.txt`,
      Body: readableContent,
      ContentType: 'text/plain',
      Metadata: {
        'submitter-email': data.email,
        'submission-date': new Date().toISOString()
      }
    };

    await s3.send(new PutObjectCommand(params));
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error uploading to S3:', err);
    return new Response(JSON.stringify({ error: 'Failed to submit' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
