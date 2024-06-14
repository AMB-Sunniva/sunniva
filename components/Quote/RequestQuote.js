'use client';
import styles from './RequestQuote.module.css'
import { useState } from 'react';

const RequestQuote = () => {
    const [formData, setFormData] = useState({
        company: '',
        name: '',
        email: '',
        phone: '',
        address: '',
        message: '',
      });
    
      const [submitted, setSubmitted] = useState(false);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Form submitted:', formData);
    
        setSubmitted(true);
        setFormData({
          company: '',
          name: '',
          email: '',
          phone: '',
          address: '',
          message: '',
        });
      };
    
      if (submitted) {
        return <p>Thank you for contacting us!</p>;
      }

    return (
        <div className={styles.signUpSection}>
            <div className={styles.formSection}>
                <div className={styles.title}>
                    <hr style={{width:'10%', borderColor: '#333', marginLeft: '20px'}} />
                    <h1>REQUEST A QUOTE</h1>
                </div>
                <form onSubmit={handleSubmit} className={styles.formStyle}>
                    <div className={styles.formGroupStyle}>
                        <label htmlFor='name'></label>
                        <input
                        type='text'
                        id='name'
                        name='name'
                        placeholder='NAME'
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={styles.inputStyle}
                        />
                    </div>
                    <div className={styles.formGroupStyle}>
                        <label htmlFor='email'></label>
                        <input
                        type='email'
                        id='email'
                        name='email'
                        placeholder='EMAIL'
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={styles.inputStyle}
                        />
                    </div>
                    <div className={styles.formGroupStyle}>
                        <label htmlFor='phone'></label>
                        <input
                        type='tel'
                        id='phone'
                        name='phone'
                        placeholder='PHONE'
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className={styles.inputStyle}
                        />
                    </div>
                    <div className={styles.formGroupStyle}>
                        <label htmlFor='address'></label>
                        <input
                        type='text'
                        id='address'
                        name='address'
                        placeholder='ADDRESS'
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className={styles.inputStyle}
                        />
                    </div>
                    <div className={styles.formGroupStyle}>
                        <label htmlFor='system'></label>
                        <select
                        id='system'
                        name='system'
                        className={styles.inputStyle}
                        >
                            <option value="" disabled selected>SYSTEM</option>
                            <option value="option1">Solar + Shade</option>
                            <option value="option2">Just Solar</option>
                            <option value="option3">Just Shade</option>
                            <option value="option3">EV Charger or Smart Panel</option>
                            <option value="option3">DIY Kit</option>
                            <option value="option3">Other</option>
                        </select>
                    </div>
                    <div className={styles.formGroupStyle}>
                        <label htmlFor='message'></label>
                        <textarea
                        id='message'
                        name='message'
                        placeholder='Leave us a message...'
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className={styles.inputStyle}
                        />
                    </div>
                    <button type='submit' className={styles.button}>SUBMIT</button>
                </form>
            </div>
            <div className={styles.contactSection}>
                <div>Unlock the potential of your solar and pergola dreams with a free quote today – reach out to us now to embark on your journey towards a sustainable and stunning outdoor transformation.</div>
                <div className={styles.contactContent}>
                    <h2>CONTACT US</h2>
                    <hr style={{width:'5%', borderColor: '#333', margin: '16px 0'}} />
                    <p>office@sunnivasol.com</p>
                    <p>970-759-5502</p>
                    <p>1361 S 3750 E <br/>
                    Spanish Fork UT 84660
                    </p>
                    
                </div>
            </div>
        </div>
    );
  };
  
  export default RequestQuote;