"use client";

export default function Button({
  children,
  type = "primary",
  disabled = false,
  onClick,
}) {
  const baseStyles = "px-4 py-2 font-thin tracking-2px mb-4 mt-2";

  const types = {
    primary:
      "bg-custom-blue text-white hover:bg-white hover:text-custom-blue border border-custom-blue",
    bigPrimary:
      "bg-custom-blue text-white hover:bg-white hover:text-custom-blue border border-custom-blue text-xl",
    secondary:
      "border border-custom-blue text-custom-blue bg-white hover:bg-custom-blue hover:text-white",
    kitButton:
      "flex-1 border border-custom-blue bg-whitetext-custom-blue text-2xl py-10 hover:bg-custom-blue hover:text-white",
  };

  const disabledStyles = "opacity-50 cursor-not-allowed";

  return (
    <button
      className={`${baseStyles} ${types[type]} ${
        disabled ? disabledStyles : ""
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
