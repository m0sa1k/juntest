import {toast} from 'react-toastify';

export const DeleteEmployee = ({
  visible=false,
  onClose,
  currentEmployer,
  url,
  remove
}) => {
  if (!visible) return null

  const closeWithAction = () => {
    fetch(`${url}/${currentEmployer.id}`, {
      method: 'DELETE',
    })
    .then(response => {
      if(response.status !== 200) throw new Error('Ошибка: статус '+response.status)
      return response.json()
    })
    .then(() => remove(currentEmployer.id))
    .then(() => toast(`Сотрудник ${currentEmployer.firstname} ${currentEmployer.lastname} успешно удален.`, {
      hideProgressBar: true,
      type: 'success'
    }))
    .catch(e => toast(e.message, {
      hideProgressBar: true,
      type: 'error'
    }))
    
    onClose()
  }

  return (
    <div className='custom-modal' onClick={onClose}>
      <div className='custom-modal-dialog' onClick={e => e.stopPropagation()}>
        <div className='custom-modal-header'>
          <span className='custom-modal-close' onClick={onClose}>
            &times;
          </span>
        </div>
        <div className='custom-modal-body'>
          <div className='custom-modal-content'>Вы уверены, что хотите удалить {currentEmployer.firstname} {currentEmployer.lastname}?</div>
        </div>
        <div className='custom-modal-footer'>
          <button className='btn btn-danger me-1'
            onClick={closeWithAction}>Удалить</button>
          <button className='btn btn-outline-info'
            onClick={onClose}>Назад</button>
        </div>
      </div>
    </div>
  )
}