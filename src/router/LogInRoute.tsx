import { useRoutes } from "raviger";
import AppContainer from "../AppContainer";
import { User } from "../types/userTypes";
import Login from "../components/Login";

export default function LoginRoute(props: { currentUser: User }) {
  console.log(props.currentUser);
  const routes = {
    "/login": () => <Login />,
  };
  let routeResult = useRoutes(routes) || <Login />;
  return (
    <AppContainer currentUser={props.currentUser}>{routeResult}</AppContainer>
  );
}
