import { useContext } from 'react';
import {AppSettingsContext} from "../contexts/AppSettings/settings";

export const useAppSettings = () => useContext(AppSettingsContext);
