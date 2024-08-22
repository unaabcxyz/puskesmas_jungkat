// import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css"; 
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "@/lib";
import { Provider } from "react-redux";
import { useStore } from "@/redux/store";
// import Provider
function MyApp({Component,pageProps}){
  const apolloClient = useApollo(pageProps.initialApolloState);
  const store =  useStore(pageProps.initialReduxState)
  // const store =  useStore(pageProps.initialReduxState)
  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </Provider>

  );
}
export default MyApp;

