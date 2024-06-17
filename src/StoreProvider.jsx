import {PersistGate} from "redux-persist/integration/react";
import {connect, Provider} from "react-redux";
import {store, persistor} from "./redux/store";


const StoreProvider = ({children}) => {
    return <>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    </>
}

export default StoreProvider;