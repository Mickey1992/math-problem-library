import React from "react";
import classes from "./AddProblem.module.css";

export default function ImageUploader({ handleImageUpload, uploadedImages }) {
	function onImageUpload(event: React.ChangeEventHandler<HTMLInputElement>) {
		const file = event.target.files[0];
		const reader = new FileReader();

		reader.onloadend = () => {
			const base64data = reader.result;
			handleImageUpload(base64data);
		};
		reader.readAsDataURL(file);
	}

	return (
		<div className={classes["image-uploader"]}>
			<div>
				{uploadedImages &&
					uploadedImages.length > 0 &&
					uploadedImages.map((image) => (
						<div className={classes["image-preview"]} key={image}>
							<img src={image} alt="Preview" />
						</div>
					))}

				<div className={classes["image-preview"]}>
					<label htmlFor="image-input">+</label>
					<input
						id="image-input"
						type="file"
						accept="image/*"
						onChange={onImageUpload}
						hidden
					/>
				</div>
			</div>
		</div>
	);
}
