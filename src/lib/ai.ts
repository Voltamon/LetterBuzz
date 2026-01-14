
export interface GeneratedTopic {
    topic: string;
    draft: string;
}

export async function generateTopicsAndDrafts(rssItems: any[]): Promise<GeneratedTopic[]> {
    const token = import.meta.env.VITE_GITHUB_TOKEN;

    if (!token) {
        throw new Error("VITE_GITHUB_TOKEN is missing in environment variables. Please add it to your .env file.");
    }

    const prompt = `
    Analyze the following RSS feed items and generate exactly 5 trending and SEO-optimised topics based on the content.
    For each topic, write a comprehensive newsletter draft.
    
    The draft should include:
    - An engaging Introduction
    - Key Points
    - A Conclusion or Call to Action
    
    Return the output strictly as a valid JSON object with a single key "results" which is an array of objects.
    Each object must have two fields: "topic" (string) and "draft" (string, markdown format).
    
    RSS Items:
    ${JSON.stringify(rssItems, null, 2)}
    `;

    const maxRetries = 3;
    let attempt = 0;

    while (attempt < maxRetries) {
        try {
            const response = await fetch("https://models.inference.ai.azure.com/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    model: "gpt-4o-mini",
                    messages: [
                        { role: "system", content: "You are an expert newsletter curator and writer. You respond in JSON." },
                        { role: "user", content: prompt }
                    ],
                    temperature: 0.7 + (attempt * 0.1), // Increase temp slightly on retries
                    response_format: { type: "json_object" }
                })
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(`AI API Error: ${response.status} - ${errorData}`);
            }

            const data = await response.json();
            const content = data.choices[0].message.content;

            try {
                const parsed = JSON.parse(content);
                const results = parsed.results;

                if (Array.isArray(results) && results.length === 5) {
                    return results;
                }

                console.warn(`Attempt ${attempt + 1}: Received ${results?.length || 0} topics, expected 5. Retrying...`);
            } catch (e) {
                console.error("Failed to parse AI response as JSON", content);
            }
        } catch (error) {
            console.error(`Attempt ${attempt + 1} failed:`, error);
        }

        attempt++;
    }

    throw new Error(`Failed to generate exactly 5 topics after ${maxRetries} attempts.`);
}
