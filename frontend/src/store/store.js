import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice.js'
import jobReducer from './jobSlice.js'
import companyReducer from './companySlice.js'
import applicantReducer from './applicantSlice.js'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const rootReducer = combineReducers({
    user: userReducer,
    job: jobReducer,
    company: companyReducer,
    applicant: applicantReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)


const store = configureStore({

    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),



    // reducer: {
    //     user: userReducer,
    //     job: jobReducer
    // }
})

export default store