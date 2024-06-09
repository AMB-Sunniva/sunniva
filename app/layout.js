import "./globals.css";

export default function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <title>My Site</title>
      </head>
      <body>
        <header>
          <nav>
            <a href="/">Home</a>
            <a href="/what-we-offer">What We Offer</a>
            <a href="/why-sunniva">Why Sunniva</a>
            <a href="/installer">Installers</a>
            <a href="/shop">Shop</a>
            <a href="/contact-us">Contact Us</a>
          </nav>
        </header>
        <main>{children}</main>
        <footer>
          <p>© 2023 My Site</p>
        </footer>
      </body>
    </html>
  );
}
