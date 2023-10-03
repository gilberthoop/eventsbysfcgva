import Image from "next/image";
import SFCLogo from "@/assets/sfc-logo-round.png";
import { useState } from "react";
import useNavigation from "@/hooks/use-navigation";

const SideMenuBar: React.FC = () => {
  const { getMenuItems } = useNavigation();
  const menuItems = getMenuItems();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`nav ${isMenuOpen ? "nav--open" : ""}`}>
      <button
        className="nav__toggle-btn"
        onClick={toggleMenu}
        aria-label="Toggle navigation"
      >
        <span className="nav__toggle-icon"></span>
      </button>

      <div
        className={`nav__sidebar ${
          isMenuOpen
            ? "nav__sidebar-mobile nav__sidebar--slide-in"
            : "nav__sidebar-mobile--hidden"
        }`}
      >
        <div className="nav__logo">
          <Image className="nav__logo-img" src={SFCLogo} alt="SFC GVA Logo" />
        </div>
        <ul className="nav__list">
          {menuItems.map((link, index) => (
            <li className="nav__list-item" key={index}>
              <a href={link.href} onClick={link.action}>
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default SideMenuBar;
