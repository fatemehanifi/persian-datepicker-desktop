const PrimaryButton = ({
   title,
   disabled,
   btnAction,
}) => {
    return (
        <button
            onClick={() => btnAction()}
            disabled={disabled}
            className={`flex w-full items-center justify-center gap-2 rounded-lg p-4 text-sm font-normal text-[#e9f0fc] transition duration-300 ${
                disabled
                    ? "hover:bg-neutral-100 pointer-events-none cursor-none bg-neutral-300"
                    : "bg-[#1f6be0] hover:bg-[#1c61cc]"
            }`}
        >
            {title}
        </button>
    );
};

export default PrimaryButton;
