import styles from "./Footer.module.css";
import {
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoYoutube,
  BiLogoTiktok,
} from "react-icons/bi";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Image
          src="/images/whiteLogo.png"
          alt="Sunniva"
          width={200}
          height={100}
          priority
        />
        <div className={styles.links}>
          <a href="/what-we-offer">WHAT WE OFFER</a>
          <a href="/why-sunniva">WHY SUNNIVA</a>
          <a href="/installer">INSTALLERS</a>
          <a href="/shop">SHOP</a>
          <a href="/contact-us">CONTACT US</a>
          <a href="/admin">ADMIN</a>
        </div>
        <div className={styles.links}>
          <a href="/warranty">WARRANTY</a>
          <a href="/referral-program">REFERRAL PROGRAM</a>
          <a href="/maintenance">MAINTENANCE</a>
          <a href="/faqs">FAQS</a>
        </div>
        <div className={styles.socialMedia}>
          <a
            href="https://www.facebook.com/people/Sunniva-Solar/100083357708143/"
            target="_blank"
            rel="noreferrer"
          >
            <BiLogoFacebook size="1.5em" />
          </a>
          <a
            href="https://www.instagram.com/sunnivasolar/"
            target="_blank"
            rel="noreferrer"
          >
            <BiLogoInstagram size="1.5em" />
          </a>
          <a
            href="https://www.youtube.com/@SunnivaSolar"
            target="_blank"
            rel="noreferrer"
          >
            <BiLogoYoutube size="1.5em" />
          </a>
          <a
            href="https://www.tiktok.com/@sunnivasolar"
            target="_blank"
            rel="noreferrer"
          >
            <BiLogoTiktok size="1.5em" />
          </a>
        </div>
      </div>
      <p className={styles.copyright}>© 2023 SUNNIVA</p>
    </footer>
  );
};

export default Footer;
