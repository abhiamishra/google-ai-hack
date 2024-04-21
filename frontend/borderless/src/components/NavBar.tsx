import Link from 'next/link';

const NavBar: React.FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">
            <p>Home</p>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <p>About</p>
          </Link>
        </li>
        <li>
          <Link href="/contact">
            <p>Contact</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
