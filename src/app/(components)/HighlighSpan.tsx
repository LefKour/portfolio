const HighlightSpan = ({ children }: { children: React.ReactNode }) => {
    return (
        <span className={"font-bold text-white cursor-pointer hover:text-blue-500 transition"}>
            {children}
        </span>
    );
};

export default HighlightSpan;