import { Cart } from '../cart/cart';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { Toaster } from '../toaster/toaster';

import styles from './site-wrapper.module.scss';

export const SiteWrapper = ({ children }: React.PropsWithChildren) => {
    return (
        <div className={styles.root}>
            <Header />
            <main className={styles.main}>{children}</main>
            <Footer />

            <Toaster />
            <Cart />
        </div>
    );
};
