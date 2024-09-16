import classNames from 'classnames';
import { MinusIcon, PlusIcon } from '../icons';
import styles from './quantity-input.module.scss';
import { useRef } from 'react';

type QuantityInputProps = {
    value: number | null;
    onChange: (value: number | null) => void;
    id?: string;
    className?: string;
};

export const QuantityInput = ({ value, onChange, id, className }: QuantityInputProps) => {
    const lastValidQuantity = useRef(value);

    const handleChange = (newValue: number | null) => {
        onChange(newValue);
        if (newValue !== null) {
            lastValidQuantity.current = newValue;
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (!value) handleChange(null);
        const number = Number.parseInt(value, 10);
        if (!Number.isNaN(number) && number > 0) {
            handleChange(number);
        }
    };

    const decrease = () => {
        if (value !== null && value > 1) {
            handleChange(value - 1);
        }
    };

    const increase = () => {
        handleChange(value === null ? 1 : value + 1);
    };

    const handleInputBlur = () => {
        if (value === null && lastValidQuantity.current !== null) {
            handleChange(lastValidQuantity.current);
        }
    };

    return (
        <div className={styles.root}>
            <button
                className={styles.button}
                onClick={decrease}
                disabled={value === null || value === 1}
            >
                <MinusIcon className={styles.icon} />
            </button>
            <input
                id={id}
                className={classNames(styles.input, className)}
                value={value ?? ''}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
            />
            <button className={styles.button} onClick={increase}>
                <PlusIcon className={styles.icon} />
            </button>
        </div>
    );
};
