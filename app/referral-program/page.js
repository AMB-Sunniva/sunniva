export default function ReferralProgram() {
    return (
        <div className="container mx-auto py-8">
            <div style={{ padding: "6rem 0rem 2rem", textAlign: "center" }}>
                <h1
                style={{
                    fontSize: "2.5rem",
                    fontWeight: "lighter",
                    color: "#474949",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                }}
                >
                Referral Program
                </h1>
                <hr style={{ width: "3%", borderColor: "#333", margin: "30px auto" }} />
                <h2 className="text-2xl text-custom-gray font-light p-2"> Earn Rewards for Sharing Sunniva Solar</h2>
                <p className="text-xl p-4 font-light text-custom-gray">At Sunniva Solar, we believe in the power of word-of-mouth and the value of customer referrals. Our referral program is designed to reward you for sharing your positive experience with our solar and shade kits. Help us spread the word and earn exciting rewards!</p>
            </div>
            <div>
                <div className="flex flex-col space-y-4 text-custom-gray">
                    <div className="bg-custom-light-gray p-4">
                        <h1 className="text-lg font-bold uppercase">How It Works</h1>
                            <ol className="list-decimal ml-6 text-lg">
                                <li>
                                    Refer a Friend: 
                                    <span className="font-light pl-2"> 
                                        Share your experience with friends, family, and colleagues who might be interested in our solar and shade kits.
                                    </span>
                                </li>
                                <li>
                                    Get Your Referral Code:
                                    <span className="font-light pl-2"> 
                                        Contact us to receive your unique referral code.
                                    </span>
                                </li>
                                <li>
                                    Successful Referral:
                                    <span className="font-light pl-2"> 
                                    When your referral makes a purchase using your code, you will earn a $200 Visa gift card.
                                    </span>
                                </li>
                            </ol>
                    </div>
                    <div className="p-4">
                        <h1 className="text-lg font-bold uppercase">Program Details</h1>
                        <ul className="list-disc ml-6 text-lg">
                                <li>
                                    Eligibility: 
                                    <span className="font-light pl-2"> 
                                        All current Sunniva Solar customers are eligible to participate in our referral program.
                                    </span>
                                </li>
                                <li>
                                    Reward:
                                    <span className="font-light pl-2"> 
                                        Earn a $200 Visa gift card for each successful referral who makes a purchase.
                                    </span>
                                </li>
                                <li>
                                    Tracking:
                                    <span className="font-light pl-2"> 
                                        Referrals are tracked through unique referral codes provided to each participant.
                                    </span>
                                </li>
                            </ul>
                    </div>
                    <div className="bg-custom-light-gray p-4">
                    <h1 className="text-lg font-bold uppercase">Join the Program</h1>
                    <ol className="list-decimal ml-6 text-lg">
                                <li>
                                Sign Up: 
                                    <span className="font-light pl-2"> 
                                    Request your unique referral code by emailing us at office@sunnivasol.com.
                                    </span>
                                </li>
                                <li>
                                Share the Code:
                                    <span className="font-light pl-2"> 
                                    Spread the word about Sunniva Solar and your referral code.
                                    </span>
                                </li>
                                <li>
                                Earn Rewards:
                                    <span className="font-light pl-2"> 
                                    Receive a $200 Visa gift card once your referral completes their purchase using your code.
                                    </span>
                                </li>
                            </ol>
                    </div>
                    <div className="p-4">
                        <h1 className="text-lg font-bold uppercase">Contact Us:</h1>
                        <ul className="list-disc ml-6 text-lg">
                            <li>
                            Email: 
                                <span className="font-light pl-2"> 
                                office@sunnivasol.com
                                </span>
                            </li>
                            <li>
                            Phone:
                                <span className="font-light pl-2"> 
                                (970)759-5502
                                </span>
                            </li>                          
                        </ul>
                        <p className="text-lg font-light text-center pt-6">Thank you for being a valued Sunniva Solar customer and for helping us grow through your referrals. Your support and recommendations are greatly appreciated!</p>
                        <p className="text-lg font-light text-center">
                        For more details about our products and services, visit our <a href="/" className="hover:underline">homepage</a>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}