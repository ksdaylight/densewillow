interface FrontendLayoutProps {
    children: React.ReactNode;
}
const FrontendLayout = async ({ children }: FrontendLayoutProps) => {
    return <div className="min-h-scree">{children}</div>;
};

export default FrontendLayout;
