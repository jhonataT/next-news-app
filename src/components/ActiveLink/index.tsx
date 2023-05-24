import Link from 'next/link';
import { useRouter } from 'next/router';

interface ActiveLinkProps {
    label: string;
    activeClassName: string;
    prefetch?: boolean;
    to: string;
}

export const ActiveLink = ({prefetch, label, to, activeClassName  }: ActiveLinkProps) => {
    const { asPath } = useRouter();

    return <Link
        href={to}
        className={asPath === to ? activeClassName : ''}
        prefetch={prefetch}
    >
        {label}
    </Link>
}