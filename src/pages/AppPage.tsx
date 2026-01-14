import { useState } from "react";
import RSSInput from "@/components/app/RSSInput";
import TopicSelector from "@/components/app/TopicSelector";
import MarkdownEditor from "@/components/app/MarkdownEditor";
import { toast } from "sonner";

type Step = "rss" | "topic" | "editor";

// Mock data/functions removed in favor of real implementation
import { fetchAndParseRSS } from "@/lib/rss";
import { generateTopicsAndDrafts, GeneratedTopic } from "@/lib/ai";

const AppPage = () => {
    const [step, setStep] = useState<Step>("rss");
    const [isLoading, setIsLoading] = useState(false);
    const [topics, setTopics] = useState<string[]>([]);
    const [selectedTopic, setSelectedTopic] = useState("");
    const [draftContent, setDraftContent] = useState("");
    const [generatedResults, setGeneratedResults] = useState<GeneratedTopic[]>([]);

    const handleGenerateTopics = async (url: string) => {
        setIsLoading(true);
        try {
            const rssItems = await fetchAndParseRSS(url);
            if (rssItems.length === 0) {
                toast.error("No items found in RSS feed");
                setIsLoading(false);
                return;
            }

            const results = await generateTopicsAndDrafts(rssItems);
            setGeneratedResults(results);
            setTopics(results.map(r => r.topic));
            setStep("topic");
            toast.success("Topics generated successfully!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to generate topics. Please check the URL or try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSelectTopic = (topic: string) => {
        setSelectedTopic(topic);

        // Find the pre-generated draft for this topic
        const result = generatedResults.find(r => r.topic === topic);
        if (result) {
            setDraftContent(result.draft);
            setStep("editor");
        } else {
            toast.error("Could not find draft for selected topic");
        }
    };

    const handleBackToTopics = () => {
        setStep("topic");
    };

    const handleAnalyzeMore = () => {
        setStep("rss");
        setSelectedTopic("");
        setDraftContent("");
        setGeneratedResults([]);
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col p-6 font-sans">
            <div className="flex-1 flex flex-col items-center justify-center max-w-7xl mx-auto w-full">
                {step === "rss" && (
                    <RSSInput onGenerate={handleGenerateTopics} isLoading={isLoading} />
                )}

                {step === "topic" && (
                    <TopicSelector
                        topics={topics}
                        onSelect={handleSelectTopic}
                        isLoading={isLoading}
                    />
                )}

                {step === "editor" && (
                    <MarkdownEditor
                        initialContent={draftContent}
                        topic={selectedTopic}
                        onBack={handleBackToTopics}
                        onAnalyzeMore={handleAnalyzeMore}
                    />
                )}
            </div>
        </div>
    );
};

export default AppPage;
