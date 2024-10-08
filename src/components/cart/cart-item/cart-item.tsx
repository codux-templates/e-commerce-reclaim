import { cart } from '@wix/ecom';
import { useRemoveItemFromCart, useUpdateCartItemQuantity } from '~/api/api-hooks';
import { media } from '@wix/sdk';
import { QuantityInput } from '~/components/quantity-input/quantity-input';
import { TrashIcon, ImagePlaceholderIcon, ErrorIcon } from '~/components/icons';
import { Spinner } from '~/components/spinner/spinner';
import classNames from 'classnames';
import debounce from 'lodash.debounce';
import { useMemo, useState } from 'react';
import { Price } from '~/components/price/price';

import styles from './cart-item.module.scss';

export interface CartItemProps {
    item: cart.LineItem;
    priceBreakdown?: cart.LineItemPricesData;
}

export const CartItem = ({ item, priceBreakdown }: CartItemProps) => {
    const productName = item.productName?.translated ?? '';

    const { trigger: removeItem, isMutating: isRemovingItem } = useRemoveItemFromCart();
    const { trigger: updateItemQuantity, isMutating: isUpdatingItemQuantity } =
        useUpdateCartItemQuantity();

    const [quantity, setQuantity] = useState(item.quantity!);

    const updateItemQuantityDebounced = useMemo(
        () => debounce(updateItemQuantity, 300),
        [updateItemQuantity],
    );

    const handleRemove = () => {
        removeItem(item._id!);
    };

    const handleQuantityChange = (value: number) => {
        setQuantity(value);
        if (value > 0) {
            updateItemQuantityDebounced({ id: item._id!, quantity: value });
        }
    };

    const image = item.image ? media.getImageUrl(item.image) : undefined;
    const isUpdatingItem = isRemovingItem || isUpdatingItemQuantity;

    const isUnavailable = item.availability?.status === cart.ItemAvailabilityStatus.NOT_AVAILABLE;

    return (
        <div className={classNames(styles.root, { [styles.loading]: isUpdatingItem })}>
            <div className={styles.itemContent}>
                {image ? (
                    <div className={styles.imageWrapper}>
                        <img src={image.url} alt={image.altText ?? productName} />
                    </div>
                ) : (
                    <div className={styles.imagePlaceholder}>
                        <ImagePlaceholderIcon className={styles.imagePlaceholderIcon} />
                    </div>
                )}

                <div className={styles.productInfo}>
                    <div className={styles.productNameAndPrice}>
                        <div className={styles.productName}>{productName}</div>
                        {item.fullPrice?.formattedConvertedAmount && (
                            <Price
                                fullPrice={item.fullPrice?.formattedConvertedAmount}
                                discountedPrice={item.price?.formattedConvertedAmount}
                            />
                        )}
                    </div>

                    <div className={styles.quantity}>
                        <QuantityInput
                            value={quantity}
                            onChange={handleQuantityChange}
                            className={classNames(styles.quantityInput, {
                                [styles.quantityInputDisabled]: isUnavailable,
                            })}
                            disabled={isUnavailable}
                        />
                    </div>
                    <div className={styles.priceBreakdown}>
                        {priceBreakdown?.lineItemPrice?.formattedConvertedAmount}
                    </div>
                    <button className={styles.removeButton} onClick={handleRemove}>
                        <TrashIcon />
                    </button>
                </div>
            </div>

            {isUnavailable && (
                <div className={styles.unavailableIndication}>
                    <ErrorIcon className={styles.unavailableIcon} />
                    <span>Sorry, this item is no longer available.</span>
                </div>
            )}

            {isUpdatingItem && (
                <div className={styles.spinner}>
                    <Spinner size={50} />
                </div>
            )}
        </div>
    );
};
