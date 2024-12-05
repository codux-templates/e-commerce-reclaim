import { Form } from '@remix-run/react';
import React, { useCallback } from 'react';
import { CrossSmallIcon, SearchIcon } from '../icons';
import styles from './search-input.module.scss';

export interface SearchInputProps {
    defaultValue?: string;
    onSubmit?: React.FormEventHandler<HTMLFormElement>;
    onChange?: React.FormEventHandler<HTMLInputElement>;
}

export const SearchInput = React.memo<SearchInputProps>(function SearchInput({
    defaultValue,
    onSubmit,
    onChange,
}) {
    const inputRef = React.useRef<HTMLInputElement>(null);
    // input is uncontrolled, so we clear it manually
    const onClickClear = useCallback(() => (inputRef.current!.value = ''), []);

    return (
        <Form className={styles.form} role="search" onSubmit={onSubmit}>
            <SearchIcon className={styles.searchIcon} width={14} />
            <input
                ref={inputRef}
                className={styles.input}
                type="text"
                name="search"
                spellCheck="false"
                defaultValue={defaultValue}
                placeholder="Search"
                onChange={onChange}
                minLength={2}
            />
            <CrossSmallIcon className={styles.clearIcon} onClick={onClickClear} />
        </Form>
    );
});
