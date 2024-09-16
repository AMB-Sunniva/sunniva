export default function Warranty() {
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
                Warranty Information
                </h1>
                <p className="text-xl p-4">Welcome to Sunniva Solar! We&apos;re excited to support you in your journey towards sustainable energy with our solar kits. To ensure your satisfaction and provide peace of mind, we offer a comprehensive warranty on various components of your solar system. Below, you will find detailed information about our warranty coverage, exclusions, and the process for making a claim.</p>
            </div>
            <div>
                <div className="flex flex-col space-y-4 text-custom-gray">
                    <div className="bg-custom-light-gray p-4">
                        <h1 className="text-lg font-bold uppercase">Warranty Coverage</h1>
                            <ol className="list-decimal ml-6 text-lg">
                            <li>
                            Solar Panels &amp; Inverters
                                <ul className="list-disc ml-6">
                                <li>Coverage: These components are covered under the manufacturer&apos;s warranties provided with your kit.</li>
                                <li>Duration: Please refer to the specific documentation included in your kit for the terms and conditions of the manufacturer&apos;s warranties.</li>
                                </ul>
                            </li>
                            <li>
                            Structure and Hardware
                                <ul className="list-disc ml-6">
                                <li>Coverage: Sunniva Solar warrants that the structure and hardware components (excluding solar panels and inverters) of your kit will be free from defects in materials and workmanship.</li>
                                <li>Duration: 3 years from the date of purchase.</li>
                                <li>Exclusions: This warranty does not cover damage caused by:
                                    <ul className="list-disc list-inside ml-6">
                                        <li>Improper installation</li>
                                        <li>Misuse or neglect</li>
                                        <li>Unauthorized modifications</li>
                                        <li>Acts of nature (e.g., lightning, wind, hail)</li>
                                    </ul>
                                </li>
                                </ul>
                            </li>
                            <li>
                            Shipping Damage
                                <ul className="list-disc ml-6">
                                <li>Coverage: Any parts damaged during shipping will be replaced free of charge.</li>
                                <li>Duration: Claims must be reported within 30 days of receiving the kit.</li>
                                </ul>
                            </li>
                            </ol>
                    </div>
                    <div className="p-4">
                        <h1 className="text-lg font-bold uppercase">Exclusions</h1>
                        <div className="text-lg">The following are not covered under the Sunniva Solar warranty:
                            <ul className="list-disc list-inside ml-6">
                                <li>Normal wear and tear</li>
                                <li>Cosmetic damage that does not affect functionality</li>
                                <li>Damage caused by improper installation or maintenance</li>
                                <li>Damage resulting from unauthorized modifications or repairs</li>
                            </ul>
                        </div>
                    </div>
                    <div className="bg-custom-light-gray p-4">
                    <h1 className="text-lg font-bold uppercase">How to Make a Warranty Claim</h1>
                            <ol className="list-decimal ml-6 text-lg">
                            <li>
                            Contact Customer Support: Reach out to our customer support team via email at office@sunnivasol.com or call us at (970)759-5502. Provide a detailed description of the issue and include your proof of purchase.
                            </li>
                            <li>
                            Provide Documentation:
                                <ul className="list-disc ml-6">
                                    <li>Photos: Include clear photos of the damage or defect.</li>
                                    <li>Additional Documentation: Provide any other documentation requested by our
                                    support team, such as installation records or purchase receipts.</li>
                                </ul>
                            </li>
                            <li>
                            Resolution:
                                <ul className="list-disc ml-6">
                                <li>Assessment: Our team will review the claim and, if approved, will arrange for the
                                repair or replacement of defective parts at no cost to you.</li>
                                <li>Return of Defective Parts: Sunniva Solar reserves the right to request the return
                                of defective parts before issuing a replacement.</li>
                                </ul>
                            </li>
                            </ol>
                    </div>
                    <div className="p-4">
                    <h1 className="text-lg font-bold uppercase">Peace of Mind</h1>
                        <p className="text-lg">
                        We are committed to delivering high-quality solar kits that meet your expectations and stand the test of time. Our warranty is designed to protect your investment and ensure you can enjoy the benefits of solar energy with confidence.
                        </p>
                        <p className="text-lg pt-4">For additional information or assistance, please don&apos;t hesitate to contact our customer support
                        team. Thank you for choosing Sunniva Solar!</p>
                        <div className="text-lg pt-4">Contact Us:
                            <ul className="list-disc ml-6">
                                <li>Email: office@sunnivasol.com</li>
                                <li>Phone: (970)759-5502</li>
                            </ul>
                        </div>
                    </div>
                    </div>
            </div>
        </div>
    )
}