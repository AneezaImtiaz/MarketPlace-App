import React from 'react';
import Link from 'next/link';
import { ROUTES } from '../../utils/Constants';
import { headerStyles } from '../../styles';

const Header: React.FC = () => {
  return (
    <header className={headerStyles.header}>
      <nav>
        <Link href="/" passHref>
          <span className={headerStyles.link}>{ROUTES.marketPlace}</span>
        </Link>
        <Link href="/cart" passHref>
          <span className={headerStyles.link}>{ROUTES.cart}</span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
