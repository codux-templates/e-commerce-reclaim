interface MenuCloseIconProps {
    className?: string;
}

export const MenuCloseIcon = ({ className }: MenuCloseIconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
        className={className}
    >
        <path
            d="M10.94 12 6 7.06A.75.75 0 0 1 7.06 6L12 10.94 16.94 6A.75.75 0 1 1 18 7.06L13.06 12 18 16.94A.75.75 0 0 1 16.94 18L12 13.06 7.06 18A.75.75 0 1 1 6 16.94L10.94 12Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
        />
    </svg>
);
