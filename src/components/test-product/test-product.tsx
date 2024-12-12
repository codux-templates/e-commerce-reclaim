import cx from 'classnames';
import styles from './test-product.module.scss';

export interface TestProductProps {
    className?: string;
    productNmae?: string;
    image?: HTMLImageElement;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const TestProduct = ({ className, productNmae, image }: TestProductProps) => {
    return (
        <div className={cx(styles.root, className)}>
            <h2>{productNmae}</h2>
            <img src="https://static.wixstatic.com/media/11062b_d282a61523c744ac8e29ab67ad48ea49~mv2.jpg/v1/fit/w_640,h_640/Working with Laptop at Home.jpg" />
        </div>
    );
};
