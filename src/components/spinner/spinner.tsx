import classNames from 'classnames';
import styles from './spinner.module.scss';

interface SpinnerProps extends React.SVGProps<SVGSVGElement> {
    size: number | string;
}

export const Spinner = ({ className, size, ...props }: SpinnerProps) => {
    return (
        <svg
            className={classNames(styles.spinner, className)}
            viewBox="0 0 50 50"
            width={size}
            height={size}
            {...props}
        >
            <circle
                className={styles.circle}
                cx="25"
                cy="25"
                r="20"
                fill="none"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
            ></circle>
        </svg>
    );
};
