import styles from "./page.module.css";
import AddOnGallery from "@/components/AddOn/AddOnGallery";
import Link from "next/link";
import Button from "@/components/Button";

export default function WhatWeOffer() {
  return (
    <div>
      <div className={styles.title}>
        <h1 style={{ paddingTop: "32px" }}>WHAT WE OFFER</h1>
        <p>
          At Sunniva Solar, we specialize in transforming your outdoor spaces
          with our versatile range of solar and shade structures. Our premium
          solar shade systems combine stylish design with functionality,
          providing both shelter and renewable energy for your home. For those
          seeking just shade, our elegant shade structures offer comfort and
          protection from the elements. Alternatively, our stand-alone solar
          products deliver efficient energy solutions without the need for
          additional coverage. Explore our innovative offerings and discover how
          we can enhance your home with quality and sustainability.
        </p>
      </div>
      <div className={styles.customization}>
        <hr style={{ width: "3%", borderColor: "#333", margin: "30px auto" }} />
        <h1>Customizations</h1>
        <p>
          We believe your outdoor space should be as unique as you are.
          That&apos;s why we offer a range of customization options for our
          solar and shade structures to perfectly match your style and needs.
        </p>
        <ol>
          <li>
            <span className="font-bold">Size and Design</span>
            <div>
              Choose from various sizes and designs to fit your space and
              aesthetic preferences. Whether you need a compact shade or a large
              solar system, we have options to suit every requirement.
            </div>
          </li>
          <li>
            <span className="font-bold">Attachment Style</span>
            <div>
              Select the attachment style that best integrates with your home or
              property. Our flexible options ensure a secure and seamless fit.
            </div>
          </li>
          <li>
            <span className="font-bold">Stain Color</span>
            <div>
              Personalize your structure with a range of stain colors to
              complement your existing décor. From natural wood tones to vibrant
              hues, you can achieve the look you desire.
            </div>
          </li>
          <li>
            <span className="font-bold">Lumber Size</span>
            <div>
              Customize the lumber size for added strength and durability.
              Tailor the dimensions to suit specific weather conditions or
              architectural features.
            </div>
          </li>
          <li>
            <span className="font-bold">End Board Design</span>
            <div>
              Choose from various end board designs to add a touch of elegance
              and uniqueness to your structure.
            </div>
          </li>
          <li>
            <span className="font-bold">Solar Panel Type</span>
            <div>
              Select from different types of high-efficiency solar panels to
              meet your energy needs and aesthetic preferences.
            </div>
          </li>
          <li>
            <span className="font-bold">Additional Features</span>
            <div>
              Enhance your structure with optional features such as privacy
              walls, fans, outlets, grills, firepits, and lights. While these
              additions are not included with the purchase, they are compatible
              with our structures.
            </div>
          </li>
        </ol>
        <Link href="/shop">
          <Button type="bigPrimary">SHOP NOW</Button>
        </Link>
      </div>
      <div className={styles.container}>
        <div className={styles.title}>
          <hr
            style={{ width: "3%", borderColor: "#333", margin: "30px auto" }}
          />
          <h1>Add-Ons / Design Help</h1>
          <p>
            At Sunniva Solar, we believe that your outdoor space should be a
            reflection of your personal style and imagination. Our solar and
            shade structures are designed to be more than just
            functional—they&apos;re a blank canvas for your dreams.
            <br />
            Imagine transforming your backyard into a haven for relaxation and
            entertainment. Picture yourself hosting summer barbecues under a
            stylish shade structure that keeps your guests comfortable. Or
            envision a serene retreat with a cozy firepit and soft, ambient
            lighting that sets the perfect mood for evening gatherings.
          </p>
          <div className={styles.list}>
            <p>Here are a few ideas to spark your imagination:</p>
            <ul>
              <li>
                <span className="font-bold">Outdoor Lounge:</span> Create a
                luxurious lounge area with plush furniture, a ceiling fan for
                comfort, and soft lighting for a cozy atmosphere.
              </li>
              <li>
                <span className="font-bold">Entertainment Hub:</span> Set up a
                space for entertaining with a built-in grill, a stylish privacy
                wall, and ample seating for friends and family.
              </li>
              <li>
                <span className="font-bold">Serene Sanctuary:</span> Design a
                peaceful retreat with privacy walls, a soothing firepit, and
                calming lights that invite relaxation and tranquility.
              </li>
              <li>
                <span className="font-bold">Functional Workspace:</span>{" "}
                Transform part of your structure into an outdoor workspace with
                electrical outlets, good lighting, and a comfortable seating
                area.
              </li>
            </ul>
          </div>
          <p>
            The possibilities are endless, and the choice is yours. Whether
            you&apos;re envisioning a vibrant social space, a tranquil escape,
            or a versatile area for various activities, Sunniva Solar&apos;s
            customizable structures can help you create a unique and beautiful
            environment tailored to your desires.
            <br />
            Let your creativity flow and turn your outdoor space into a dream
            come true with Sunniva Solar. Explore our options and start bringing
            your vision to life today!
          </p>
        </div>
      </div>
    </div>
  );
}
