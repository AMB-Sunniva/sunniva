'use client';
import styles from './InstallerSignUp.module.css'
import { useState } from 'react';
import Image from 'next/image';

const InstallerSignUp = () => {
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
                    <h1>INSTALLER SIGN UP</h1>
                </div>
                <form onSubmit={handleSubmit} className={styles.formStyle}>
                    <div className={styles.formGroupStyle}>
                        <label htmlFor='company'></label>
                        <input
                        type='text'
                        id='company'
                        name='company'
                        placeholder='COMPANY NAME'
                        value={formData.company}
                        onChange={handleChange}
                        required
                        className={styles.inputStyle}
                        />
                    </div>
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
            <div className='m-2'>
              <Image src='/images/picNine.jpeg' alt='Installer' width={600} height={100} />
            </div>
        </div>
    );
  };
  
  export default InstallerSignUp;