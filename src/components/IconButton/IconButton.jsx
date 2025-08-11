import DESIGN_TOKENS from "@/styles/tokens";

export const IconButton = ({ icon: Icon, className = '', onClick, children }) => (
    <button 
      className={`${DESIGN_TOKENS.interactive.button} ${className}`}
      onClick={onClick}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );