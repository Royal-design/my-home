interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const LandingLayout = ({ children, className }: LayoutProps) => {
  return (
    <div className="max-w-[1440px] mx-auto py-8">
      <div className={`max-w-[90%] mx-auto ${className ?? ""}`}>{children}</div>
    </div>
  );
};
