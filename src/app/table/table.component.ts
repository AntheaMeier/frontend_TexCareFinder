import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../shared/backend.service';
import { Textile } from '../shared/textile';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  textiles: Textile[] = [];
  deleted = false;
  newTextile: Textile = {
    _id: '',
    category: '',
    feature: '',
    wash_temp: '',
    iron_level: '',
    others: ''
  };

  constructor(private bs: BackendService, private router: Router) { }

  ngOnInit(): void {
    this.readAll();
  }

  readAll(): void {
    this.bs.getAll().subscribe(
      {
        next: (response) => {
              this.textiles = response;
              this.textiles.sort((a, b) => a.category.localeCompare(b.category));
              console.log(this.textiles);
              return this.textiles;
            },
        error: (err) => console.log(err),
        complete: () => console.log('getAll() completed')
      })
  }

  createNewTextile(): void {
    this.bs.create(this.newTextile).subscribe(
      {
        next: (response) => {
          console.log('response : ', response);
          this.newTextile = {
            _id: '',
            category: '',
            feature: '',
            wash_temp: '',
            iron_level: '',
            others: ''
          };
          this.reload(false);
        },
        error: (err) => console.log(err),
        complete: () => console.log('create() completed')
      });
  }

  delete(id: string): void {
    this.bs.deleteOne(id).subscribe(
      {
        next: (response: any) => {
          console.log('response : ', response);
          if(response.status == 204){
                  console.log(response.status);
                  this.reload(true);
                } else {
                  console.log(response.status);
                  console.log(response.error);
                  this.reload(false);
                }
        },
        error: (err) => console.log(err),
        complete: () => console.log('deleteOne() completed')
    });
  }

  reload(deleted: boolean)
  {
    this.deleted = deleted;
    this.readAll();
    this.router.navigateByUrl('/table');
  }
}
