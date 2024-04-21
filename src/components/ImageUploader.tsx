import React, { useState } from "react";
import classes from "./AddProblem.module.css";

export default function ImageUploader() {
	const [image, setImage] = useState<string | ArrayBuffer | null>(null);

	function handleImageUpload(
		event: React.ChangeEventHandler<HTMLInputElement>
	) {
		const file = event.target.files[0];
		const reader = new FileReader();

		reader.onloadend = () => {
			const base64data = reader.result;
			setImage(base64data);
			//localStorage.setItem("image", base64data);
		};

		reader.readAsDataURL(file);
	}

	return (
		<div className={classes["image-uploader"]}>
			<p>上传图片</p>
			<div>
				{image && (
					<div className={classes["image-preview"]}>
						<img src={image} alt="Preview" />
					</div>
				)}
				<div className={classes["image-preview"]}>
					<label htmlFor="image-input">+</label>
					<input
						id="image-input"
						type="file"
						accept="image/*"
						onChange={handleImageUpload}
						hidden
					/>
				</div>
			</div>
		</div>
	);
}
