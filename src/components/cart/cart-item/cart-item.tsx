import { QuantityInput } from '~/components/quantity-input/quantity-input';
import { TrashIcon, ImagePlaceholderIcon, ErrorIcon } from '~/components/icons';
import { Spinner } from '~/components/spinner/spinner';
import classNames from 'classnames';
import { CartItem as CartItemType } from '~/api/types';

import styles from './cart-item.module.scss';
import { useCartItem } from '~/api/use-cart-item';

export interface CartItemProps {
    item: CartItemType;
}

export const CartItem = ({ item }: CartItemProps) => {
    const { quantity, onQuantityChange } = useCartItem(item);

    return (
        <div className={classNames(styles.root, { [styles.loading]: item.isUpdating })}>
            <div className={styles.itemContent}>
                {item.image ? (
                    <div className={styles.imageWrapper}>
                        <img src={item.image.url} alt={item.image.altText} />
                    </div>
                ) : (
                    <div className={styles.imagePlaceholder}>
                        <ImagePlaceholderIcon className={styles.imagePlaceholderIcon} />
                    </div>
                )}

                <div className={styles.productInfo}>
                    <div className={styles.productNameAndPrice}>
                        <div className={styles.productName}>{item.productName}</div>
                        {item.price && (
                            <div className="paragraph3">{item.price.formattedConvertedAmount}</div>
                        )}
                    </div>

                    <div className={styles.quantity}>
                        <QuantityInput
                            value={quantity}
                            onChange={onQuantityChange}
                            className={classNames(styles.quantityInput, {
                                [styles.quantityInputDisabled]: item.isUnavailable,
                            })}
                            disabled={item.isUnavailable}
                        />
                    </div>
                    <div className={styles.priceBreakdown}>
                        {item.subtotal?.formattedConvertedAmount}
                    </div>
                    <button className={styles.removeButton} onClick={item.onRemove}>
                        <TrashIcon />
                    </button>
                </div>
            </div>

            {item.isUnavailable && (
                <div className={styles.unavailableIndication}>
                    <ErrorIcon className={styles.unavailableIcon} />
                    <span>Sorry, this item is no longer available.</span>
                </div>
            )}

            {item.isUpdating && (
                <div className={styles.spinner}>
                    <Spinner size={50} />
                </div>
            )}
        </div>
    );
};
