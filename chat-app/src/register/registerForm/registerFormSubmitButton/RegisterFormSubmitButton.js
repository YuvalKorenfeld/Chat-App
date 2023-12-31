import React from "react";

function RegisterFormSubmitButton({ formData, registered, setRegisteredUsers}) {
    const enableButton = (formData) =>Object.values(formData["allowedSubmit"]).some((value) => value === false);
    const isButtonDisabled = enableButton(formData);

    return (
        <button
            type="submit"
            id="register-button"
            className="btn btn-secondary text-white"
            disabled={isButtonDisabled}
        >
            Submit
        </button>
    );
}

export default RegisterFormSubmitButton;
