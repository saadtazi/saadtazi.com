import React from 'react';
import styles from './test_layout.module.css';

export default function TestLayout() {
  return (
    <div className={styles.page}>
      <div className={styles.leftContent}>
        <nav>
          <h2>Element Title</h2>
          <ul>
            <li>allo</li>
            <li>monde</li>
          </ul>
        </nav>
        <footer className={styles.footer}>Unity ©</footer>
      </div>
      <div className={styles.mainContent}>
        <h1>Hello World!</h1>
      </div>
    </div>
  );
}
