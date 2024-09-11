import { NavLink } from '@remix-run/react';
import { ProductCategoriesContext } from '~/components/context';
import { useContext } from 'react';
import { ROUTES } from '~/router/config';

export const Header = () => {
    const categories = useContext(ProductCategoriesContext);

    return (
        <header>
            <nav>
                <ul>
                    {categories.map((category) => (
                        <li key={category._id}>
                            <NavLink key={category._id} to={ROUTES.products.to(category.slug!)}>
                                {category.name}
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
