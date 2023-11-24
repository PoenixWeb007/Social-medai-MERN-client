import * as yup from "yup";

export const AddCommentSchema = yup.object({
  comment: yup.string("format not valid").required("comment is required"),
});
