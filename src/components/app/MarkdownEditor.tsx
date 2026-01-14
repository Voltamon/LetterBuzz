import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Bold,
    Italic,
    List,
    ListOrdered,
    Link as LinkIcon,
    Eye,
    Edit2,
    Download,
    Copy,
    Check,
    ChevronLeft,
    Sparkles
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface MarkdownEditorProps {
    initialContent: string;
    topic: string;
    onBack: () => void;
    onAnalyzeMore: () => void;
}

const MarkdownEditor = ({ initialContent, topic, onBack, onAnalyzeMore }: MarkdownEditorProps) => {
    const [content, setContent] = useState(initialContent);
    const [isPrime, setIsPreview] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(content);
        setCopied(true);
        toast.success("Content copied to clipboard");
        setTimeout(() => setCopied(false), 2000);
    };

    const handleExport = () => {
        const blob = new Blob([content], { type: "text/markdown" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${topic.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast.success("File downloaded successfully");
    };

    const insertFormat = (prefix: string, suffix: string = "") => {
        const textarea = document.getElementById("markdown-editor") as HTMLTextAreaElement;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        const before = text.substring(0, start);
        const selection = text.substring(start, end);
        const after = text.substring(end);

        const newContent = `${before}${prefix}${selection}${suffix}${after}`;
        setContent(newContent);

        // Restore focus and selection
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + prefix.length, end + prefix.length);
        }, 0);
    };

    return (
        <div className="w-full max-w-6xl mx-auto space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <Button variant="ghost" onClick={onBack} className="gap-2">
                    <ChevronLeft className="w-4 h-4" /> Back to Topics
                </Button>
                <div className="flex items-center gap-2">
                    <Button
                        onClick={onAnalyzeMore}
                        className="bg-orange-500 hover:bg-orange-600 text-white border-orange-600 hover:border-orange-700 shadow-md hover:shadow-lg transition-all"
                    >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Analyze More
                    </Button>
                    <div className="w-px h-6 bg-border mx-2" />
                    <Button variant="outline" size="sm" onClick={handleCopy}>
                        {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                        Copy
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleExport}>
                        <Download className="w-4 h-4 mr-2" />
                        Export .md
                    </Button>
                </div>
            </div>

            <div className="bg-card rounded-xl border border-border shadow-xl overflow-hidden flex flex-col h-[calc(100vh-12rem)]">
                {/* Toolbar */}
                <div className="flex items-center justify-between p-2 border-b border-border bg-muted/30">
                    <div className="flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => insertFormat("**", "**")}
                            title="Bold"
                            disabled={isPrime}
                        >
                            <Bold className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => insertFormat("*", "*")}
                            title="Italic"
                            disabled={isPrime}
                        >
                            <Italic className="w-4 h-4" />
                        </Button>
                        <div className="w-px h-4 bg-border mx-2" />
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => insertFormat("- ")}
                            title="Bullet List"
                            disabled={isPrime}
                        >
                            <List className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => insertFormat("1. ")}
                            title="Numbered List"
                            disabled={isPrime}
                        >
                            <ListOrdered className="w-4 h-4" />
                        </Button>
                        <div className="w-px h-4 bg-border mx-2" />
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => insertFormat("[", "](url)")}
                            title="Link"
                            disabled={isPrime}
                        >
                            <LinkIcon className="w-4 h-4" />
                        </Button>
                    </div>

                    <div className="flex items-center bg-background rounded-lg border border-border p-1">
                        <Button
                            variant={!isPrime ? "secondary" : "ghost"}
                            size="sm"
                            onClick={() => setIsPreview(false)}
                            className="gap-2"
                        >
                            <Edit2 className="w-4 h-4" /> Edit
                        </Button>
                        <Button
                            variant={isPrime ? "secondary" : "ghost"}
                            size="sm"
                            onClick={() => setIsPreview(true)}
                            className="gap-2"
                        >
                            <Eye className="w-4 h-4" /> Preview
                        </Button>
                    </div>
                </div>

                {/* Editor/Preview Area */}
                <div className="flex-1 relative">
                    <div className={cn(
                        "absolute inset-0 transition-opacity duration-200",
                        isPrime ? "opacity-0 z-0 pointer-events-none" : "opacity-100 z-10"
                    )}>
                        <Textarea
                            id="markdown-editor"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full h-full resize-none p-6 font-mono text-base bg-background border-0 focus-visible:ring-0 rounded-none leading-relaxed"
                            placeholder="Start writing..."
                        />
                    </div>

                    <div className={cn(
                        "absolute inset-0 overflow-auto p-8 bg-background transition-opacity duration-200 prose prose-lg dark:prose-invert max-w-none",
                        isPrime ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                    )}>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {content}
                        </ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarkdownEditor;
