export default function Faqs() {
    return (
        <div className="container mx-auto py-8">
            <div style={{ padding: "6rem 0rem 2rem", textAlign: "center" }}>
                <hr style={{ width: "3%", borderColor: "#333", margin: "30px auto" }} />
                <h1
                style={{
                    fontSize: "2.5rem",
                    fontWeight: "lighter",
                    color: "#474949",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                }}
                >
                Frequently Asked Questions (FAQs)
                </h1>
            </div>
            <div>
                <div className="flex flex-col space-y-4 text-custom-gray">
                    <div className="bg-custom-light-gray p-4">
                            <ol className="list-decimal ml-6 text-lg">
                                <li>
                                <span className="font-bold">What is included in a Sunniva Solar kit?</span>
                                    <p className="font-light pl-2">Our solar kits come with everything you need for installation, including:</p>
                                    <ul className="list-disc list-inside ml-6 text-lg font-light pl-2">
                                        <li>
                                        Solar panels (pre-installed on your chosen structure)
                                        </li>
                                        <li>
                                        Mounting hardware
                                        </li>
                                        <li>
                                        Electrical components and connections
                                        </li>
                                        <li>
                                        Detailed installation instructions
                                        </li>
                                        <li>
                                        Video training resources
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                <span className="font-bold">How long does installation take?</span>
                                    <p className="font-light pl-2">Installation time varies based on the kit size and complexity, but most homeowners can complete the installation in a weekend. We provide detailed instructions and video training to help ensure a smooth process.</p>
                                </li>
                                <li>
                                <span className="font-bold">Can I install the kit myself, or do I need a professional?</span>
                                    <p className="font-light pl-2">Our kits are designed for DIY installation, and many customers successfully install them themselves. However, if you prefer, you can hire a local installer. We also have partnerships with residential solar installers who can assist with the installation. To ensure your safety and compliance with local regulations, please have a licensed electrician connect your system and have it inspected before turning it on.</p>
                                </li>
                                <li>
                                <span className="font-bold">How do I choose the right size and design for my needs?</span>
                                    <p className="font-light pl-2">Consider your space, desired shade, and energy needs. Our product catalog on the website includes detailed information on the sizes and designs available. You can also contact us for personalized recommendations.</p>
                                </li>
                                <li>
                                <span className="font-bold">What maintenance is required for the solar panels and shade structure?</span>
                                    <ul className="list-disc list-inside ml-6 text-lg">
                                        <li>Solar Panels:
                                            <span className="font-light pl-2"> 
                                            Clean at least twice a year with a soft cloth and mild soap. Regularly check for debris and monitor performance.
                                            </span>
                                        </li>
                                        <li>Shade Structure:
                                            <span className="font-light pl-2"> 
                                            Clean every few months with a soft brush or cloth. Restain wood every 2-3 years as needed.
                                            </span>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                <span className="font-bold">What should I do if I notice a problem with my solar panels or structure?</span>
                                    <p className="font-light pl-2">Contact our customer support team immediately at office@sunnivasol.com or call (970)759-5502. We will guide you through troubleshooting steps or process a warranty claim if needed.</p>
                                </li>                                                                    
                                <li>
                                <span className="font-bold">How can I track my order and delivery?</span>
                                    <p className="font-light pl-2">Once your order is processed, you will receive an email with tracking information. You can use this information to track the shipment through our carrier&apos;s website.</p>
                                </li>                                                                    
                                <li>
                                <span className="font-bold">Are there any additional features or customizations available?</span>
                                    <p className="font-light pl-2">Yes, we offer various customization options, including size, design, attachment style, stain color, and panel type. You can also add features like privacy walls, fans, outlets, and more. For detailed customization, visit the &quot;What We Offer&quot; page or contact us.</p>
                                </li>                                                                    
                                <li>
                                    <span className="font-bold">What is the warranty for Sunniva Solar products?</span>
                                    <p className="font-light pl-2">Our warranty covers:</p>
                                    <ul className="list-disc list-inside ml-6 text-lg">
                                        <li>Solar Panels &amp; Inverters:
                                            <span className="font-light pl-2"> 
                                            Under manufacturer&apos;s warranties (specific terms are included in the documentation).
                                            </span>
                                        </li>
                                        <li>Structure and Hardware:
                                            <span className="font-light pl-2"> 
                                            3 years from the date of purchase, excluding damage from improper installation or acts of nature.
                                            </span>
                                        </li>
                                        <li>Shipping Damage:
                                            <span className="font-light pl-2"> 
                                            Replacements are free if reported within 30 days of receipt.
                                            </span>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                <span className="font-bold">How does the referral program work?</span>
                                    <p className="font-light pl-2">Refer friends or family to Sunniva Solar, share your unique referral code, and earn a $200 Visa gift card for each successful referral. For details and to receive your referral code, contact us.</p>
                                </li>
                                <li>
                                <span className="font-bold">How can I learn more about solar energy and its benefits?</span>
                                    <p className="font-light pl-2">We offer educational resources on our website, including blog posts and video tutorials. Follow us on social media for the latest updates and tips.</p>
                                </li>
                                <li>
                                <span className="font-bold">Where can I find more information about your sustainability practices?</span>
                                    <p className="font-light pl-2">Visit our &quot;Sustainability Commitment&quot; page to learn more about how we use eco-friendly materials, support local communities, and reduce our environmental footprint.</p>
                                </li>
                                <li>
                                <span className="font-bold">What are the payment options available for purchasing a kit?</span>
                                    <p className="font-light pl-2">We accept various payment methods, including major credit cards and payment through Stripe. For more details on payment options, visit our checkout page.</p>
                                </li>
                                <li>
                                <span className="font-bold">How do I get in touch with Sunniva Solar for support or inquiries?</span>
                                    <p className="font-light pl-2">You can contact us via email at office@sunnivasol.com or call us at (970)759-5502. We&apos;re here to assist you with any questions or concerns.</p>
                                </li>
                            </ol>
                    </div>
                </div>
            </div>
        </div>
    )
}