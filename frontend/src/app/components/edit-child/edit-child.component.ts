import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChildApiService } from '../../services/child-api.service';

@Component({
  selector: 'app-edit-child',
  templateUrl: './edit-child.component.html',
  styleUrl: './edit-child.component.css'
})
export class EditChildComponent implements OnInit{

  childDetails: any={
    Id: '',
    Name:'',
    Surname:'',
    Allergy:'',
    EmergContact:'',
    PickUp:'',
    Destination:'',
  }
  publicId:any;
  constructor(private route: ActivatedRoute, private router:Router, private childApiService:ChildApiService){}
  ngOnInit(): void {
    
    this.route.paramMap.subscribe({
      next: (params)=>{
        const id = params.get('id')
        this.publicId=id
        if (id) {
          this.childApiService.getChildById(id)
          .subscribe({
            next:(response:any)=>{
              this.childDetails=response.post
              
            }
          })
        }
      }
    })
  }

  updateChild(){
    this.childApiService.updateChild(this.publicId,this.childDetails)
    .subscribe(
      {
        next:(response)=>{
          this.childDetails=response;
          this.router.navigate(['/home']);
        },
        error:()=>{

        }
      }
    )
  }


}
