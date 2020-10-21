import { create } from "../config/webUrl";
import NewForm from "../pages/NewForm/NewForm";

const AboutUsRoute = [
  {
    path: create,
    exact: true,
    isProtected: true,
    component: NewForm,
  },
];

export default AboutUsRoute;
