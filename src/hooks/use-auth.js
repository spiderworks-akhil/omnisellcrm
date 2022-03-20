import { useContext } from 'react';
import { AuthContext} from "../contexts/Auth/Auth";

export const useAuth = () => useContext(AuthContext);
