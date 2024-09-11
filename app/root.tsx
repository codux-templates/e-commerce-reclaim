import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';
import { getEcomApi } from '~/api/ecom-api';
import { AppWrapper } from '~/components/app-wrapper/app-wrapper';
import { ProductCategoriesContext } from '~/components/context';

export const Layout = ({ children }: React.PropsWithChildren) => {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta />
                <Links />
            </head>
            <body>
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
};

export const loader = async () => {
    const categories = await getEcomApi().getAllCategories();
    return json({ categories });
};

export default function App() {
    const { categories } = useLoaderData<typeof loader>();

    return (
        <ProductCategoriesContext.Provider value={categories}>
            <AppWrapper>
                <Outlet />
            </AppWrapper>
        </ProductCategoriesContext.Provider>
    );
}
