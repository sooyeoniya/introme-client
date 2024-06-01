type NavigationLinksBtnProps = {
    text: string;
    isBlue?: boolean;
    url?: string | null;
};
export default function NavigationLinksButton({ text, isBlue, url }: NavigationLinksBtnProps) {
    if (!url) return null;
    return (
        <a href={url} target="_blank" rel="noopener noreferrer">
            <button
                className={`py-2 px-4 rounded-xl ${isBlue ? "bg-my-blue text-white" : "bg-white"}`}
            >
                {text}
            </button>
        </a>
    );
}
