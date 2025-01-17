import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const Modal = ({ onClose, children, title }) => {
    const contentRef = useRef(null);

    useEffect(() => {
        let handler = (event) => {
            if (!contentRef.current?.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        };
    });
    const modalContent = (
        <div
            className="absolute left-0 top-0 z-[999] flex h-full w-full items-center justify-center"
            style={{ background: "rgba(0, 0, 0, 0.5)" }}
        >
            <div className="w-[284px]" ref={contentRef}>
                <div className="h-full w-full rounded-xl bg-white">
                    {title && <h1>{title}</h1>}
                    <div className="flex flex-col gap-2">{children}</div>
                </div>
            </div>
        </div>
    );

    return ReactDOM.createPortal(
        modalContent,
        document.getElementById("modal-root"),
    );
};
export default Modal;
