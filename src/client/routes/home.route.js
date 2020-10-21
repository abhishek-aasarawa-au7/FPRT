import { home } from "../config/webUrl";
import Home from "../pages/Home/Home";

const AboutUsRoute = [
  {
    path: home,
    exact: true,
    isProtected: false,
    component: Home,
  },
];

export default AboutUsRoute;
