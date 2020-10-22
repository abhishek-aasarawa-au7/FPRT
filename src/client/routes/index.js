import HomeRoute from "./home.route";
import NewForm from "./newform.route";
import FormListRoute from "./formlist.route";
import ShowFormRoute from "./showfrom.route";
import ShowResponseRoute from "./showresponse.route";

export default [
  ...HomeRoute,
  ...NewForm,
  ...FormListRoute,
  ...ShowFormRoute,
  ...ShowResponseRoute,
];
