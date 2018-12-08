import React from 'react';

const Modal = ({ closeOptions, children, classModal, modalStyle }) => {
  // CHANGES HEIGHT OF MODAL WHEN SCROLLING
  const containerHeight = document.getElementsByClassName('dashboard-container')[0].offsetHeight;
  const style = `${containerHeight + 2000}px`;
  if (classModal) {
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
  }
  const closeIt = document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' || event.keyCode === 27) {
      closeOptions();
      document.removeEventListener('keydown', closeIt);
    }
  });
  return (
    <div>
      <div>
        <div
          className={`Rectangle-9 ${classModal}`}
          style={modalStyle}
        >
          <div>
            {classModal ? null
              : (
                <div
                  className="close"
                  onClick={closeOptions}
                  onKeyPress={closeOptions}
                />
              )
            }
            <div>
              {children}
            </div>
          </div>
        </div>
        <div className="coverAll-Dark" onClick={closeOptions} onKeyPress={closeOptions} style={{ visibility: 'visible', top: 0, height: style }} />
      </div>
    </div>
  );
};

export default Modal;
