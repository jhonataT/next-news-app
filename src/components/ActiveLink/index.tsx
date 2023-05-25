import Link from 'next/link';
import { useRouter } from 'next/router';

interface ActiveLinkProps {
    label: string;
    activeClassName: string;
    to: string;
}

export const ActiveLink = ({label, to, activeClassName  }: ActiveLinkProps) => {
    const { asPath } = useRouter();

    return <Link
        href={to}
        className={asPath === to ? activeClassName : ''}
    >
        {label}
    </Link>
}