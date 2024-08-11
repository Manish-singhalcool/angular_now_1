import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './service/employee.service';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CoreService } from './core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
 
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'dob', 'gender', 'education', 'company', 'experience', 'package','action'];
  
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private _dialog: MatDialog,
    private _empServiceList:EmployeeService,
    private _coreService:CoreService
    ){}

  ngOnInit(): void {
    this.getEmployeeList();
  }
    OpenAddEditEmpForm() {
     const dialogRef= this._dialog.open(EmpAddEditComponent);
     dialogRef.afterClosed().subscribe({
        next: (val) => {
          if(val){
            this.getEmployeeList();
          }
        }
     });
    }
    getEmployeeList(){
      this._empServiceList.getEmployeeList().subscribe({
        next: (res)=>{
            this.dataSource=new MatTableDataSource(res);
            this.dataSource.sort=this.sort;
            this.dataSource.paginator=this.paginator;
            console.log(res);
        },
        error:(err: any)=>{
          console.error(err);
        }
      })
    }
    
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
    deleteEmployee(id: any){
      var checkClick= confirm("Please Sure Employee delete");
      if(checkClick==true){
            this._empServiceList.deleteEmployee(id).subscribe({
              next:(res)=>{
                //alert("employee deleted");
                  this._coreService.openSnackBar("Employee deleted!",'Done');
                  this.getEmployeeList();
              //  console.log(res);
              },
              error:(err :any)=>{
                console.log(err);
                this._coreService.openSnackBar("Somthing wrong!");
              }
            });
      }else{
        this._coreService.openSnackBar("Your cancal",'Done');
      }
    }
    OpenEditEmpForm(data: any) {
      let dialogRef=this._dialog.open(EmpAddEditComponent,{
        data,
      });
      dialogRef.afterClosed().subscribe({
        next: (val) => {
          if(val){
            this.getEmployeeList();
          }
        }
     });
     }
  
}
