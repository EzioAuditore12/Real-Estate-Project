import { SubmitButton } from "@/components/form/submit-button";
import { TextField } from "@/components/form/text-field";
import { fieldContext, formContext } from "./form-context";
import { createFormHook } from "@tanstack/react-form";

export const { useAppForm } = createFormHook({
	fieldComponents: {
		TextField,
	},
	formComponents: {
		SubmitButton,
	},
	fieldContext,
	formContext,
});