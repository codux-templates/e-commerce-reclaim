import { Header } from '~/components/header/header';
import { Footer } from '~/components/footer/footer';

interface AppWrapperProps {
    children: React.ReactNode;
}

export const AppWrapper = ({ children }: AppWrapperProps) => {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    );
};
