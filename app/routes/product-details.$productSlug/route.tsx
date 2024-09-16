import { getEcomApi } from '~/api/ecom-api';
import styles from './product-details.module.scss';
import { json, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { ProductPrice } from '~/components/product-price/product-price';
import { QuantityInput } from '~/components/quantity-input/quantity-input';
import { useState } from 'react';
import { Accordion } from '~/components/accordion/accordion';
import { ProductImages } from '~/components/product-images/product-images';
import { Button } from '~/components/button/button';
import { getUrlOriginWithPath } from '~/utils';
import { ProductSocialLinks } from '~/components/product-social-links/product-social-links';

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
    const productSlug = params.productSlug;
    if (!productSlug) {
        throw new Error('Missing product slug');
    }

    const product = await getEcomApi().getProduct(productSlug);
    if (!product) {
        throw new Response('Product Not Found', { status: 404 });
    }

    const canonicalUrl = getUrlOriginWithPath(request.url);

    return json({ product, canonicalUrl });
};

export default function ProductDetailsPage() {
    const { product, canonicalUrl } = useLoaderData<typeof loader>();
    const [quantity, setQuantity] = useState<number | null>(1);

    return (
        <div className={styles.page}>
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

                {product.additionalInfoSections && product.additionalInfoSections.length > 0 && (
                    <Accordion
                        className={styles.additionalInfoSections}
                        items={product.additionalInfoSections.map((section) => ({
                            title: section.title!,
                            content: section.description ? (
                                <div dangerouslySetInnerHTML={{ __html: section.description }} />
                            ) : null,
                        }))}
                    />
                )}

                <ProductSocialLinks
                    className={styles.socialLinks}
                    productCanonicalUrl={canonicalUrl}
                />
            </div>
        </div>
    );
}
