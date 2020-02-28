import React, { useEffect, useCallback } from 'react';

export default function Modal({
  onSave,
  title,
  children,
  onCancel,
  isVisible,
  renderFooter,
  isRenderHeader,
  isRenderCloseIcon,
}) {

  const _onCancel = useCallback(
    () => {
      if (onCancel && typeof onCancel === 'function') {
        onCancel();
      }
    },
    [onCancel]
  )
  const _onSave = useCallback(
    () => {
      if (onSave && typeof onSave === 'function') {
        onSave()
      }
    },
    [onSave]
  )

  useEffect(() => {
    document.addEventListener('keyup', (e) => {
      if (e.keyCode === 27 && isVisible) {
        _onCancel()
      }
    })
    return () => {
      document.removeEventListener('keyup', () => { });
    }
  }, [isVisible, _onCancel]);

  useEffect(() => {
    if (isVisible) {
      // Modal Open -> Them class vao cho body
      document.querySelector("body").classList.add("ct-modal-open");
    } else {
      // Modal Close -> Remove class vao body
      document.querySelector("body").classList.remove("ct-modal-open");
    }
  }, [isVisible])

  const _renderFooter = () => {
    if (renderFooter && typeof renderFooter === 'function') {
      return renderFooter();
    }
    return (
      <>
        <button className='btn btn-secondary' onClick={_onCancel}>Hủy</button>
        <button className='btn btn-info' onClick={_onSave}>Lưu</button>
      </>
    )
  }

  return (
    // Template string -> ES6
    <div className={`ct-modal-wrapper ${isVisible ? 'show' : ''}`}>
      <div className="ct-mask" onClick={_onCancel}></div>
      <div className="ct-dialog">
        <div className="ct-modal-content">
          {
            isRenderHeader &&
            <div className="ct-modal-header">
              <h5 className='ct-modal-title'>{title}</h5>
              {
                isRenderCloseIcon &&
                <i onClick={_onCancel}
                  className="ct-modal-close ion-close-round"></i>
              }
            </div>

          }
          <div className="ct-modal-body">{children}</div>

          <div className="ct-modal-footer">
            {_renderFooter()}
          </div>
        </div>
      </div>
    </div>
  )
}
