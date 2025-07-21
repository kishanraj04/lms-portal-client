export const logoutUserHelper = async(logoutApi)=>{
    try {
        const resp = await logoutApi()
        console.log(resp);
    } catch (error) {
        
    }
}