import React from 'react';
import styles from './balnces.module.css';

export default function SortBy() {

    return (
        <div className={styles.sortBy}>
            <h3 className={styles.sortByTitle}>Sort By</h3>
            <h3 className={styles.activeSortBy}>Last Month</h3>
            <h3 className={styles.sortByItem}>Last Year</h3>
        </div>
    );
}
