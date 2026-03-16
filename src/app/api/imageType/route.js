import axios from 'axios';
import { NextResponse } from 'next/server';
// https://media.istockphoto.com/id/476116580/photo/sycamore-tree-in-summer-field-at-sunset-england-uk.jpg?s=612x612&w=0&k=20&c=KNQmjVuAJy8aCYC0RIZyR3GfD3w92giM_UVdWP5jcIk=

export async function POST(request) {


  const invokeUrl = "https://integrate.api.nvidia.com/v1/chat/completions";
  const stream = true;


  const headers = {
    "Authorization": `Bearer ${process.env.NVIDIA_API_KEY}`,
    "Accept": stream ? "text/event-stream" : "application/json"
  };


  // Get image URL from request body (or use default)
  const body = await request.json()
  const imageUrl = body.imageUrl || "https://earth5r.org/wp-content/uploads/2024/03/8-Major-Sources-Of-Air-Pollution-1024x639.webp";


  const payload = {
    "model": "meta/llama-3.2-11b-vision-instruct",
    "messages": [{
      "role": "user", "content": `Tell me which pollution?? Only in two word  <img src="${imageUrl} />`
    }],
    "max_tokens": 512,
    "temperature": 1.00,
    "top_p": 1.00,
    "frequency_penalty": 0.00,
    "presence_penalty": 0.00,
    "stream": stream
  };
  try {
    const response = await axios.post(invokeUrl, payload, {
      headers,
      responseType: 'stream'   // ✅ Tell axios to treat response as a stream
    });

    // ✅ Collect all chunks and assemble full message
    let fullContent = '';

    await new Promise((resolve, reject) => {
      response.data.on('data', (chunk) => {
        const lines = chunk.toString().split('\n');

        for (const line of lines) {
          // SSE lines start with "data: "
          if (!line.startsWith('data: ')) continue;

          const jsonStr = line.replace('data: ', '').trim();

          // Stream ends with "data: [DONE]"
          if (jsonStr === '[DONE]') {
            resolve();
            return;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const delta = parsed?.choices?.[0]?.delta?.content;
            if (delta) fullContent += delta;   // ✅ Append each token
          } catch (e) {
            // skip malformed chunks
          }
        }
      });

      response.data.on('end', resolve);
      response.data.on('error', reject);
    });

    // ✅ Return the fully assembled response
    return Response.json({ result: fullContent });

  } catch (error) {
    console.error("NVIDIA API error:", error.response?.data || error.message);
    return Response.json(
      { error: error.response?.data || error.message },
      { status: error.response?.status || 500 }
    );
  }
} 