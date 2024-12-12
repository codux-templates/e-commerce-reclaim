import React from 'react';
import styles from './route.module.scss';
import { TestProduct } from '~/src/components/test-product/test-product';
export default function Playgroundpage() {
    return (
        <section className={styles.playground}>
            <TestProduct productNmae="tv " />
            <TestProduct productNmae="radio " />
        </section>
    );
}
