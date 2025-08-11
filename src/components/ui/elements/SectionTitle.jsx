import DESIGN_TOKENS from "@/styles/tokens";


export const SectionTitle = ({ icon: Icon, children, className = "" }) => (
  <div className={`${DESIGN_TOKENS.layout.flexCenter} mb-3 ${className}`}>
    {Icon && <Icon className="w-5 h-5 mr-2 " />}
    <h2 className=" font-medium">{children}</h2>
  </div>
);