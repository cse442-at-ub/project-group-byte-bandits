import useEffect from "react";
import axios from "axios";

export const useSession = () => {


    useEffect(() => {

        async function fetchCookies() {
            try {
                const response = await axios.get("https://cse.buffalo.edu/~jderosa3/auth/login_form");
                console.log("Response:", response);
            }
            catch (error){
                console.log("Error:", error)

            }
        }

        
        fetchCookies();
    }, []);
}


