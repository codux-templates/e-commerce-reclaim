interface MenuIconProps {
    className?: string;
}

export const MenuIcon = ({ className }: MenuIconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
        className={className}
    >
        <path
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4 5h16v2H4V5Zm0 6h16v2H4v-2Zm16 6H4v2h16v-2Z"
        />
    </svg>
);
