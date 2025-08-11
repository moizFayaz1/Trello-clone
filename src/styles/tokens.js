// src/styles/tokens.js
export const DESIGN_TOKENS = {
    colors: {
      primary: 'bg-[#579DFF] hover:bg-[#417FD1]',
      secondary: 'bg-gray-700 hover:bg-gray-600',
      surface: 'bg-[#1D2125]',
      overlay: "bg-[#282E33]",
      background: 'bg-gray-900',
      border: 'border-gray-700',
      text: {
        primary: 'text-white',
        secondary: 'text-gray-300',
        muted: 'text-gray-400'
      },
      status: {
        success: 'bg-green-600',
        warning: 'bg-yellow-600',
        error: 'bg-red-600',
        info: 'bg-blue-600'
      }
    },
    spacing: {
      container: 'p-8',
      section: 'mb-4',
      item: 'mb-4',
      compact: 'p-3',
      comfortable: 'px-3 py-2',
      tight: 'p-1',
      loose: 'p-6'
    },
    layout: {
      sidebar: 'w-74',
      flexCenter: 'flex items-center',
      flexBetween: 'flex items-center justify-between',
      flexCol: 'flex flex-col',
      grid: 'grid grid-cols-4 gap-4',
      fullHeight: 'min-h-screen'
    },
    interactive: {
      button: 'rounded cursor-pointer transition-colors',
      navItem: 'hover:bg-[#272d33] rounded cursor-pointer ',
      input: 'focus:outline-none focus:ring-2 focus:ring-blue-500 rounded',
      card: 'hover:shadow-lg transition-shadow',
      disabled: 'opacity-50 cursor-not-allowed'
    },
    typography: {
      heading: {
        h1: 'text-2xl font-semibold',
        h2: 'text-lg font-medium',
        h3: 'text-base font-medium'
      },
      body: {
        large: 'text-base',
        normal: 'text-sm',
        small: 'text-xs'
      },
      weight: {
        light: 'font-light',
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold'
      }
    },
    sizing: {
      avatar: {
        small: 'w-6 h-6',
        medium: 'w-8 h-8',
        large: 'w-12 h-12'
      },
      icon: {
        small: 'w-3 h-3',
        medium: 'w-4 h-4',
        large: 'w-5 h-5',
        xlarge: 'w-6 h-6'
      },
      input: {
        height: 'h-10',
        search: 'w-80'
      }
    },
    animation: {
      transition: 'transition-all duration-200 ease-in-out',
      fadeIn: 'animate-fadeIn',
      slideIn: 'animate-slideIn',
      bounce: 'animate-bounce'
    },
    shadows: {
      card: 'shadow-md hover:shadow-lg',
      button: 'shadow-sm hover:shadow-md',
      modal: 'shadow-2xl'
    },
    borders: {
      radius: {
        small: 'rounded',
        medium: 'rounded-md',
        large: 'rounded-lg',
        full: 'rounded-full'
      },
      width: {
        thin: 'border',
        medium: 'border-2',
        thick: 'border-4'
      }
    }
  };
  
  // Theme variants for different modes
  export const THEMES = {
    dark: {
      ...DESIGN_TOKENS,
      colors: {
        ...DESIGN_TOKENS.colors,
        background: 'bg-gray-900',
        surface: 'bg-gray-800',
        border: 'border-gray-700'
      }
    },
    light: {
      ...DESIGN_TOKENS,
      colors: {
        ...DESIGN_TOKENS.colors,
        background: 'bg-white',
        surface: 'bg-gray-50',
        border: 'border-gray-200',
        text: {
          primary: 'text-gray-900',
          secondary: 'text-gray-600',
          muted: 'text-gray-400'
        }
      }
    }
  };
  
  // Utility functions for token usage
  export const getTokenValue = (path, tokens = DESIGN_TOKENS) => {
    return path.split('.').reduce((obj, key) => obj?.[key], tokens);
  };
  
  // Example: getTokenValue('colors.primary') returns 'bg-blue-600 hover:bg-blue-700'
  
  export default DESIGN_TOKENS;