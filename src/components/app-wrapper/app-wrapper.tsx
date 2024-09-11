import { Header } from '~/components/header/header';
import { Footer } from '~/components/footer/footer';

export const AppWrapper = ({ children }: React.PropsWithChildren) => {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    );
};
