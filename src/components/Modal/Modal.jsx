import { useEffect } from 'react';

export const Modal = ({ onClose }) => {
  const handleKeyDown = event => {
    if (event.key === 'Escape') {
      onClose();
    }
  };
  const handleBackdropClose = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="modal-backdrop fade show " />
      <div
        className="modal fade show"
        style={{ display: 'block' }}
        onClick={handleBackdropClose}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modal title</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={onClose}
              />
            </div>

            <div className="modal-body">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Molestias, sit. Eveniet doloribus consequuntur fugit, unde
              mollitia laudantium officia, labore quae libero consectetur sunt
              nam natus. Unde praesentium debitis reprehenderit itaque.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
