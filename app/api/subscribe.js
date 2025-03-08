export default async function handler(req, res) {
    if (req.method === "POST") {
        const { email } = req.body;

        if (!email || !email.includes("@")) {
            return res.status(400).json({ message: "Invalid email address" });
        }

        // Store email in database (example: MongoDB)
        try {
            // Example: Save email to database
            console.log(`Saving email: ${email}`);
            res.status(201).json({ message: "Subscription successful!" });
        } catch (error) {
            res.status(500).json({ message: "Error saving email" });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
