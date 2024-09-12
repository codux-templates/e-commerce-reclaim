import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import '../src/styles/index.scss';
import { Header } from '../src/components/header/header';

export default function App() {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta />
                <Links />
            </head>
            <body>
                <Header />
                <Outlet />
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}
