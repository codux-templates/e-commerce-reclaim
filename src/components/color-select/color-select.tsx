import classNames from 'classnames';

import styles from './color-select.module.scss';

export interface ColorSelectOption {
    id: string;
    color: string;
}

export interface ColorSelectProps {
    options: ColorSelectOption[];
    selectedId: string;
    onChange: (id: string) => void;
    hasError?: boolean;
}

export const ColorSelect = ({ options, selectedId, onChange, hasError }: ColorSelectProps) => {
    return (
        <div className={classNames(styles.root, { [styles.hasError]: hasError })}>
            {options.map((option) => (
                <button
                    key={option.id}
                    className={classNames(styles.option, {
                        [styles.selected]: selectedId === option.id,
                    })}
                    onClick={() => onChange(option.id)}
                >
                    <div
                        className={styles.colorBox}
                        style={{ backgroundColor: option.color }}
                    ></div>
                </button>
            ))}
        </div>
    );
};
