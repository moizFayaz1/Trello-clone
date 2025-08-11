import React, { useEffect, useState } from 'react';
import { X, ChevronDown, TriangleAlert, Ellipsis } from 'lucide-react';
import DESIGN_TOKENS from '@/styles/tokens';

const CreateBoardModal = () => {
  const [boardTitle, setBoardTitle] = useState('');
  const [selectedBackground, setSelectedBackground] = useState(0);
  const [showError, setShowError] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedVisibility, setSelectedVisibility] = useState('workspace');

  // Background options
  const backgrounds = [
    { type: 'image', src: 'https://plus.unsplash.com/premium_photo-1676496046182-356a6a0ed002?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFuZHNjYXBlfGVufDB8fDB8fHww', alt: 'Desert landscape' },
    { type: 'image', src: 'https://plus.unsplash.com/premium_photo-1666863909125-3a01f038e71f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bGFuZHNjYXBlfGVufDB8fDB8fHww', alt: 'Mountain sunset' },
    { type: 'image', src: 'https://plus.unsplash.com/premium_photo-1668024966086-bd66ba04262f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bGFuZHNjYXBlfGVufDB8fDB8fHww', alt: 'Wooden texture' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bGFuZHNjYXBlfGVufDB8fDB8fHww', alt: 'Ocean waves' },
    { type: 'color', color: '#E5E7EB' },
    { type: 'color', color: '#0EA5E9' },
    { type: 'color', color: '#2563EB' },
    { type: 'color', color: '#7C3AED' },
    { type: 'color', color: '#C026D3' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.relative')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleTitleChange = (e) => {
    setBoardTitle(e.target.value);
    if (e.target.value.trim()) {
      setShowError(false);
    }
  };

  const handleCreateBoard = () => {
    if (!boardTitle.trim()) {
      setShowError(true);
    } else {
      // Handle board creation
      console.log('Creating board:', boardTitle);
    }
  };

  return (
    
    <div className={`fixed top-14  right-2 max-h-[calc(100vh-70px)] w-74 z-20 ${DESIGN_TOKENS.colors.overlay} rounded-lg   overflow-y-auto`}>
      {/* Header */}
      <div className="flex items-center justify-between py-3 px-2  border-b border-slate-700">
        <button className="text-slate-400 hover:bg-gray-500 p-2 cursor-pointer rounded">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 2L2 8l6 6 1.414-1.414L5.828 9H14V7H5.828l3.586-3.586L8 2z"/>
          </svg>
        </button>
        <h2 className="text-slate-300 text-base font-medium">Create board</h2>
        <button className="text-slate-400 hover:bg-gray-500 p-2 cursor-pointer rounded">
          <X size={16} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Board Preview */}
        <div className="mb-6 ">
          <div 
            className="w-full h-32 rounded-lg relative bg-no-repeat"
            style={
              backgrounds[selectedBackground]?.type === 'color' 
                ? { backgroundColor: backgrounds[selectedBackground].color }
                : { 
                    backgroundImage: `url(${backgrounds[selectedBackground]?.src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }
            }
          >
            {/* Board preview content - mimicking the Trello board layout */}
            <div className="absolute inset-0 p-3 flex justify-center items-center">
              <img src="/public/boardbgBg.svg" alt="" />
              {/* <div className="flex space-x-2 h-full">
                <div className="bg-white bg-opacity-90 rounded w-16 h-full"></div>
                <div className="bg-white bg-opacity-90 rounded w-16 h-full"></div>
                <div className="bg-white bg-opacity-90 rounded w-16 h-full"></div>
              </div> */}
            </div>
            {/* Upload icon overlay */}
            {/* <div className="absolute top-2 right-2">
              <div className="w-6 h-6 bg-black bg-opacity-20 rounded flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="white" fillOpacity="0.8">
                  <path d="M6 1v4m0 0v4m0-4H2m4 0h4"/>
                </svg>
              </div>
            </div> */}
          </div>
        </div>

        {/* Background Section */}
        <div className="mb-6">
          <h3 className="text-slate-300 text-sm font-medium mb-3">Background</h3>
          <div className="grid grid-cols-4 gap-2 mb-2">
            {backgrounds.slice(0, 4).map((bg, index) => (
              <button
                key={index}
                className={`w-full h-10 rounded relative overflow-hidden border-2 ${
                  selectedBackground === index ? 'border-blue-500' : 'border-transparent bg-no-repeat'
                }`}
                onClick={() => setSelectedBackground(index)}
                style={
                  bg.type === 'color' 
                    ? { backgroundColor: bg.color }
                    : { 
                        backgroundImage: `url(${bg.src})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }
                }
              />
            ))}
          </div>
          <div className="grid grid-cols-6 gap-2">
            {backgrounds.slice(4).map((bg, index) => (
              <button
                key={index + 4}
                className={`w-full h-8 rounded border-2 ${
                  selectedBackground === index + 4 ? 'border-blue-500' : 'border-transparent'
                }`}
                onClick={() => setSelectedBackground(index + 4)}
                style={{ backgroundColor: bg.color }}
              />
            ))}
            <button className="w-full h-8 rounded border-2 cursor-pointer border-transparent bg-slate-700 flex items-center justify-center text-slate-400">
             <Ellipsis className='w-4 h-4' />
            </button>
          </div>
        </div>

        {/* Board Title */}
        <div className="mb-6">
          <label className="block text-slate-300 text-sm font-medium mb-2">
            Board title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={boardTitle}
            onChange={handleTitleChange}
            className={`w-full px-3 py-2 bg-slate-700 border rounded text-slate-200 text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              showError ? 'border-red-500' : 'border-slate-600'
            }`}
            placeholder=""
          />
          {showError && (
            <div className="flex items-center mt-2 text-amber-400 text-sm">
              <TriangleAlert size={14} className="mr-1" />
              Board title is required
            </div>
          )}
        </div>

        {/* Visibility */}
        <div className="mb-6">
          <label className="block text-slate-300 text-sm font-medium mb-2">Visibility</label>
          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-slate-200 text-sm text-left focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between"
            >
              <span>Workspace</span>
              <ChevronDown size={16} className={`text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-slate-700 border border-slate-600 rounded-lg shadow-lg z-50 overflow-y-auto">
                {/* Private Option */}
                <div 
                  onClick={() => {
                    setSelectedVisibility('private');
                    setIsDropdownOpen(false);
                  }}
                  className="px-3 py-3 hover:bg-slate-600 cursor-pointer flex items-start space-x-3"
                >
                  <div className="mt-0.5">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="text-slate-400">
                      <path d="M4 6V4.5C4 2.567 5.567 1 7.5 1S11 2.567 11 4.5V6h1a1 1 0 011 1v7a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 011-1h0zm2-1.5V6h3V4.5C9 3.672 8.328 3 7.5 3S6 3.672 6 4.5z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-slate-200 text-sm font-medium">Private</div>
                    <div className="text-slate-400 text-xs mt-0.5 leading-relaxed">
                      Only board members can see this board. Workspace admins can close the board or remove members.
                    </div>
                  </div>
                </div>
                
                {/* Workspace Option */}
                <div 
                  onClick={() => {
                    setSelectedVisibility('workspace');
                    setIsDropdownOpen(false);
                  }}
                  className="px-3 py-3 hover:bg-slate-600 cursor-pointer flex items-start space-x-3 bg-slate-600"
                >
                  <div className="mt-0.5">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="text-blue-400">
                      <path d="M8 1C4.686 1 2 3.686 2 7s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zM5.5 6a1.5 1.5 0 103 0 1.5 1.5 0 00-3 0zm5 0a1.5 1.5 0 103 0 1.5 1.5 0 00-3 0zM8 11c-1.5 0-2.8-.8-3.5-2h7c-.7 1.2-2 2-3.5 2z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-blue-400 text-sm font-medium">Workspace</div>
                    <div className="text-slate-400 text-xs mt-0.5 leading-relaxed">
                      All members of the Team Co. Workspace can see and edit this board.
                    </div>
                  </div>
                </div>
                
                {/* Scrollbar */}
                <div className="absolute right-1 top-1 bottom-1 w-2">
                  <div className="bg-slate-500 rounded-full w-1.5 h-8 ml-0.5"></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Workspace Info */}
        <div className="mb-6 text-slate-400 text-sm">
          This Workspace has <strong className="text-slate-300">5 boards remaining</strong>.
          <br />
          Free Workspaces can only have 10 open boards. For unlimited boards, upgrade your Workspace.
        </div>

        {/* Start Free Trial Button */}
        <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded text-sm font-medium mb-4 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="mr-2">
            <path d="M3 3h10v10H3V3zm1 1v8h8V4H4z"/>
          </svg>
          Start free trial
        </button>

        {/* Create Button */}
        <button 
          onClick={handleCreateBoard}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm font-medium"
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateBoardModal;