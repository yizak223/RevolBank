import React, { useState } from 'react';
import styles from './balnces.module.css';

export default function SortBy() {
    const [checked, setChecked] = useState(null);

    const handleCheckboxChange = (value) => {
        setChecked(value);
    };

    return (
        <div className={styles.sortBy}>
            <h3>Sort By</h3>
            <label className={styles.checkboxContainer}>
                <input 
                    type="checkbox" 
                    checked={checked === 'lastMonth'} 
                    onChange={() => handleCheckboxChange('lastMonth')} 
                />
                Last Month
            </label>
            <label className={styles.checkboxContainer}>
                <input 
                    type="checkbox" 
                    checked={checked === 'lastYear'} 
                    onChange={() => handleCheckboxChange('lastYear')} 
                />
                Last Year
            </label>
        </div>
    );
}
