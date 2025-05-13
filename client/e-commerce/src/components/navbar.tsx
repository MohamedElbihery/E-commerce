import Link from "next/link";
import { FaShoppingCart, FaUser, FaHeart } from "react-icons/fa";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  // Static cart items for demo
  const cartItems = [
    { id: 1, name: "LCD Monitor" },
    { id: 2, name: "HI Gamepad" },
  ];

  return (
    <nav className={styles.navbar}>
      {/* Logo/Brand with hover effect */}
      <div className={styles.navbarBrand}>
        <Link href="/" className={styles.logoLink}>
          <span className={styles.logoPrimary}>Ex</span>
          <span className={styles.logoSecondary}>clusive</span>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className={styles.navbarLinks}>
        <Link href="/" className={styles.navLink}>
          Home
        </Link>
        <Link href="/contact" className={styles.navLink}>
          Contact
        </Link>
        <Link href="/about" className={styles.navLink}>
          About
        </Link>
        <Link href="/signup" className={styles.navLink}>
          Sign Up
        </Link>
      </div>

      {/* Search and User Actions */}
      <div className={styles.navbarActions}>
        <div className={styles.actionIcons}>
          <Link href="/wishlist" className={styles.iconLink}>
            <FaHeart className={styles.navIcon} />
            <span className={styles.cartBadge}>5</span>
          </Link>
          <Link href="/cart" className={styles.iconLink}>
            <FaShoppingCart className={styles.navIcon} />
            {cartItems.length > 0 && (
              <span className={styles.cartBadge}>{cartItems.length}</span>
            )}
          </Link>
          <Link href="/account" className={styles.iconLink}>
            <FaUser className={styles.navIcon} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
