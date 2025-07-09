import React, { useState, useEffect } from 'react';

const UrgentNotification = ({ message, onClose, onAction, actionLabel }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 8000); // La notificación desaparece después de 8 segundos

    return () => clearTimeout(timer);
  }, [onClose]);

  const handleActionClick = () => {
    if (onAction) {
      onAction();
    }
    setIsVisible(false);
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 bg-red-600 text-white p-4 rounded-lg shadow-xl flex items-center space-x-3 z-50 animate-fade-in-down">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
      </svg>
      <p className="font-semibold">{message}</p>
      {actionLabel && onAction && (
        <button
          onClick={handleActionClick}
          className="ml-auto bg-white text-red-600 px-3 py-1 rounded-md hover:bg-gray-200 transition-colors font-medium"
        >
          {actionLabel}
        </button>
      )}
      <button onClick={() => { setIsVisible(false); onClose(); }} className="ml-auto text-white hover:text-gray-200 focus:outline-none">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  );
};

export default UrgentNotification;