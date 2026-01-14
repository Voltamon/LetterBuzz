import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface TopicSelectorProps {
    topics: string[];
    onSelect: (topic: string) => void;
    isLoading: boolean;
}

const TopicSelector = ({ topics, onSelect, isLoading }: TopicSelectorProps) => {
    return (
        <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center p-3 rounded-full bg-accent/10 mb-2">
                    <Sparkles className="w-8 h-8 text-accent" />
                </div>
                <h2 className="text-3xl font-bold text-foreground">Choose a Topic</h2>
                <p className="text-muted-foreground">
                    We found some interesting angles from your feed. Pick one to start writing.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
                {topics.map((topic, index) => (
                    <Button
                        key={index}
                        variant="outline"
                        className="h-auto p-6 justify-start text-left hover:border-primary hover:bg-primary/5 group transition-all duration-300 border-2"
                        onClick={() => onSelect(topic)}
                        disabled={isLoading}
                    >
                        <div className="flex items-start gap-4">
                            <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                                {index + 1}
                            </span>
                            <div className="space-y-1">
                                <span className="text-lg font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                                    {topic}
                                </span>
                            </div>
                        </div>
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default TopicSelector;
