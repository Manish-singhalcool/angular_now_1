import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import { EmployeeService } from '../service/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

//import { ConfirmedValidator } from '../confirmed.validator';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent implements OnInit {
    empForm:FormGroup;

    education: string[] = [
    'Metric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',

    ];
    constructor(private _fb:FormBuilder, 
       private _empService:EmployeeService,  
       private _dialogRef:MatDialogRef<EmpAddEditComponent>,
       @Inject(MAT_DIALOG_DATA) public data: any  ,
       private _coreService:CoreService
       )
    {
      this.empForm=this._fb.group({
        firstName: new FormControl("",[Validators.required,Validators.pattern("[a-zA-z]*")]),
        lastName: new FormControl('',[Validators.required,Validators.minLength(4)]),
        email:new FormControl('',[Validators.required]),
        dob:'',
        gender: new FormControl('',[Validators.required]),
        education:new FormControl('',[Validators.required]),
        company:'',
        experience:'',
        package:'',
        //password: new FormControl('',[Validators.required]),
        //confirm_password: new FormControl('',[Validators.required]),
      },
      {
       // validator: ConfirmedValidator('password','confirm_password')
      }
      
      );
    }
    get firstName (){
        return this.empForm.get('firstName');
    }
    get lastName (){
      return this.empForm.get('lastName');
    }
    // get f(){
    //   return this.empForm.controls;
    // }
    
    ngOnInit(): void {
      this.empForm.patchValue(this.data);
    }
   onFormSubmit(){
    if(this.empForm.valid){
      if(this.data){
        this._empService.updateEmployee(this.data.id,this.empForm.value).subscribe({
          next:(val :any)=> {
           //alert("Employee Detail Updated!");
           this._coreService.openSnackBar("Employee Detail Updated!",'done');
           this._dialogRef.close(true);
          },
          error: (err :any ) => {
           console.error(err);
          }
          
        })
      }else{
        this._empService.addEmployee(this.empForm.value).subscribe({
         next:(val :any)=> {
          //alert("Employee add successfully");
          this._coreService.openSnackBar("Employee add successfully",'done');
          this._dialogRef.close(true);
         },
         error: (err :any ) => {
          console.error(err);
         }
         
        })
      }
     // console.log(this.empForm.value);
    }
   }
}
