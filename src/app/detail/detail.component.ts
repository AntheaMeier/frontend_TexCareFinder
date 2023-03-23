import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../shared/backend.service';
import { Textile } from '../shared/textile';

const ERROR_MESSAGE = 'Please fill out the field "Category".';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent  implements OnInit {
  id: string = '';
  textile!: Textile ;
  form = new FormGroup({
        categoryControl : new FormControl<string>(''),
        featureControl: new FormControl<string>(''),
        wash_tempControl: new FormControl<string>(''),
        iron_levelControl: new FormControl<string>(''),
        othersControl: new FormControl<string>(''),
  });

  ERROR_MESSAGE = ERROR_MESSAGE;

  // ADD showCategoryWarning PROPERTY
  showCategoryWarning: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private bs: BackendService,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.readOne(this.id);
  }
  
  readOne(id: string): void {
    this.bs.getOne(id).subscribe({
      next: (response) => {
        this.textile = response;
        console.log('textile', this.textile);
        this.form.patchValue({
          categoryControl: this.textile.category,
          featureControl: this.textile.feature,
          wash_tempControl: this.textile.wash_temp,
          iron_levelControl: this.textile.iron_level,
          othersControl: this.textile.others,
        });
        return this.textile;
      },
      error: (err) => console.log(err),
      complete: () => console.log('getOne() completed'),
    });
  }
  
  // ADD onBlurCategory METHOD
  onBlurCategory(): void {
    this.showCategoryWarning = this.form.get('categoryControl')?.invalid ?? false;
  }

  update(): void {
    // Check for invalid categoryControl
    if (this.form.get('categoryControl')?.invalid) {
      this.showCategoryWarning = true;
      return;
    }
    const values = this.form.value;
    this.textile.category = values.categoryControl!;
    this.textile.feature = values.featureControl!;
    this.textile.wash_temp = values.wash_tempControl!;
    this.textile.iron_level = values.iron_levelControl!;
    this.textile.others = values.othersControl!;
    this.bs.update(this.id, this.textile)
      .subscribe({
        next: (response) => {
          console.log(response);
          console.log(response._id);
          // Navigate to the table route after receiving the server response
          this.router.navigateByUrl('/table');
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => console.log('update() completed')
      });
  }

cancel(): void {
  this.location.back();
}

}
