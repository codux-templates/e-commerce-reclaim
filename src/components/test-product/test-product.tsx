import cx from 'classnames';
import styles from './test-product.module.scss';
import { ImagePlaceholderIcon } from '../icons';
export interface TestProductProps {
    className?: string;
    productName?: string;
    /** @format media-url */
    imageUrl?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const TestProduct = ({ className, productName, imageUrl }: TestProductProps) => {
    return (
        <div className={cx(styles.root, className)}>
            <h2>{productName}</h2>
             {imageUrl ? (
                    <img src={imageUrl} alt={productName} className={styles.image} />
                ) : (
                    <ImagePlaceholderIcon className={styles.imagePlaceholderIcon} />
                )}
            <img src="https://static.wixstatic.com/media/11062b_d282a61523c744ac8e29ab67ad48ea49~mv2.jpg/v1/fit/w_640,h_640/Working with Laptop at Home.jpg" />
        </div>
    );
};
