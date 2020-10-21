import { create } from "../config/webUrl";
import NewForm from "../pages/NewForm/NewForm";

const AboutUsRoute = [
  {
    path: create,
    exact: true,
    isProtected: false,
    component: NewForm,
  },
];

export default AboutUsRoute;
