import { combineReducers, configureStore } from '@reduxjs/toolkit';
import accountReducer from "./features/accountSlice"
import blogsReducer from './features/blogsSlice';
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
    blogs: blogsReducer,
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