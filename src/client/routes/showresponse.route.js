import { response } from "../config/webUrl";
import ShowResponse from "../pages/ShowResponse/ShowResponse";

const ShowResponseRoute = [
  {
    path: response,
    exact: true,
    isProtected: true,
    component: ShowResponse,
  },
];

export default ShowResponseRoute;
