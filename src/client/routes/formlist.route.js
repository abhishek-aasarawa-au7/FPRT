import { all } from "../config/webUrl";
import FormList from "../pages/FormList/FormList";

const FormListRoute = [
  {
    path: all,
    exact: true,
    isProtected: true,
    component: FormList,
  },
];

export default FormListRoute;
