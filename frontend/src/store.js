import { combineReducers, configureStore } from '@reduxjs/toolkit';
import accountReducer from "./features/accountSlice"
import hotBlogsReducer from "./features/hotBlogsSlice";
import myBlogsReducer from './features/myBlogsSlice';
import { apiSlice } from './services/apiSlice';
import { persistStore, persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
    account: accountReducer,
    my_blogs: myBlogsReducer,
    hot_blogs: hotBlogsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
});

const persistConfig = {
    key: 'root',
    storage,
    blacklist: [apiSlice.reducerPath]
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            }
        }).concat(apiSlice.middleware)
});
const persistor = persistStore(store);

export { store, persistor }