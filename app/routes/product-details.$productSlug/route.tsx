import { getEcomApi } from '~/api/ecom-api';
import styles from './product-details.module.scss';
import { json, LoaderFunctionArgs } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { ProductPrice } from '~/components/product-price/product-price';
import { QuantityInput } from '~/components/quantity-input/quantity-input';
import { useState } from 'react';
import { Accordion } from '~/components/accordion/accordion';
import { ProductImages } from '~/components/product-images/product-images';
import { Button } from '~/components/button/button';
import { removeQueryStringFromUrl } from '~/utils';
import { ShareProductLinks } from '~/components/share-product-links/share-product-links';
import { Breadcrumbs } from '~/components/breadcrumbs/breadcrumbs';
import { ROUTES } from '~/router/config';
import { RouteHandle } from '~/router/types';

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
    const productSlug = params.productSlug;
    if (!productSlug) {
        throw new Error('Missing product slug');
    }

    const product = await getEcomApi().getProduct(productSlug);
    if (!product) {
        throw new Response('Product Not Found', { status: 404 });
    }

    const canonicalUrl = removeQueryStringFromUrl(request.url);

    return json({ product, canonicalUrl });
};

interface ProductDetailsLocationState {
    fromCategory?: {
        name: string;
        slug: string;
    };
}

export const handle: RouteHandle<typeof loader, ProductDetailsLocationState> = {
    breadcrumb: (match, location) => {
        const fromCategory = location.state?.fromCategory;

        const productLink = (
            <Link to={ROUTES.productDetails.to(match.data.product.slug!)} state={{ fromCategory }}>
                {match.data.product.name!}
            </Link>
        );

        if (fromCategory) {
            const categoryLink = (
                <Link to={ROUTES.products.to(fromCategory.slug)}>{fromCategory.name}</Link>
            );
            return [categoryLink, productLink];
        }

        return productLink;
    },
};

export default function ProductDetailsPage() {
    const { product, canonicalUrl } = useLoaderData<typeof loader>();
    const [quantity, setQuantity] = useState(1);

    return (
        <div className={styles.page}>
            <Breadcrumbs />

            <div className={styles.content}>
                <ProductImages media={product.media} />

                <div>
                    <h1 className={styles.productName}>{product.name}</h1>
                    {product.sku && <p className={styles.sku}>SKU: {product.sku}</p>}

                    {product.priceData && (
                        <ProductPrice priceData={product.priceData} className={styles.price} />
                    )}

                    {product.description && (
                        <div
                            className={styles.description}
                            dangerouslySetInnerHTML={{ __html: product.description }}
                        />
                    )}

                    <div className={styles.quantity}>
                        <label htmlFor="quantity" className={styles.quantityLabel}>
                            Quantity
                        </label>
                        <QuantityInput id="quantity" value={quantity} onChange={setQuantity} />
                    </div>

                    <Button className={styles.addToCartButton}>Add to Cart</Button>

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
