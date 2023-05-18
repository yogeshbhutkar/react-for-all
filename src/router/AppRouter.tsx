import { Redirect, useRoutes } from "raviger";
import About from "../components/About";
import AppContainer from "../AppContainer";
// import Form from "../components/Form";
import Home from "../components/Home";
import Preview from "../components/Preview";
import Login from "../components/Login";
import { User } from "../types/userTypes";
import Form from "../components/Form";

export default function AppRouter(props: { currentUser: User }) {
  console.log(props.currentUser);
  const routes = {
    "/": () =>
      props.currentUser.username !== "" ? <Home /> : <Redirect to="/login" />,
    "/login": () => <Login />,
    "/about": () =>
      props.currentUser.username !== "" ? <About /> : <Redirect to="/login" />,
    "/forms/:id": ({ id }: { id: string }) =>
      props.currentUser.username !== "" ? (
        <Form formId={Number(id)} />
      ) : (
        <Redirect to="/login" />
      ),
    "/preview/:id": ({ id }: { id: string }) =>
      props.currentUser.username !== "" ? (
        <Preview previewId={Number(id)} />
      ) : (
        <Redirect to="/login" />
      ),
  };
  let routeResult = useRoutes(routes);
  return (
    <AppContainer currentUser={props.currentUser}>{routeResult}</AppContainer>
  );
}
