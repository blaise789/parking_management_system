import api from "@/api"
import { login } from "@/redux/features/UserSlice"
 
import toast from "react-hot-toast"
export const signin=async({dispatch,setLoading,email,password}:{
    dispatch: any,
    email: string,
    password: string
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
})=>{
try{

    setLoading(true)
    const url="/auth/login"
    console.log(email,password)
    const response=await api.post(url,{email,password})
    console.log(response)
    dispatch(login({...response.data.data}))
    toast.success("login successful")
    localStorage.setItem("token",response.data.data.token)
    setTimeout(() => {
        window.location.replace("/")
    }, 100);
    
}   
catch(error:any){
  console.error(error.response?.data?.message || error.message);
  error?.response?.data 
    ? toast.error(error.response.data.message) 
    : toast.error("Error logging in");

} 
finally{
    setLoading(false)
}
}

export const registerUser = async ({
    dispatch,
    setLoading,
    userData,
  }: {
    dispatch: any,
    userData: {
      email: string,
      password: string,
      firstName:string,
      lastName:string,
      telephone:string,
    },
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  }) => {
    try {
      setLoading(true);
      const url = "/user/create"; // adjust this endpoint as needed
      const response = await api.post(url, userData);
      
      dispatch(login({...response.data})); // assuming you want to log user in after registration
      localStorage.setItem("token", response.data.data.token);
      
      toast.success("Registration successful!");
      
      
        setTimeout(() => {
          window.location.replace("/login");
        }, 1000);
      
    } catch (error: any) {
      console.error(error.response?.data?.message || error.message);
      error?.response?.data 
        ? toast.error(error.response.data.message) 
        : toast.error("Error during registration");
    } finally {
      setLoading(false);
    }
  }