"use client";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./RequestQuote.module.css";

const RequestQuote = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const endpoint =
        apiUrl === "http://localhost:3000"
          ? "/api/send-email"
          : "https://us-central1-sunniva-ee7a7.cloudfunctions.net/sendEmail";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      toast.success("Message sent successfully");
      reset(); // Clear the form fields
    } catch (error) {
      toast.error("Error sending message");
      console.error("Error sending email:", error);
    }
  };

  return (
    <div className={styles.signUpSection}>
      <ToastContainer /> {/* Add the ToastContainer here */}
      {isSubmitSuccessful ? (
        <p className="m-auto">
          Thank you for contacting us! We will be in touch with you as soon as
          possible.
        </p>
      ) : (
        <div className={styles.formSection}>
          <div className={styles.title}>
            <hr
              style={{ width: "10%", borderColor: "#333", marginLeft: "20px" }}
            />
            <h1>REQUEST A QUOTE</h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.formStyle}>
            <div className={styles.formGroupStyle}>
              <label htmlFor="company"></label>
              <input
                type="text"
                id="company"
                name="company"
                placeholder="COMPANY"
                {...register("company")}
                className={styles.inputStyle}
              />
              {errors.company && (
                <p className="text-red-500">{errors.company.message}</p>
              )}
            </div>
            <div className={styles.formGroupStyle}>
              <label htmlFor="name"></label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="NAME"
                {...register("name", { required: "Name is required" })}
                className={styles.inputStyle}
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className={styles.formGroupStyle}>
              <label htmlFor="email"></label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="EMAIL"
                {...register("email", { required: "Email is required" })}
                className={styles.inputStyle}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className={styles.formGroupStyle}>
              <label htmlFor="phone"></label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="PHONE"
                {...register("phone", { required: "Phone number is required" })}
                className={styles.inputStyle}
              />
              {errors.phone && (
                <p className="text-red-500">{errors.phone.message}</p>
              )}
            </div>
            <div className={styles.formGroupStyle}>
              <label htmlFor="address"></label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="ADDRESS"
                {...register("address", { required: "Address is required" })}
                className={styles.inputStyle}
              />
              {errors.address && (
                <p className="text-red-500">{errors.address.message}</p>
              )}
            </div>
            <div className={styles.formGroupStyle}>
              <label htmlFor="system"></label>
              <select
                id="system"
                name="system"
                defaultValue=""
                {...register("system", { required: "System is required" })}
                className={styles.inputStyle}
              >
                <option value="" disabled>
                  SYSTEM
                </option>
                <option value="Solar + Shade">Solar + Shade</option>
                <option value="Just Solar">Just Solar</option>
                <option value="Just Shade">Just Shade</option>
                <option value="EV Charger or Smart Panel">
                  EV Charger or Smart Panel
                </option>
                <option value="DIY Kit">DIY Kit</option>
                <option value="Other">Other</option>
              </select>
              {errors.system && (
                <p className="text-red-500">{errors.system.message}</p>
              )}
            </div>
            <div className={styles.formGroupStyle}>
              <label htmlFor="message"></label>
              <textarea
                id="message"
                name="message"
                placeholder="Leave us a message..."
                {...register("message", { required: "Message is required" })}
                className={styles.inputStyle}
              />
              {errors.message && (
                <p className="text-red-500">{errors.message.message}</p>
              )}
            </div>
            <button type="submit" className={styles.button}>
              SUBMIT
            </button>
          </form>
        </div>
      )}
      <div className={styles.contactSection}>
        <div>
          Unlock the potential of your solar and pergola dreams with a free
          quote today – reach out to us now to embark on your journey towards a
          sustainable and stunning outdoor transformation.
        </div>
        <div className={styles.contactContent}>
          <h2>CONTACT US</h2>
          <hr style={{ width: "5%", borderColor: "#333", margin: "16px 0" }} />
          <p>office@sunnivasol.com</p>
          <p>970-759-5502</p>
          <p>
            1361 S 3750 E <br />
            Spanish Fork UT 84660
          </p>
        </div>
      </div>
    </div>
  );
};

export default RequestQuote;
