type NavigationLinksBtnProps = {
    text: string;
    isBlue?: boolean;
};
export default function NavigationLinksButton({ text, isBlue }: NavigationLinksBtnProps) {
    return (
        <button className={`py-2 px-4 rounded-xl ${isBlue ? "bg-my-blue text-white" : "bg-white"}`}>
            {text}
        </button>
    );
}
