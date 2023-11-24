import { LoadingButton } from "@mui/lab";
import React from "react";

function SubmitButton({ formik, loadingIndicator = "loading...", children }) {
  return (
    <LoadingButton
      type="submit"
      c
      size="large"
      onClick={formik.handleSubmit}
      loading={formik.isSubmitting}
      loadingIndicator={loadingIndicator}
      variant="contained"
      sx={{ width: "50%", fontSize: "16px" }}
    >
      <span>{children}</span>
    </LoadingButton>
  );
}

export default SubmitButton;
