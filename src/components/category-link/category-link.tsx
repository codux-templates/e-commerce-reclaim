import { NavLink } from '@remix-run/react';
import { ROUTES } from '~/router/config';

type ClassNameFunction = (states: { isActive: boolean; isPending: boolean }) => string;

export interface CategoryLinkProps {
    categorySlug: string;
    title: string;
    className?: string | ClassNameFunction;
}

export const CategoryLink = ({ categorySlug, title, className }: CategoryLinkProps) => {
    return (
        <NavLink to={ROUTES.products.to(categorySlug)} className={className}>
            {title}
        </NavLink>
    );
};
