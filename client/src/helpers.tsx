//Shared functions
const helpers = {
    isEmpty:(obj:object) => {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }
}



export default helpers;