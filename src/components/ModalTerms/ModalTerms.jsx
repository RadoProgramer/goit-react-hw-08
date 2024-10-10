import React from "react";
import css from "./ModalTerms.module.css";

export const ModalTerms = ({ onClose, customMessage }) => {
	return (
		<div className={css.backdrop}>
			<div className={css.modal}>
				<h3>{customMessage ? customMessage : "Terms of Service"}</h3> {}
				<p>
					{customMessage
						? ""
						: "Here you can include the full text of your terms of service."}
				</p>
				<div className={css.actions}>
					<button className={css.buttonCancel} onClick={onClose}>
						Close
					</button>
				</div>
			</div>
		</div>
	);
};
