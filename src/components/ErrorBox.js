import React from "react";

const ErrorBox = ({ errors }) => (
	<div className="alert alert-danger" role="alert">
		{errors}
	</div>
);

export default ErrorBox;
