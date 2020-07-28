//form fields
const firstName=document.getElementById('firstName');
const lastName=document.getElementById('lastName');
const password=document.getElementById('password');
const confirmPassword=document.getElementById('confirmPassword');
const email=document.getElementById('email');

// form
const form=document.getElementById('formval');

//valid colors:
const success = "#27ae60";
const error = "#c0392b";




//validators
const valFirstName=()=>{
    //check empty name
    if(checkEmpty(firstName)) return;
    //check alphanumeric
    if(!checkLetters(firstName)) return;
    return true;

}

const valLastName=()=>{
    //check empty name
    if(checkEmpty(lastName)) return;
    //check alphanumeric
    if(!checkLetters(lastName)) return;
    return true;

}

const valPassword=()=>{
    //check blank
    if(checkEmpty(password)) return;
    //length check
    if(!reqLength(password,8,30)) return;
    //character check
    //password=uppercase,lowercase,number,special character
    if(!reqCharacters(password,4)) return;
    return true;

}

const valConfirmPassword=()=>{
    if(password.className !== 'valid'){
        setInvalid(confirmPassword,'Password must be valid');
        return;
    }
    //if match then
    if(password.value !== confirmPassword.value){
        setInvalid(confirmPassword,'Password must match');
        return;
    }else{
        setValid(confirmPassword);
    }
    return true;
}

//email
const valEmail=()=>{
    if(checkEmpty(email)) return;
    if(!reqCharacters(email,5)) return;
    return true;
}


//utility methods
const checkEmpty=(data)=>{
    if(isEmpty(data.value.trim())){
        //invalid
        setInvalid(data,`${data.name} must not be empty`);
        return true;
    }else{
        //valid
        setValid(data);
        return false;
    }
}

const isEmpty=(value)=>{
    if(value === '') return true;
    return false;
}

const setInvalid=(data,message)=>{
    data.className='invalid';
    data.nextElementSibling.innerHTML=message;
    data.nextElementSibling.style.color=error;
}

const setValid=(data)=>{
    data.className='valid';
    data.nextElementSibling.innerHTML='';
    data.nextElementSibling.style.color=success;
}

const checkLetters=(data)=>{
    if(/^[a-zA-Z ]+$/.test(data.value)){
        setValid(data);
        return true;
    }else{
        setInvalid(data,`${data.name} must contain only letters`);
        return false;
    }
}


//password func
const reqLength=(data,minimum,maximum)=>{
    if(data.value.length >= minimum && data.value.length <maximum){
        setValid(data);
        return true;
    }else if(data.value.length < minimum){
        setInvalid(data,`${data.name} must be ${minimum} characters long`);
        return false;
    }else{
        setInvalid(data,`${data.name} must be shorter than ${maximum} characters`);
        return false;
    }

}

const reqCharacters=(data,pwd)=>{
    let rExp;
    switch(pwd){
        case 1:
            //letters validations
            rExp = /(?=.*[a-zA-Z])/;
            return matchRexp(rExp,data,'Must contain atleast one letter');
        case 2:
            //number and letter validations:
            rExp = /(?=.*\d)(?=.*[a-zA-Z])/;
            return matchRexp(rExp,data,'Must contain atleast one letter and one number');

        case 3:
            //upper,lower,number:
            rExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
            return matchRexp(rExp,data,'Must contain atleast one uppercase,one lowercase and one number');

         case 4:
            //upper,lower,number and special:
            rExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
            return matchRexp(rExp,data,'Must contain atleast one uppercase,one lowercase , one number and one special character');
        
        case 5:
            //email
            rExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return matchRexp(rExp,data,'Must be valid email address')    
            default:
            return false;
    }
}

const matchRexp=(rExp,data,message)=>{
    if(data.value.match(rExp)){
        setValid(data);
        return true;
    }else{
        setInvalid(data,message);
        return false;
    }
}


