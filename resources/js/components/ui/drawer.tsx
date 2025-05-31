import React, { JSX } from 'react'

interface DrawerProps {
    title: string;
    open: boolean;
    setOpen?: (open: boolean) => void;
    component: JSX.Element;
    maxWidth?: string; // Optional prop for max-width
    
}

export default function Drawer({  title, open, setOpen, component, maxWidth="max-w-1/2" }: DrawerProps) {
  if (!open) return null; // Optionally hide when not open

  const CloseBtn = () => {
       return  (<button
          className="absolute top-4 right-4 rounded-full cursor-pointer p-2 hover:bg-red-200 bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500"
          onClick={() => setOpen && setOpen(false)}
          aria-label="Fermer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>

        </button>)
  }

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/30"
        aria-label="Fermer le drawer"
        // onClick retiré pour bloquer la fermeture par clic sur l'overlay
      />
      {/* Drawer panel */}
      <div className={`relative ml-auto h-full w-full ${maxWidth} bg-white shadow-xl transition-all`}>
        <CloseBtn />

        <div className="p-6">
          <h2 className="mb-4 text-lg font-bold">{title}</h2>
          {/* Render the passed component */}
          {component}
        </div>
      </div>
    </div>
  );
}