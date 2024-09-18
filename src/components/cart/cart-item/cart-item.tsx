import { cart } from '@wix/ecom';
import { useRemoveItemFromCart, useUpdateCartItemQuantity } from '~/api/api-hooks';
import { media } from '@wix/sdk';
import { QuantityInput } from '~/components/quantity-input/quantity-input';
import { TrashIcon } from '~/components/icons/trash';
import { ImagePlaceholderIcon } from '~/components/icons';
import { Spinner } from '~/components/spinner/spinner';
import classNames from 'classnames';
import styles from './cart-item.module.scss';

export interface CartItemProps {
    item: cart.LineItem;
    priceBreakdown?: cart.LineItemPricesData;
}

export const CartItem = ({ item, priceBreakdown }: CartItemProps) => {
    const productName = item.productName?.translated ?? '';

    const removeItemMutation = useRemoveItemFromCart();
    const updateItemQuantityMutation = useUpdateCartItemQuantity();

    const isUpdatingItem = removeItemMutation.isMutating || updateItemQuantityMutation.isMutating;

    const handleRemove = () => {
        removeItemMutation.trigger(item._id!);
    };

    const handleQuantityChange = (value: number) => {
        if (value > 0) {
            updateItemQuantityMutation.trigger({
                id: item._id!,
                quantity: value,
            });
        }
    };

    const image = item.image ? media.getImageUrl(item.image) : undefined;

    return (
        <div className={classNames(styles.root, { [styles.loading]: isUpdatingItem })}>
            {image ? (
                <div className={styles.imageWrapper}>
                    <img src={image.url} alt={image.altText ?? productName} />
                </div>
            ) : (
                <div className={styles.imagePlaceholder}>
                    <ImagePlaceholderIcon className={styles.imagePlaceholderIcon} />
                </div>
            )}

            <div>
                <div className={styles.header}>
                    <span className="paragraph1">{productName}</span>
                    <button className={styles.removeButton} onClick={handleRemove}>
                        <TrashIcon />
                    </button>
                </div>

                {item.price && (
                    <span className="paragraph3">{item.price.formattedConvertedAmount}</span>
                )}

                <div className={styles.quantityAndPrice}>
                    <QuantityInput
                        value={item.quantity!}
                        onChange={handleQuantityChange}
                        className={styles.quantityInput}
                    />

                    {priceBreakdown?.lineItemPrice && (
                        <span>{priceBreakdown.lineItemPrice.formattedConvertedAmount}</span>
                    )}
                </div>
            </div>

            {isUpdatingItem && (
                <div className={styles.spinner}>
                    <Spinner size={50} />
                </div>
            )}
        </div>
    );
};
