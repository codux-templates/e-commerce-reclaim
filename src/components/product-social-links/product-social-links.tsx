import classNames from 'classnames';
import { FacebookIcon, PinterestIcon, WhatsappIcon } from '../icons';
import styles from './product-social-links.module.scss';

interface ProductSocialLinksProps {
    productCanonicalUrl: string;
    className?: string;
}

export const ProductSocialLinks = ({ productCanonicalUrl, className }: ProductSocialLinksProps) => {
    const productEncodedUrl = encodeURIComponent(productCanonicalUrl);
    return (
        <div className={classNames(styles.links, className)}>
            <a
                href={`https://api.whatsapp.com/send?text=${productEncodedUrl}`}
                target="_blank"
                rel="noreferrer"
            >
                <WhatsappIcon className={styles.icon} />
            </a>

            <a
                href={`http://www.facebook.com/sharer.php?u=${productEncodedUrl}`}
                target="_blank"
                rel="noreferrer"
            >
                <FacebookIcon className={styles.icon} />
            </a>

            <a
                href={`http://pinterest.com/pin/create/button/?url=${productEncodedUrl}`}
                target="_blank"
                rel="noreferrer"
            >
                <PinterestIcon className={styles.icon} />
            </a>
        </div>
    );
};
