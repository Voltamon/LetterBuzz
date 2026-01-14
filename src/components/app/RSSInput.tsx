import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Rss } from "lucide-react";
import { toast } from "sonner";

interface RSSInputProps {
    onGenerate: (url: string) => void;
    isLoading: boolean;
}

const RSSInput = ({ onGenerate, isLoading }: RSSInputProps) => {
    const [url, setUrl] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!url) {
            toast.error("Please enter a valid RSS URL");
            return;
        }
        onGenerate(url);
    };

    return (
        <div className="w-full max-w-2xl mx-auto space-y-8 animate-float">
            <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center p-4 rounded-full bg-primary/10 mb-4">
                    <Rss className="w-12 h-12 text-primary" />
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-foreground">
                    Transform Your Newsletter
                </h1>
                <p className="text-muted-foreground text-lg max-w-lg mx-auto">
                    Drop in your RSS feed and let our AI generate engaging topics and drafts for your next issue.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent opacity-25 group-hover:opacity-50 blur transition duration-200 rounded-lg"></div>
                <div className="relative flex items-center bg-card p-2 rounded-lg border border-border shadow-2xl">
                    <Input
                        type="url"
                        placeholder="https://your-newsletter.com/feed.xml"
                        className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 h-12 text-lg"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        disabled={isLoading}
                    />
                    <Button
                        type="submit"
                        size="lg"
                        disabled={isLoading}
                        className="h-12 px-8 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 shadow-lg hover:shadow-primary/25"
                    >
                        {isLoading ? (
                            <span className="flex items-center gap-2">
                                Generating...
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                Generate <ArrowRight className="w-5 h-5" />
                            </span>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default RSSInput;
