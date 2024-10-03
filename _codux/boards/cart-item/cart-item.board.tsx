import { createBoard } from '@wixc3/react-board';
import { CartItem } from '../../../src/components/cart/cart-item/cart-item';
import { cart } from '@wix/ecom';
import ComponentWrapper from '_codux/board-wrappers/component-wrapper';

import cartItemVariants from '../../../src/components/cart/cart-item/cart-item.module.scss';

const item = {
    productName: { translated: 'Product Name Lorem Ipsum Dolor' },
    quantity: 1,
    image: 'https://static.wixstatic.com/media/c837a6_18152edaef9940ca88f446ae94b48a47~mv2.jpg/v1/fill/w_824,h_1098,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/c837a6_18152edaef9940ca88f446ae94b48a47~mv2.jpg',
    price: { formattedConvertedAmount: '$10.00' },
} as cart.LineItem;

export default createBoard({
    name: 'CartItem small',
    Board: () => (
        <ComponentWrapper>
            <CartItem
                item={item}
                priceBreakdown={{ lineItemPrice: { formattedConvertedAmount: '$20.00' } }}
                className={cartItemVariants.smallCartItem}
            />
        </ComponentWrapper>
    ),
    environmentProps: {
        windowHeight: 150,
        windowWidth: 450,
    },
});
