import { NavLink } from '@remix-run/react';
import { collections } from '@wix/stores';
import { ROUTES } from '~/router/config';

interface HeaderProps {
    categories: collections.Collection[];
}

export const Header = ({ categories }: HeaderProps) => {
    return (
        <header>
            <nav>
                <ul>
                    {categories.map((c) => (
                        <li key={c._id}>
                            <NavLink key={c._id} to={ROUTES.products.to(c.slug!)}>
                                {c.name}
                            </NavLink>
                        </li>
                    ))}
                    <li>
                        <NavLink to={ROUTES.aboutUs.path}>About Us</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};
