import { useEffect } from 'react';

// PUBLIC_INTERFACE
export default function Modal({ open, title, onClose, children, actions }) {
  /** Accessible modal container */
  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    if (open) window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div role="dialog" aria-modal="true" aria-label={title} style={styles.backdrop} onClick={onClose}>
      <div className="container" style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ marginTop: 0 }}>{title}</h3>
          <button className="button ghost" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div style={{ marginTop: 8 }}>{children}</div>
        {actions ? <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>{actions}</div> : null}
      </div>
    </div>
  );
}

const styles = {
  backdrop: {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, zIndex: 100
  },
  modal: { width: '100%', maxWidth: 520, padding: 16 }
};
