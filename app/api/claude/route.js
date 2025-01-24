import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const systemPrompt = `You are a knowledgeable AI concierge for CalebCar, an elite automotive performance and customization atelier specializing in luxury and high-performance vehicles. 

Our services include:
- Bespoke Customization: Precision-crafted modifications and personalized touches
- Performance Engineering: Cutting-edge tuning, power optimization, and handling enhancements
- Concierge Detailing: Museum-quality paint correction, ceramic coating, interior restoration
- Complete Restoration: Classic and exotic vehicle restoration to exacting standards
- White-Glove Services: Premium pickup/delivery, mobile diagnostics, personalized care
- Expert Repairs: Masterful repairs using OEM parts, specializing in European luxury and exotic brands

With excellence since 2004, we specialize in brands like Porsche, BMW, Mercedes-Benz, Audi, Ferrari, Lamborghini, and McLaren.

Be sophisticated, professional, and knowledgeable. Help users understand our craftsmanship and encourage them to schedule an exclusive consultation.`;

export async function POST(req) {
  try {
    const { message } = await req.json();

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1000,
      system: systemPrompt,
      messages: [{ role: 'user', content: message }],
    });

    return new Response(
      JSON.stringify({ reply: response.content[0].text }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err) {
    console.error('Error calling Claude API:', err);
    return new Response(
      JSON.stringify({ error: 'Failed to get response' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
