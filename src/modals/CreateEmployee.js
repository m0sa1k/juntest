import {useState} from 'react';
import {toast} from 'react-toastify';

export const CreateEmployee = ({
  visible=false,
  onClose,
  fetchUsers,
  url,
  add
}) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  if (!visible) return null

  const closeWithAction = () => {
    let newEmployee = {
      id: Date.now(),
      firstname,
      lastname
    }

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(newEmployee),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if(response.status !== 201) throw new Error('Ошибка: статус '+response.status)
      return response.json()
    })
    .then(() => add(newEmployee))
    .then(() => toast(`Добавлен сотрудник ${firstname} ${lastname}.`, {
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
          <div className='custom-modal-title'>
            Создание нового сотрудника
          </div>
          <span className='custom-modal-close' onClick={onClose}>
            &times;
          </span>
        </div>
        <div className='custom-modal-body'>
          <div className='custom-modal-content'>
            <form className='form'>
              <label className='form-label'>
                Firstname:
              </label>
              <input
                className='form-control'
                type='text'
                value={firstname}
                onChange={e => setFirstname(e.target.value)}
              />
              <label className='form-label'>
                Lastname:
              </label>
              <input
                className='form-control'
                type='text'
                value={lastname}
                onChange={e => setLastname(e.target.value)}
              />
            </form>
          </div>
        </div>
        <div className='custom-modal-footer'>
          <button className='btn btn-secondary me-1'
            onClick={closeWithAction}>Создать</button>
          <button className='btn btn-outline-info'
            onClick={onClose}>Назад</button>
        </div>
      </div>
    </div>
  )
}