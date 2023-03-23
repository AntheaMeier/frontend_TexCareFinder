
import { Location } from '@angular/common';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from '../shared/backend.service';
import { Textile } from '../shared/textile';
import { HttpClient } from '@angular/common/http';


const ERROR_MESSAGE = 'Please fill out the field "Category".';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  newForm = new FormGroup({
    categoryControl : new FormControl<string>('', Validators.required),
    featureControl: new FormControl<string>(''),
    wash_tempControl: new FormControl<string>(''),
    iron_levelControl: new FormControl<string>(''),
    othersControl: new FormControl<string>('')
  });
  
  ERROR_MESSAGE = ERROR_MESSAGE;

  // ADD showCategoryWarning PROPERTY
  showCategoryWarning: boolean = false;
  

  constructor(
    private bs: BackendService,
    private location: Location,
    private router: Router,
    private ngZone: NgZone,
    private http: HttpClient,
  ) { }

  ngOnInit(): void { }

  // ADD onBlurCategory METHOD
  onBlurCategory(): void {
    this.showCategoryWarning = this.newForm.get('categoryControl')?.invalid ?? false; // "?? false" was needed to get rid of the ts warning that undefined is not applicable to boolean
  }

  create(): void {
    const values = this.newForm.value;
    // ADD CHECK FOR INVALID categoryControl
    if (this.newForm.get('categoryControl')?.invalid) {
    this.showCategoryWarning = true;
    return;
    }
    const newTextile: Textile = {
      _id: '',
      category: values.categoryControl! as string,
      feature: values.featureControl! as string,
      wash_temp: values.wash_tempControl! as string,
      iron_level: values.iron_levelControl! as string,
      others: values.othersControl! as string
    };
    try {
      this.bs.create(newTextile).subscribe({
        next: (response) => {
          console.log(response);
          console.log(response._id);
          this.ngZone.run(() => this.router.navigateByUrl('/table'));
        },
        error: (err) => {
          console.log(err);
          // Display the error message to the user
          alert(err.error.message || err.message);
        },
        complete: () =>
          console.log('Neuer Eintrag wurde in der Datenbank gespeichert')
      });
    } catch (error) {
      console.log(error);
      if (values.categoryControl === '') {
        alert(ERROR_MESSAGE);
      }
    }
  }  

  cancel(): void {
    this.location.back();
  }
}


