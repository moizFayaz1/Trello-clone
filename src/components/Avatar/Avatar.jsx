

export const Avatar = ({ children, className = '', size = 'w-8 h-8' }) => (
    <div className={`${size} rounded-full flex items-center justify-center ${className}`}>
      {children}
    </div>
  );