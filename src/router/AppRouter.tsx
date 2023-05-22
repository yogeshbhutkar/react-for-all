import { Redirect, useRoutes } from "raviger";
import About from "../components/About";
import AppContainer from "../AppContainer";
// import Form from "../components/Form";
import Home from "../components/Home";
import Preview from "../components/Preview";
// import Login from "../components/Login";
import { User } from "../types/userTypes";
import Form from "../components/Form";

export default function AppRouter(props: { currentUser: User }) {
  console.log(props.currentUser);
  const routes = {
    "/": () => <Home />,
    "/login": () => <Redirect to="/" />,
    "/about": () => <About />,
    "/forms/:id": ({ id }: { id: string }) => <Form formId={Number(id)} />,
    "/preview/:id": ({ id }: { id: string }) => (
      <Preview previewId={Number(id)} />
    ),
  };
  let routeResult = useRoutes(routes);
  return (
    <AppContainer currentUser={props.currentUser}>{routeResult}</AppContainer>
  );
}
