import { collections } from '@wix/stores';
import { Header } from '~/components/header/header';
import { Footer } from '~/components/footer/footer';

interface AppWrapperProps {
    categories: collections.Collection[];
    children: React.ReactNode;
}

export const AppWrapper = ({ categories, children }: AppWrapperProps) => {
    return (
        <div>
            <Header categories={categories} />
            {children}
            <Footer categories={categories} />
        </div>
    );
};
