import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Plus, 
  Search, 
  Bell, 
  HelpCircle, 
  User,
  Settings,
  Users,
  Trello,
  Crown,
  Edit3,
  Lock
} from 'lucide-react';

// 1. DESIGN TOKENS - Centralized styling constants
const DESIGN_TOKENS = {
  colors: {
    primary: 'bg-blue-600 hover:bg-blue-700',
    secondary: 'bg-gray-700 hover:bg-gray-600',
    surface: 'bg-gray-800',
    background: 'bg-gray-900',
    border: 'border-gray-700',
    text: {
      primary: 'text-white',
      secondary: 'text-gray-300',
      muted: 'text-gray-400'
    }
  },
  spacing: {
    container: 'p-8',
    section: 'mb-8',
    item: 'mb-4',
    compact: 'p-3',
    comfortable: 'px-3 py-2'
  },
  layout: {
    sidebar: 'w-64',
    flexCenter: 'flex items-center',
    flexBetween: 'flex items-center justify-between',
    grid: 'grid grid-cols-4 gap-4'
  },
  interactive: {
    button: 'rounded cursor-pointer transition-colors',
    navItem: 'hover:bg-gray-700 rounded cursor-pointer',
    input: 'focus:outline-none focus:ring-2 focus:ring-blue-500'
  }
};

// 2. REUSABLE COMPONENTS - Component composition pattern
const Avatar = ({ children, className = '', size = 'w-8 h-8' }) => (
  <div className={`${size} rounded-full flex items-center justify-center ${className}`}>
    {children}
  </div>
);

const IconButton = ({ icon: Icon, className = '', onClick, children }) => (
  <button 
    className={`${DESIGN_TOKENS.interactive.button} ${className}`}
    onClick={onClick}
  >
    {Icon && <Icon className="w-4 h-4" />}
    {children}
  </button>
);

const NavItem = ({ icon: Icon, children, active = false, onClick, rightElement }) => {
  const baseClasses = `${DESIGN_TOKENS.layout.flexCenter} ${DESIGN_TOKENS.spacing.comfortable} ${DESIGN_TOKENS.interactive.navItem}`;
  const activeClasses = active ? 'text-white bg-blue-600' : DESIGN_TOKENS.colors.text.secondary;
  
  return (
    <div className={`${baseClasses} ${activeClasses} mb-1`} onClick={onClick}>
      {Icon && <Icon className="w-4 h-4 mr-3" />}
      <span className="text-sm flex-1">{children}</span>
      {rightElement}
    </div>
  );
};

const SectionHeader = ({ icon: Icon, children, className = '' }) => (
  <div className={`${DESIGN_TOKENS.layout.flexCenter} mb-6 ${className}`}>
    {Icon && <Icon className="w-5 h-5 mr-2 text-gray-400" />}
    <h2 className="text-lg font-medium">{children}</h2>
  </div>
);

const BoardCard = ({ title, backgroundImage, onClick }) => (
  <div className="relative group cursor-pointer" onClick={onClick}>
    <div 
      className="h-24 rounded bg-cover bg-center relative overflow-hidden"
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all"></div>
    </div>
    <div className="mt-2">
      <div className="text-sm font-medium">{title}</div>
    </div>
  </div>
);

// 3. CUSTOM HOOKS - Logic separation
const useWorkspaceToggle = (initialState = true) => {
  const [isExpanded, setIsExpanded] = useState(initialState);
  const toggle = () => setIsExpanded(!isExpanded);
  return [isExpanded, toggle];
};

// 4. DATA CONSTANTS - Separate data from UI
const NAVIGATION_ITEMS = [
  { id: 'boards', label: 'Boards', icon: 'square' },
  { id: 'templates', label: 'Templates', icon: 'square' },
  { id: 'home', label: 'Home', icon: 'square' }
];

const WORKSPACE_ITEMS = [
  { id: 'boards', label: 'Boards', icon: 'square', active: true },
  { id: 'members', label: 'Members', icon: Users, rightElement: <Plus className="w-4 h-4" /> },
  { id: 'settings', label: 'Settings', icon: Settings }
];

const BOARD_DATA = [
  {
    id: 1,
    title: 'Happiness Is The Key',
    backgroundImage: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAYADwDASIAAhEBAxEB/8QAGwAAAgIDAQAAAAAAAAAAAAAAAAYDBQECBwj/xAArEAACAQMDAgUEAwEAAAAAAAABAgMABBEFEiEGMRNBUWFxByKBkRQyobH/xAAYAQADAQEAAAAAAAAAAAAAAAACAwQFAP/EACERAAICAgIDAQEAAAAAAAAAAAABAhEDIRIxBEFhE1H/2gAMAwEAAhEDEQA/ALPqlwLbTJHYkbnCqo8ySQAPuaoekanfT63eQyXixgSl9ygZUEAg8c8gU06pG0enysowWTAPrmoNNuRcaLbshycNkfY0VDKpJvZ2PFjcYpGdGhK3Z2DGOatrKVhJgE4qTKMUAyozxTJxTRhScW0S/wDGHvYg+M0xo20AKrUh86Wr8K7b7a/2Pc/8/T7ld//Z'
  },
  {
    id: 2,
    title: 'Manage Content Portal',
    backgroundImage: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAYADwDASIAAhEBAxEB/8QAGwAAAgIDAQAAAAAAAAAAAAAAAAYDBQECBwj/xAArEAACAQMDAgUEAwEAAAAAAAABAgMABBEFEiEGMRNBUWFxByKBkRQyobH/xAAYAQADAQEAAAAAAAAAAAAAAAACAwQFAP/EACERAAICAgIDAQEAAAAAAAAAAAABAhEDIRIxBEFhE1H/2gAMAwEAAhEDEQA/ALPqlwLbTJHYkbnCqo8ySQAPuaoekanfT63eQyXixgSl9ygZUEAg8c8gU06pG0enysowWTAPrmoNNuRcaLbshycNkfY0VDKpJvZ2PFjcYpGdGhK3Z2DGOatrKVhJgE4qTKMUAyozxTJxTRhScW0S/wDGHvYg+M0xo20AKrUh86Wr8K7b7a/2Pc/8/T7ld//Z'
  }
];

// 5. MAIN COMPONENT - Clean and focused
export default function TrelloClone() {
  const [isWorkspaceExpanded, toggleWorkspace] = useWorkspaceToggle();

  const renderNavItems = () => (
    NAVIGATION_ITEMS.map(item => (
      <NavItem key={item.id} icon={() => <div className="w-3 h-3 bg-gray-400 rounded-sm" />}>
        {item.label}
      </NavItem>
    ))
  );

  const renderWorkspaceItems = () => (
    WORKSPACE_ITEMS.map(item => (
      <NavItem 
        key={item.id} 
        icon={item.icon === 'square' ? () => <div className="w-3 h-3 bg-white rounded-sm" /> : item.icon}
        active={item.active}
        rightElement={item.rightElement}
      >
        {item.label}
      </NavItem>
    ))
  );

  const renderBoards = () => (
    <>
      {BOARD_DATA.map(board => (
        <BoardCard 
          key={board.id}
          title={board.title}
          backgroundImage={board.backgroundImage}
          onClick={() => console.log(`Clicked ${board.title}`)}
        />
      ))}
      <div className={`h-24 ${DESIGN_TOKENS.colors.secondary} rounded ${DESIGN_TOKENS.layout.flexCenter} ${DESIGN_TOKENS.interactive.button}`}>
        <div className="text-center">
          <div className="text-sm text-gray-300">Create new board</div>
        </div>
      </div>
    </>
  );

  return (
    <div className={`${DESIGN_TOKENS.colors.background} ${DESIGN_TOKENS.colors.text.primary} min-h-screen flex`}>
      {/* Sidebar */}
      <div className={`${DESIGN_TOKENS.layout.sidebar} ${DESIGN_TOKENS.colors.surface} flex flex-col`}>
        {/* Trello Logo */}
        <div className={`${DESIGN_TOKENS.layout.flexCenter} ${DESIGN_TOKENS.spacing.compact} ${DESIGN_TOKENS.colors.border} border-b`}>
          <div className="bg-blue-600 p-1 rounded mr-2">
            <Trello className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4">
          {renderNavItems()}
          
          {/* Workspaces */}
          <div className={DESIGN_TOKENS.spacing.item}>
            <div className="text-xs text-gray-400 px-3 mb-2">Workspaces</div>
            
            <div className="mb-2">
              <NavItem 
                icon={Crown}
                onClick={toggleWorkspace}
                rightElement={isWorkspaceExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              >
                Team Co.
              </NavItem>

              {isWorkspaceExpanded && (
                <div className="ml-6 mt-2">
                  {renderWorkspaceItems()}
                </div>
              )}
            </div>
          </div>

          {/* Try Trello Premium */}
          <div className="px-3">
            <div className="bg-gray-700 rounded p-3 mb-4">
              <div className="text-sm font-medium mb-2">Try Trello Premium</div>
              <div className="text-xs text-gray-300 mb-3">
                Get Planner (full access), Atlassian Intelligence, card mirroring, list colors, and more.
              </div>
              <button className="text-blue-400 text-xs hover:underline">
                Start free trial
              </button>
            </div>
          </div>
        </nav>

        {/* Bottom Avatar */}
        <div className={`${DESIGN_TOKENS.spacing.compact} ${DESIGN_TOKENS.colors.border} border-t`}>
          <Avatar className="bg-purple-600 text-white text-xs font-bold">M</Avatar>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className={`${DESIGN_TOKENS.colors.surface} px-4 py-2 ${DESIGN_TOKENS.layout.flexBetween} ${DESIGN_TOKENS.colors.border} border-b`}>
          <div className={`${DESIGN_TOKENS.layout.flexCenter} space-x-4`}>
            <div className="bg-blue-600 p-1 rounded">
              <Trello className="w-4 h-4 text-white" />
            </div>
            
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search"
                className={`bg-gray-700 text-white pl-10 pr-4 py-1.5 rounded w-80 text-sm ${DESIGN_TOKENS.interactive.input}`}
              />
            </div>
          </div>

          <div className={`${DESIGN_TOKENS.layout.flexCenter} space-x-3`}>
            <button className={`${DESIGN_TOKENS.colors.primary} px-3 py-1.5 rounded text-sm font-medium`}>
              Create
            </button>
            <div className={`${DESIGN_TOKENS.layout.flexCenter} space-x-2`}>
              <Avatar className="bg-red-600 text-xs" size="w-6 h-6">8</Avatar>
              <IconButton icon={Bell} className="text-gray-300 hover:text-white" />
              <IconButton icon={HelpCircle} className="text-gray-300 hover:text-white" />
              <Avatar className="bg-orange-500 text-white text-sm font-bold">MF</Avatar>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className={`flex-1 ${DESIGN_TOKENS.spacing.container}`}>
          {/* Header */}
          <div className={DESIGN_TOKENS.spacing.section}>
            <div className={`${DESIGN_TOKENS.layout.flexCenter} mb-2`}>
              <Crown className="w-6 h-6 text-yellow-500 mr-3" />
              <h1 className="text-2xl font-semibold">Team Co.</h1>
              <Edit3 className="w-4 h-4 ml-2 text-gray-400 cursor-pointer" />
            </div>
            <div className={`${DESIGN_TOKENS.layout.flexCenter} text-sm ${DESIGN_TOKENS.colors.text.muted}`}>
              <Lock className="w-4 h-4 mr-1" />
              <span>Private</span>
            </div>
          </div>

          <div className={`${DESIGN_TOKENS.colors.text.muted} ${DESIGN_TOKENS.spacing.section}`}>Fullded In.</div>

          {/* Your boards section */}
          <div>
            <SectionHeader icon={User}>Your boards</SectionHeader>
            <div className={DESIGN_TOKENS.layout.grid}>
              {renderBoards()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}