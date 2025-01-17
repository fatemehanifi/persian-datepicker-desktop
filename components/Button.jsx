const PrimaryButton = ({
   title,
   disabled,
   btnAction,
}) => {
    return (
        <button
            onClick={() => btnAction()}
            disabled={disabled}
            className={`flex w-full items-center justify-center gap-2 rounded-10 p-4 text-base font-normal text-primary-50 transition duration-300 xs:font-medium ${
                disabled
                    ? "hover:bg-neutral-100 pointer-events-none cursor-none bg-neutral-300"
                    : "bg-primary-500 hover:bg-primary-600"
            }`}
        >
            {title}
        </button>
    );
};

export default PrimaryButton;
