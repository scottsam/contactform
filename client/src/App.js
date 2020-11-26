import React from 'react';
import Header from './components/Header'
import ContactForm from './components/ContactForm'


function App() {
  return (
    <div className='container'>
       <div className="col-md-6 offset-md-3">
          <Header />
          <ContactForm />
        </div>
    </div>
  );
}

export default App;
