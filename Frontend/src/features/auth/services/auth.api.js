import axios from "axios";

const api = axios.create({
    baseURL : "http://localhost:3000/api/auth", 
    withCredentials : true 

})
const register = async (userame , email , password)=>{
    try{
       const respose = api.post("/register" , {
            username , email , password
        } );
    
        console.log(respose.data);

    }catch {
        console.log(err)
    }
}

const login = async ( email , password)=>{
    try{

        const respose = api.post("/login" , {
           email , password
        } );
    
        console.log(respose.data);

    }catch {
        console.log(err)
    }
}

const logout = async ()=>{
        try{

        const respose = api.post("/logout" , {
        
        } );
    
        console.log(respose.data);

    }catch {
        console.log(err)
    }

}

const getMe = async ()=>{
    try{

        const respose = api.get("/get-me" , { });
        console.log(respose.data);
    }catch {
        console.log(err)
    }

}

export {register , login , logout , getMe} ; 