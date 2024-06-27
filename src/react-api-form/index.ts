import ReactApiForm from "./ReactApiForm";
import { DynamicControl } from "./components/DynamicControl";
import { postSubmission, fetchFields } from "./utils/fetcher";

import {
  FormProps,
  LabelPlacementEnum,
  VariantEnum,
  RadiusEnum,
  ColorEnum,
} from "./types/Types";

export type {
  FormProps,
  LabelPlacementEnum,
  VariantEnum,
  RadiusEnum,
  ColorEnum,
};
export { ReactApiForm, DynamicControl, postSubmission, fetchFields };
