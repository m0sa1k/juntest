import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const EditEmployee = ({
  visible = false,
  onClose,
  currentEmployer,
  fetchUsers,
  url,
  edit
}) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  useEffect( () => {
        setFirstname(currentEmployer ? currentEmployer.firstname : '')
        setLastname(currentEmployer ? currentEmployer.lastname : '')
    }, [currentEmployer])

  if (!visible) return null

  const closeWithAction = () => {
    let newEmployee = {
      firstname,
      lastname
    }

    fetch(url+'/'+currentEmployer.id, {
      method: 'PUT',
      body: JSON.stringify(newEmployee),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if(response.status !== 200) throw new Error('Ошибка: статус '+response.status)
      return response.json()
    })
    .then(() => edit(newEmployee, currentEmployer.id))
    .then(() => toast(`Сотрудник ${firstname} ${lastname} успешно изменен.`, {
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
      <div className='custom-modal-dialog' onClick={ e => e.stopPropagation() }>
        <div className='custom-modal-header'>
          <div className='custom-modal-title'>Изменение</div>
          <span className='custom-modal-close' onClick={onClose}>
            &times;
          </span>
        </div>
        <div className='custom-modal-body'>
          <div className='custom-modal-content'>
            <form>
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
            onClick={closeWithAction}>Изменить</button>
          <button className='btn btn-outline-info'
            onClick={onClose}>Назад</button>
        </div>
      </div>
    </div>
  )
}