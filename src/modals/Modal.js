export const Modal = ({
  visible = false,
  onClose,
  body,
  footer
}) => {
  return (
    <div className='custom-modal' onClick={onClose}>
      <div className='custom-modal-dialog' onClick={e => e.stopPropagation()}>
        <div className='custom-modal-header'>
          <div className='custom-modal-title'>Изменение</div>
          <span className='custom-modal-close' onClick={onClose}>
            &times;
          </span>
        </div>
        <div className='custom-modal-body'>
          <div className='custom-modal-content'>
            {body}
          </div>
        </div>
        <div className='custom-modal-footer'>
            {footer}
        </div>
      </div>
    </div>
  )
}