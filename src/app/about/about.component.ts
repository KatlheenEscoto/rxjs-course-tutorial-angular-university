import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const http$ = createHttpObservable('/api/courses');
    const courses$ =  http$.pipe(
      map( response => Object.values(response['payload']) )
    );

    const subscription$ = http$.subscribe(
      courses => { console.log(courses) },
      () => {}, // No handling error.
      () => { console.log('Complete') }
    );

    setTimeout(() => subscription$.unsubscribe(), 0);
    
    // Using map operator.
    courses$.subscribe(
        courses => { console.log(courses) },
        () => {}, // No handling error.
        () => { console.log('Complete') }
    );

    

  }

}
