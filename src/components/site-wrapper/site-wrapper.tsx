import { Cart } from '../cart/cart';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { Toaster } from 'react-hot-toast';
import { Toast } from '../toaster/toast/toast';

import styles from './site-wrapper.module.scss';

export const SiteWrapper = ({ children }: React.PropsWithChildren) => {
    return (
        <div className={styles.root}>
            <Header />
            <main className={styles.main}>{children}</main>
            <Footer />

            <Toaster
                containerStyle={{
                    inset: '0',
                }}
            >
                {(t) => <Toast toastData={t} />}
            </Toaster>
            <Cart />
        </div>
    );
};
