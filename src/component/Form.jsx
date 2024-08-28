import React from 'react'
import '../style/form.css'

function Form() {
  return (
    <section className='form'>
      <div className="container">
        <div className="form_wrapper">
          <h4>Подпишитесь на нашу рассылку</h4>
          <span>Полезные статьи, акции, новости - получите все это сейчас!</span>
          <form>
            <input type="text" placeholder='Ваш e-mail' />
            <button>Подписаться</button>
          </form>
          <span>Мы не шлем спам, и передаем никому ваши данные.</span>
        </div>
      </div>
    </section>
  )
}

export default Form
