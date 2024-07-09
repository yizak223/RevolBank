// SortBy.js
import React from 'react';
import styles from './SortBy.module.css';

export default function SortBy({ sortType, setSortType, timeFrame, setTimeFrame }) {
  return (
    <div className={styles.sortBy}>
      <div className={styles.sortGroup}>
        <h3 className={styles.sortTitle}>Sort By:</h3>
        <button 
          className={`${styles.sortButton} ${sortType === 'date' ? styles.active : ''}`}
          onClick={() => setSortType('date')}
        >
          Date
        </button>
        <button 
          className={`${styles.sortButton} ${sortType === 'amount' ? styles.active : ''}`}
          onClick={() => setSortType('amount')}
        >
          Amount
        </button>
      </div>
      <div className={styles.sortGroup}>
        <h3 className={styles.sortTitle}>Time Frame:</h3>
        <button 
          className={`${styles.sortButton} ${timeFrame === 'month' ? styles.active : ''}`}
          onClick={() => setTimeFrame('month')}
        >
          Last Month
        </button>
        <button 
          className={`${styles.sortButton} ${timeFrame === 'year' ? styles.active : ''}`}
          onClick={() => setTimeFrame('year')}
        >
          Last Year
        </button>
      </div>
    </div>
  );
}