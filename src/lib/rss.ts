
export async function fetchAndParseRSS(url: string) {
    try {
        // Use allorigins to bypass CORS
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
        const response = await fetch(proxyUrl);
        const data = await response.json();

        if (!data.contents) {
            throw new Error("Failed to fetch RSS feed content");
        }

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data.contents, "text/xml");

        const items = Array.from(xmlDoc.querySelectorAll("item, entry")).slice(0, 10).map(item => {
            const title = item.querySelector("title")?.textContent || "";
            const description = item.querySelector("description, summary")?.textContent || "";
            const content = item.querySelector("content\\:encoded, content")?.textContent || "";
            const pubDate = item.querySelector("pubDate, published")?.textContent || "";
            const link = item.querySelector("link")?.textContent || "";

            return {
                title,
                description,
                content: content || description, // Fallback to description if content is missing
                pubDate,
                link
            };
        });

        return items;
    } catch (error) {
        console.error("Error fetching RSS feed:", error);
        throw error;
    }
}
