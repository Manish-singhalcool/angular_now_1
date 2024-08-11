import { FormControlName,FormGroup } from "@angular/forms";

export function ConfirmedValidator(controlName:string,matchingControlName:string) {
     
        return (formGroup:FormGroup)=>{
                const control=formGroup.controls[controlName];
                const matchFormController=formGroup.controls[matchingControlName];
    
                if(matchFormController.errors && !matchFormController.errors['confirmedValidator']){
                    return
                }
                if(control.value!== matchFormController.value){
                    matchFormController.setErrors({confirmedValidator:true});
                }
                else{
                    matchFormController.setErrors(null);
                }
        }
}  