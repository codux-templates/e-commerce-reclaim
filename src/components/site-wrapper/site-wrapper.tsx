import { Cart } from '../cart/cart';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { Toaster } from 'react-hot-toast';
import { Toast } from '../toast/toast/toast';

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
                containerClassName={styles.toaster}
                position="top-center"
                reverseOrder={false}
                gutter={8}
                toastOptions={{
                    style: {},
                    error: {
                        style: {},
                    },
                }}
            >
                {(t) => <Toast toastData={t} />}
            </Toaster>
            <Cart />
        </div>
    );
};
