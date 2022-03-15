
const validation = (value) => {
    console.log("hy ia m hear")

    let errors={};

    if(!value.fullname){
        errors.fullname="fullname is required !"
    }

    if(!value.email){
        errors.email="email is required !"
    }else if(!/\S+@\S+\.\S+/.test(value.email)) {
        errors.email="Email is invalid"
    }

    if(!value.mobile){
        errors.mobile="fullname is required !"
        
    }
    if(!value.date){
        errors.date="date is required !"
        
    }
    if(!value.radio){
        errors.radio="radio is required !"
        
    }
    

    
    return errors;
};

export default validation;
