import { useEffect, useState } from "react";
import "./App.css";

// First commit

function App() {
  const [page, setPage] = useState(() => {
    const hash = window.location.hash.toLowerCase();
    return hash === "#about"
      ? "about"
      : hash === "#lvl"
      ? "lvl"
      : hash === "#hd"
      ? "hd"
      : hash === "#contact"
      ? "contact"
      : hash === "#gallery"
      ? "gallery"
      : "home";
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      setPage(
        hash === "#about"
          ? "about"
          : hash === "#lvl"
          ? "lvl"
          : hash === "#hd"
          ? "hd"
          : hash === "#contact"
          ? "contact"
          : hash === "#gallery"
          ? "gallery"
          : "home"
      );
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleSectionClick = (targetPage, hash, offset = 0) => (event) => {
    event.preventDefault();

    const start = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const getTargetScroll = () => {
      const directTarget =
        hash === "#"
          ? document.querySelector(".hero")
          : hash === "#contact"
          ? document.querySelector(".contact-page") || document.querySelector(hash)
          : document.querySelector(hash);

      if (directTarget) {
        return Math.max(0, directTarget.offsetTop - offset);
      }

      const fallbackTarget = document.querySelector(
        ".gallery-page, .about-page, .lvl-page, .hd-page, .contact-page"
      );

      return fallbackTarget ? Math.max(0, fallbackTarget.offsetTop - offset) : 0;
    };

    setPage(targetPage);
    window.history.replaceState(null, "", hash);

    requestAnimationFrame(() => {
      const targetScroll = getTargetScroll();
      const distance = targetScroll - start;
      const duration = 1400;
      const startTime = performance.now();

      const animateScroll = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        window.scrollTo(0, start + distance * eased);

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      };

      requestAnimationFrame(animateScroll);
    });
  };

  const handleGalleryClick = handleSectionClick("gallery", "#gallery");
  const handleGalleryFigcaptionClick = handleSectionClick("gallery", "#gallery", 54);
  const handleContactClick = handleSectionClick("contact", "#contact");
  const handleAboutClick = handleSectionClick("about", "#about");
  const handleServicesClick = handleSectionClick("home", "#services");
  const handleHomeClick = handleSectionClick("home", "#");

  const isAbout = page === "about";
  const isLVL = page === "lvl";
  const isHD = page === "hd";
  const isGallery = page === "gallery";
  const isContact = page === "contact";

  useEffect(() => {
    const seo = {
      home: {
        title: "The Brow House | HD Brows, Eyebrow & LVL Lashes in Cheadle Hulme, Bramhall & Stockport",
        description:
          "The Brow House offers HD Brows, eyebrow shaping, LVL lashes, brow lamination, hybrid brows, threading and tint services in Cheadle Hulme, Bramhall, Cheadle, Woodford, Hazel Grove, Gatley and Wilmslow."
      },
      gallery: {
        title: "Brow & Lash Gallery | HD Brows, LVL Lashes & Brow Treatments in Stockport",
        description:
          "View recent HD Brows, eyebrow shaping, LVL lashes, brow lamination and hybrid brow results from The Brow House in Cheadle Hulme, Bramhall and Stockport."
      },
      about: {
        title: "About The Brow House | HD Brows, Eyebrow & LVL Lashes in Stockport",
        description:
          "Learn about The Brow House, a boutique brow and lash studio in Cheadle Hulme, Bramhall, Stockport and nearby areas specialising in HD Brows, eyebrow shaping and LVL lashes."
      },
      contact: {
        title: "Contact The Brow House | Brow Studio in Cheadle Hulme, Bramhall & Stockport",
        description:
          "Contact The Brow House for appointments, directions and brow treatments including HD Brows, LVL lashes, tint, threading and brow lamination in Cheadle Hulme, Bramhall and Stockport."
      }
    };

    const pageSeo = seo[page] || seo.home;
    document.title = pageSeo.title;

    let descriptionMeta = document.querySelector('meta[name="description"]');
    if (!descriptionMeta) {
      descriptionMeta = document.createElement("meta");
      descriptionMeta.setAttribute("name", "description");
      document.head.appendChild(descriptionMeta);
    }
    descriptionMeta.setAttribute("content", pageSeo.description);
  }, [page]);

  return (
    <div className="app">
      <main className={`page ${page === "gallery" ? "page--gallery" : ""}`}>
        <section className="hero">
          <div className="hero__content">
            <div className="hero__logo">
              <img src="/logo.jpg" alt="The Brow House logo" />
            </div>
            <p>
              The Brow House is your local boutique brow studio in Cheadle Hulme / Bramhall.  We specialise in HD Brows & LVL Lashes.
            </p>
            <div className="hero__actions">
              <a className="btn btn-secondary" href="#gallery" onClick={handleGalleryClick}>
                View gallery
              </a>
              <a className="btn btn-secondary" href="#services" onClick={handleServicesClick}>
                Services Price List
              </a>
              <a className="btn btn-primary" href="tel:+441234567890">
                Book an appointment
              </a>
              <a className="btn btn-secondary" href="https://wa.me/441234567890?text=Hi%20BrowHouse%2C%20I%27d%20like%20to%20book%20an%20appointment" target="_blank" rel="noreferrer">
                Message on WhatsApp
              </a>
              <a className="btn btn-secondary" href="#contact" onClick={handleContactClick}>
                Contact / Find Us
              </a>
              <a className="btn btn-secondary" href="#about" onClick={handleAboutClick}>
                About us
              </a>
            </div>
          </div>
        </section>

        {isGallery && (
          <section id="gallery" className="section gallery-page">
            <div className="section__headline">
              <h2>Gallery</h2>
              <p>Browse the latest brow and lash work from The Brow House.</p>
            </div>
            <div className="grid gallery">
              <figure className="gallery-item" aria-label="Brow gallery image one">
                <div className="gallery-item__image">
                  <img src="/gallery-custom-1.jfif" alt="Brow gallery image 1" />
                </div>
              </figure>
              <figure className="gallery-item" aria-label="Brow gallery image two">
                <div className="gallery-item__image">
                  <img src="/gallery-custom-2.jfif" alt="Brow gallery image 2" />
                </div>
              </figure>
            </div>
            <div className="about-actions">
              <a className="btn btn-secondary" href="#about" onClick={handleAboutClick}>
                About us
              </a>
              <a className="btn btn-secondary" href="#" onClick={handleHomeClick}>
                Back to home
              </a>
            </div>
          </section>
        )}

        {isAbout && (
          <section className="section about-page">
            <div className="section__headline">
              <h2>About Us</h2>
              <p>
                Vina is a fully trained and qualified <a href="http://www.hdbrows.com" target="_blank" rel="noreferrer">HD Brows stylist</a>, a fully trained and qualified <a href="http://nouveaulashes.com/consumer/treatment-guide/enhance-with-lvl" target="_blank" rel="noreferrer">LVL Lashes technician</a> and is also seperately qualified to provide eyelash tints. Vina decided to turn her passion for eyebrows and eyelashes into a successful career by opening her own contemporary new business, The Brow House, specialising in <a href="http://www.hdbrows.com" target="_blank" rel="noreferrer">HD Brows</a> and <a href="http://nouveaulashes.com/consumer/treatment-guide/enhance-with-lvl" target="_blank" rel="noreferrer">LVL Lashes</a>.
              </p>
            </div>
            <div className="about-content">
              <p>
                Vina is very passionate about her eyebrows and eyelashes, and when she moved house from Manchester to Stockport she was continuing to travel to her previous neighbourhood, Didsbury, to have her eyelashes and eyebrows styled as she couldn’t find any salons local to Cheadle Hulme or Bramhall that she was consistently happy with. Consequently she decided that there was a gap in the local market for high quality eyebrow and eyelash care and opened her own business.
              </p>
              <img className="lvl-image" src="http://www.browhouse.uk/images/HD%20Brows%20Offical%20Stylist%20Vina2.jpg" alt="HD Brows Offical Stylist" />
              <p>
                As a busy working mother, Vina often struggled with regular salon opening hours and consequently The Brow House offers very flexible hours. The Brow House is open until 10pm on weekdays and 6pm on Saturday with private off road parking.
              </p>
              <p>
                To make an appointment please email <a href="mailto:vinaclegg@hotmail.co.uk">vinaclegg@hotmail.co.uk</a>, or call or text <a href="tel:07739395899">07739 395899</a>. HD Brows for £30.50 and LVL Lashes for £46 or both HD Brows and LVL Lashes together for the reduced price of £68.
              </p>
              <p>
                Please visit our <a href="#contact" onClick={handleContactClick}>Find / Contact Us</a> page for our address and a map.
              </p>
            </div>
            <div className="about-actions">
              <a className="btn btn-secondary" href="#services" onClick={handleServicesClick}>
                View services
              </a>
              <a className="btn btn-secondary" href="#" onClick={handleHomeClick}>
                Back to home
              </a>
            </div>
          </section>
        )}

        {isLVL && (
          <section className="section lvl-page">
            <div className="section__headline">
              <h2>What are LVL Lashes?</h2>
              <p>
                Created exclusively by Nouveau Lashes, LVL Lashes (aka LVL Enhance) is the revolutionary natural lash treatment taking the beauty industry by storm.
              </p>
            </div>
            <div className="about-content">
              <p>
                Highly regarded by beauty press and enthusiasts worldwide, LVL Enhance adds Length, Volume and Lift (LVL) to natural eyelashes, with no extensions, no adhesive and no mascara.
              </p>
              <img className="lvl-image" src="http://www.browhouse.uk/images/LVL%20Lashes%20LVL%20Enhance.jpg" alt="LVL Lashes eyelashes" />
              <p>
                Celebrity make-up artist, Lisa Eldridge says “LVL is one of the quickest ways to brighten and lift your entire face.”
              </p>
              <div className="video-embed">
                <iframe
                  src="https://www.youtube.com/embed/Mjf2CrUO1DY"
                  title="LVL Lashes Treatment"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <p>
                Unlike a traditional lash perm, LVL Enhance straightens your natural lashes at the root, creating the appearance of longer, thicker lashes. Plus the added lash tint creates a mascara-style effect, so you’re lash perfect from the moment you wake up in the morning.
              </p>
              <p>
                Ideal for those seeking a more natural look, the treatment takes just 40-50 minutes but the effects are instant and last from six to eight weeks. Little maintenance is required after the treatment.
              </p>
              <p>
                What’s more, by combining the treatment with regular use of Nouveau Lashes Lash Conditioner Serum to nourish your lashes, you could be about to say goodbye to mascara for good!
              </p>
              <p>
                At Nouveau Lashes and The Brow House we understand how important your lashes are. Vina at The Brow House is a fully trained and qualified LVL Lashes technician and is also separately qualified to provide eyelash tints.
              </p>
              <p>
                Please note a patch test for the LVL treatment is required at least 48 hours prior to your appointment, which we perform at The Brow House.
              </p>
              <p>
                The Brow House is located on the border of Cheadle Hulme and Bramhall and most of our customers come from South Manchester, Stockport, Wilmslow, Poynton, Macclesfield and North and East Cheshire.
              </p>
              <p>
                Please view our <a href="#contact" onClick={handleContactClick}>Contact / Find Us</a> page for address details and a map.
              </p>
              <img className="lvl-image" src="http://www.browhouse.uk/images/LVL%20Lashes%20before%20and%20after.jpg" alt="LVL Lashes before and after" />
              <p>
                Only qualified LVL Lashes technicians can carry out the LVL Lashes treatment, and The Brow House now offers this exclusive treatment. LVL Lashes for £35 or book HD Brows and LVL Lashes together for the reduced price of £55.
              </p>
              <p>
                For more information please visit the official LVL Lashes website at <a href="https://nouveaulashes.com/consumer/treatment-guide/enhance-with-lvl" target="_blank" rel="noreferrer">nouveaulashes.com</a>.
              </p>
              <div className="faq-section">
                <h3>Frequently asked questions</h3>
                <p><strong>How does it work?</strong> LVL is a groundbreaking technique designed to give you longer-looking lashes without the need for lash extensions. The treatment involves tinting and straightening, rather than curling the lash. This makes the lashes look longer, thicker and more visible.</p>
                <p><strong>What does LVL stand for?</strong> Length, Volume and Lift.</p>
                <p><strong>Where was LVL developed?</strong> LVL was developed exclusively by the Nouveau Lashes in-house design team. They recognised that there was a huge demand for natural lash enhancements, particularly for people who didn't want lash extensions.</p>
                <p><strong>Does it hurt?</strong> No, in fact, clients often find LVL treatments extremely relaxing. They can relax and close their eyes during the treatment.</p>
                <p><strong>I have downward-pointing lashes, can I have LVL?</strong> Yes. LVL can provide lift to downward-pointing lashes.</p>
              </div>
            </div>
            <div className="about-actions">
              <a className="btn btn-secondary" href="#contact" onClick={handleContactClick}>
                Contact us
              </a>
              <a className="btn btn-secondary" href="#" onClick={handleHomeClick}>
                Back to home
              </a>
            </div>
          </section>
        )}

        {isHD && (
          <section className="section hd-page">
            <div className="section__headline">
              <h2>What are HD Brows?</h2>
              <p>
                HD (High Definition) Brows have recently revolutionised eyebrow styling to give everyone that extra look-good and more importantly feel-good factor. It’s much more than simply eyebrow shaping! HD Brows is a unique 7 step system for creating perfectly well-groomed eyebrows.
              </p>
            </div>
            <div className="about-content">
              <p>
                Eyebrows are almost as individual as fingerprints, and our tailored procedure transforms even the most unruly, sparse or over-plucked brows into perfect arches to suit the wearer’s face. The HD Brows experience takes approximately 45 minutes and features tinting, waxing and threading, with stylists using a specially designed process to give you your perfect brows.
              </p>
              <img className="lvl-image" src="http://www.browhouse.uk/Images/eyebrows%20after%20big2.jpg" alt="HD Brows after" />
              <p>
                Every HD Brows treatment is exclusive. Even if you have sparse areas, hope isn’t lost! We will work with you on a re-growth programme to achieve the perfect brows for you. Plus, the new HD Brows Make Up range of brow products such as pencils, brushes, powders and more will allow you to hide those areas until they grow in if needed. The effects are so good, that they have even been compared to a mini-facelift, and celebrity fans of HD Brows include The Saturdays, Emeli Sandé, Alesha Dixon and Amanda Holden.
              </p>
              <p>
                As a branded treatment, every eyebrow procedure is performed using the specially formulated HD Brows professional range of products, ensuring the quality of all treatments is consistently high.
              </p>
              <p>
                HD Brows was chosen as the official ‘Brow’ brand for the X-factor in 2010 and subsequently became a registered trademark in 2011.
              </p>
              <p>
                For more infromation please visit the offical HD Brows website - <a href="http://www.hdbrows.com" target="_blank" rel="noreferrer">www.hdbrows.com</a>
              </p>
              <img className="lvl-image" src="http://www.browhouse.uk/images/HD288-HD-Stylists-Resources%202.jpg" alt="HD Brows" />
              <h3>The HD Brows Experience – The 7 Key Steps</h3>
              <ul>
                <li>Preparation</li>
                <li>Personal consultation</li>
                <li>Custom blended colouring</li>
                <li>Designing the shape</li>
                <li>Creating the shape</li>
                <li>Tailoring the brow</li>
                <li>Customised aftercare</li>
              </ul>
              <h3>HD Brows Couture Style</h3>
              <p>
                HD Brows takes eyebrow styling to a whole new level. The Couture approach is about:
              </p>
              <ul>
                <li>Quality</li>
                <li>Glamour</li>
                <li>Affordable luxury</li>
                <li>Attention to detail</li>
                <li>Artistic skill</li>
                <li>Eyebrows designed specifically for the individual</li>
              </ul>
              <p>
                The HD Brows design formula uses specific points on your face to create the angles, working with your bone structure. Using wax to remove hair, the HD Brows design shape is created. The shape is then tailored by adding curves, angles and make-up to create a finished brow.
              </p>
              <h3>HD Brows VS traditional eyebrow shaping</h3>
              <p>
                HD Brows has evolved traditional eyebrow shaping from a quick salon visit into the ultimate eyebrow styling experience by using a proven design formula for bespoke, couture brows and by refining, developing and perfecting traditional brow shaping techniques.
              </p>
              <p>
                HD Brows stylists also provide a range of branded home care products to allow you to continue the experience at home. HD Brows specialists will also focus on long term results and ultimate brow design, rather than quick hair removal, often following a regrowth programme.
              </p>
              <img className="lvl-image" src="http://www.browhouse.uk/images/white%20HD%20Brows.jpg" alt="HD Brows logo" />
              <h3>Factors that are taken into account to create your HD brows</h3>
              <p>
                The following factors are considered by the HD Brows stylist when designing your eyebrows:
              </p>
              <ul>
                <li>Brow formation</li>
                <li>Brow proportions</li>
                <li>Brow positioning</li>
                <li>The desired long term shape</li>
                <li>Facial shape and features</li>
                <li>Your preferences</li>
                <li>Current hair growth</li>
              </ul>
              <h3>The Brow House – HD Brows Specialists</h3>
              <p>
                Only qualified <a href="#about" onClick={handleAboutClick}>HD Brows stylists</a> can carry out the HD Brows treatment, and <a href="#" onClick={handleHomeClick}>The Brow House</a> now offers this exclusive treatment. HD Brows for £30.50 or book HD Brows and LVL Lashes together for the reduced price of £68.
              </p>
              <p>
                Please note that a patch test must be carried out 48 hours prior to treatment, which we can post or deliver to your door if you are local to South Manchester, Stockport or North Cheshire as The Brow House is located on the border of Cheadle Hulme and Bramhall.
              </p>
              <p>
                Please view our <a href="#contact" onClick={handleContactClick}>Contact / Find Us</a> page for address details and a map.
              </p>
            </div>
            <div className="about-actions">
              <a className="btn btn-secondary" href="#contact" onClick={handleContactClick}>
                Contact us
              </a>
              <a className="btn btn-secondary" href="#" onClick={handleHomeClick}>
                Back to home
              </a>
            </div>
          </section>
        )}

        {isContact && (
          <section className="section contact-page">
            <div className="section__headline">
              <h2>Contact or Find Us</h2>
              <p>
                Get in touch with The Brow House for HD Brows, LVL Lashes, appointments and directions.
              </p>
            </div>
            <div className="about-content">
              <p>
                <strong>Address</strong>
              </p>
              <ul className="address-list">
                <li>16 Acre Lane</li>
                <li>Cheadle Hulme / Bramhall</li>
                <li>Stockport</li>
                <li>SK8 7PL</li>
              </ul>
              <p>
                <strong>Mobile:</strong> Call or text <a href="tel:07739395899">07739 395899</a><br />
                <strong>Email:</strong> <a href="mailto:vinaclegg@hotmail.co.uk">vinaclegg@hotmail.co.uk</a><br />
                <strong>Facebook:</strong> <a href="https://www.facebook.com/hdbrowsatthebrowhouse" target="_blank" rel="noreferrer">www.facebook.com/hdbrowsatthebrowhouse</a><br />
                <strong>Instagram:</strong> <a href="https://www.instagram.com/thebrowhouseuk" target="_blank" rel="noreferrer">@thebrowhouseuk</a>
              </p>
              <p>
                The Brow House is easy to find as it is a 2 minute drive from A34, located on the border of Cheadle Hulme and Bramhall, which is situated on the border of Manchester and Cheshire.
              </p>
              <p>
                We understand the needs of busy women and offer very flexible hours, to accommodate those who cannot make regular salon hours. We are open until 10pm on weekdays and 6pm on Saturday, with private off road parking.
              </p>
              <img className="lvl-image" src="http://www.browhouse.uk/images/Bramhall%20Cheadle%20Hulme%20Stockport%20map.jpg" alt="Bramhall Cheadle Hulme Stockport SK8 map" />
              <div className="about-actions">
                <a className="btn btn-secondary" href="mailto:vinaclegg@hotmail.co.uk">
                  Email us
                </a>
                <a className="btn btn-secondary" href="#" onClick={handleHomeClick}>
                  Back to home
                </a>
              </div>
              <div className="contact-social-icons">
                <a href="mailto:vinaclegg@hotmail.co.uk">
                  <img src="http://www.browhouse.uk/images/eyebrows%20email.jpg" alt="Email icon" />
                </a>
                <a href="https://www.facebook.com/hdbrowsatthebrowhouse" target="_blank" rel="noreferrer">
                  <img src="http://www.browhouse.uk/images/eyebrow%20facebook.jpg" alt="Facebook icon" />
                </a>
                <a href="https://www.instagram.com/thebrowhouseuk" target="_blank" rel="noreferrer">
                  <img src="http://www.browhouse.uk/images/eyebrow%20twitter.jpg" alt="Instagram icon" />
                </a>
              </div>
              <p className="footer-text">
                The Brow House, 16 Acre Lane, Cheadle Hulme / Bramhall, Stockport, SK8 7PL
              </p>
            </div>
          </section>
        )}

        <>
            <section className="section">
              <div className="section__headline">
                <h2>Explore</h2>
              </div>
              <div className="grid gallery">
                <figure className="gallery-item" aria-label="Full gallery">
                  <a href="#gallery" onClick={handleGalleryFigcaptionClick}>
                    <div className="gallery-item__image">
                      <img src="/gallery-custom-1.jfif" alt="Gallery preview" />
                    </div>
                    <figcaption>Gallery</figcaption>
                  </a>
                </figure>
                <figure className="gallery-item" aria-label="Brow lamination result">
                  <a href="#about" onClick={handleSectionClick("about", "#about", 54)}>
                    <div className="gallery-item__image">
                      <img src="/HD Brows Offical Stylist Vina3.jpg" alt="Brow stylist" />
                    </div>
                    <figcaption>About Us</figcaption>
                  </a>
                </figure>
              </div>
            </section>

            <section id="services" className="section">
          <div className="section__headline">
            <h2>Brow House Services</h2>
          </div>
          <div className="grid services-grid">
            <article className="service-card">
              <h3>HD Brows</h3>
              <p>Precision shaping that enhances your natural arch with soft, flattering definition.</p>
              <div className="service-price">£30.50</div>
            </article>
            <article className="service-card">
              <h3>Hybrid Brows</h3>
              <p>Rich, lasting colour for a polished look that saves time in your daily routine.</p>
              <div className="service-price">£33</div>
            </article>
            <article className="service-card">
              <h3>Brow lamination</h3>
              <p>Feathered texture and gentle hold for a soft, salon-fresh finish.</p>
              <div className="service-price">£45</div>
            </article>
            <article className="service-card">
              <h3>LVL Lashes</h3>
              <p>Feathered texture and gentle hold for a soft, salon-fresh finish.</p>
              <div className="service-price">£46</div>
            </article>
            <article className="service-card">
              <h3>HD Brows & LVL Lashes Combo</h3>
              <div className="service-price">£68</div>
            </article>
            <article className="service-card">
              <h3>Eyebrow Tint</h3>
              <div className="service-price">£11</div>
            </article>
            <article className="service-card">
              <h3>Eyelash Tint</h3>
              <div className="service-price">£13</div>
            </article>
            <article className="service-card">
              <h3>Eyelash & Brow Tint Combo</h3>
              <div className="service-price">£21</div>
            </article>
            <article className="service-card">
              <h3>HD Brows & Lash Tint Combo</h3>
              <div className="service-price">£41</div>
            </article>
            <article className="service-card">
              <h3>Upper Lip Thread/Wax</h3>
              <div className="service-price">£6</div>
            </article>
            <article className="service-card">
              <h3>Chin Thread</h3>
              <div className="service-price">£6</div>
            </article>
          </div>
        </section>

        <section className="section">
          <div className="section__headline">
            <h2>Our specialties</h2>
          </div>
          <div className="grid gallery">
            <figure className="gallery-item" aria-label="Brow shaping result">
              <a href="#hd" onClick={handleSectionClick("hd", "#hd", 54)}>
                <div className="gallery-item__image">
                  <img src="/gallery-after.jpg" alt="HD Brows" />
                </div>
                <figcaption>HD Brows</figcaption>
              </a>
            </figure>
            <figure className="gallery-item" aria-label="Brow tint result">
              <a href="#lvl" onClick={handleSectionClick("lvl", "#lvl", 54)}>
                <div className="gallery-item__image">
                  <img src="/gallery-before.jpg" alt="LVL Lashes" />
                </div>
                <figcaption>LVL Lashes</figcaption>
              </a>
            </figure>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="section__headline">
            <h2>Contact or Find Us</h2>
          </div>
          <div className="contact-details">
            <div className="contact-line contact-address">
              <strong>Address</strong>
              <ul className="address-list">
                <li>16 Acre Lane</li>
                <li>Cheadle Hulme / Bramhall</li>
                <li>Stockport</li>
                <li>SK8 7PL</li>
              </ul>
            </div>
            <div className="contact-line">
              <strong>Mobile</strong>
              <a href="tel:07739395899">07739 395899</a>
            </div>
            <div className="contact-line">
              <strong>Email</strong>
              <a href="mailto:vinaclegg@hotmail.co.uk">vinaclegg@hotmail.co.uk</a>
            </div>
            <div className="contact-line">
              <strong>Facebook</strong>
              <a href="https://www.facebook.com/hdbrowsatthebrowhouse" target="_blank" rel="noreferrer">www.facebook.com/hdbrowsatthebrowhouse</a>
            </div>
            <div className="contact-line">
              <strong>Instagram</strong>
              <a href="https://www.instagram.com/thebrowhouseuk" target="_blank" rel="noreferrer">@thebrowhouseuk</a>
            </div>
          </div>
        </section>

        <footer className="footer">
          <p>
            <a href="https://www.browhouse.uk">www.browhouse.uk</a>
          </p>
        </footer>
          </>
      </main>
    </div>
  );
}

export default App;
