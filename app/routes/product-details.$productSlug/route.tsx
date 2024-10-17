import { isRouteErrorResponse, useLoaderData, useNavigate, useRouteError } from '@remix-run/react';
import classNames from 'classnames';
import { EcomApiErrorCodes } from 'lib/api/types';
import { useProductDetails } from 'lib/hooks/use-product-details';
import { productDetailsRouteLoader } from 'lib/route-loaders/product-details-route-loader';
import { getErrorMessage } from 'lib/utils';
import { Accordion } from '~/components/accordion/accordion';
import {
    BreadcrumbData,
    Breadcrumbs,
    RouteBreadcrumbs,
    useBreadcrumbs,
} from '~/components/breadcrumbs';
import { ErrorPage } from '~/components/error-page/error-page';
import { ProductImages } from '~/components/product-images/product-images';
import { ProductPrice } from '~/components/product-price/product-price';
import { QuantityInput } from '~/components/quantity-input/quantity-input';
import { ProductOption } from '~/components/product-option/product-option';
import { ShareProductLinks } from '~/components/share-product-links/share-product-links';
import { ROUTES } from '~/router/config';

import styles from './route.module.scss';

export const loader = productDetailsRouteLoader;

interface ProductDetailsLocationState {
    fromCategory?: {
        name: string;
        slug: string;
    };
}

const breadcrumbs: RouteBreadcrumbs<typeof loader, ProductDetailsLocationState> = (
    match,
    location,
) => {
    const fromCategory = location.state?.fromCategory;

    const breadcrumbs: BreadcrumbData[] = [
        {
            title: match.data.product.name!,
            to: ROUTES.productDetails.to(match.data.product.slug!),
        },
    ];

    if (fromCategory) {
        breadcrumbs.unshift({
            title: fromCategory.name,
            to: ROUTES.products.to(fromCategory.slug),
            clientOnly: true,
        });
    }

    return breadcrumbs;
};

export const handle = {
    breadcrumbs,
};

export default function ProductDetailsPage() {
    const { product, canonicalUrl } = useLoaderData<typeof loader>();

    const {
        outOfStock,
        priceData,
        sku,
        media,
        productOptions,
        quantity,
        selectedChoices,
        isAddingToCart,
        addToCartAttempted,
        handleAddToCart,
        handleOptionChange,
        handleQuantityChange,
    } = useProductDetails(product);

    const breadcrumbs = useBreadcrumbs();

    return (
        <div className={styles.page}>
            <Breadcrumbs breadcrumbs={breadcrumbs} />

            <div className={styles.content}>
                <ProductImages media={media} />

                <div>
                    <h1 className={styles.productName}>{product.name}</h1>
                    {sku && <p className={styles.sku}>SKU: {sku}</p>}

                    {priceData && (
                        <ProductPrice
                            className={styles.price}
                            price={priceData.formatted?.price}
                            discountedPrice={priceData.formatted?.discountedPrice}
                        />
                    )}

                    {product.description && (
                        <div
                            className={styles.description}
                            dangerouslySetInnerHTML={{ __html: product.description }}
                        />
                    )}

                    {productOptions && productOptions.length > 0 && (
                        <div className={styles.productOptions}>
                            {productOptions.map((option) => (
                                <ProductOption
                                    key={option.name}
                                    error={
                                        addToCartAttempted &&
                                        selectedChoices[option.name!] === undefined
                                            ? `Select ${option.name}`
                                            : undefined
                                    }
                                    option={option}
                                    selectedChoice={selectedChoices[option.name!]}
                                    onChange={(choice) => handleOptionChange(option.name!, choice)}
                                />
                            ))}
                        </div>
                    )}

                    <div className={styles.quantity}>
                        <label htmlFor="quantity" className={styles.quantityLabel}>
                            Quantity
                        </label>
                        <QuantityInput
                            id="quantity"
                            value={quantity}
                            onChange={handleQuantityChange}
                            disabled={outOfStock}
                        />
                    </div>

                    <button
                        className={classNames('button', 'primaryButton', styles.addToCartButton)}
                        onClick={handleAddToCart}
                        disabled={outOfStock || isAddingToCart}
                    >
                        {outOfStock ? 'Out of stock' : 'Add to Cart'}
                    </button>

                    {product.additionalInfoSections &&
                        product.additionalInfoSections.length > 0 && (
                            <Accordion
                                className={styles.additionalInfoSections}
                                items={product.additionalInfoSections.map((section) => ({
                                    title: section.title!,
                                    content: section.description ? (
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: section.description,
                                            }}
                                        />
                                    ) : null,
                                }))}
                            />
                        )}

                    <ShareProductLinks
                        className={styles.socialLinks}
                        productCanonicalUrl={canonicalUrl}
                    />
                </div>
            </div>
        </div>
    );
}

export function ErrorBoundary() {
    const error = useRouteError();
    const navigate = useNavigate();

    let title = 'Error';
    let message = getErrorMessage(error);

    if (isRouteErrorResponse(error) && error.data.code === EcomApiErrorCodes.ProductNotFound) {
        title = 'Product Not Found';
        message = "Unfortunately a product page you trying to open doesn't exist";
    }

    return (
        <ErrorPage
            title={title}
            message={message}
            actionButtonText="Back to shopping"
            onActionButtonClick={() => navigate(ROUTES.products.to('all-products'))}
        />
    );
}
