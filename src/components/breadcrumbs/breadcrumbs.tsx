import { useLocation, useMatches } from '@remix-run/react';
import { RouteMatch } from '~/router/types';
import styles from './breadcrumbs.module.scss';
import { ArrowRightIcon } from '../icons';

export const Breadcrumbs = () => {
    const matches = useMatches() as RouteMatch[];
    const location = useLocation();

    return (
        <div className={styles.breadcrumbs}>
            {matches
                .flatMap((match) => match.handle?.breadcrumb?.(match, location) ?? [])
                .map((breadcrumb, index, arr) => [
                    breadcrumb,
                    index !== arr.length - 1 && <ArrowRightIcon className={styles.separatorIcon} />,
                ])}
        </div>
    );
};
