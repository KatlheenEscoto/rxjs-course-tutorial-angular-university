import {Component, OnInit} from '@angular/core';
import { Course } from "../model/course";
import { createHttpObservable } from '../common/util';
import { map, shareReplay, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    beginnerCourses$: Observable<Course[]>;
    advancedCourses$: Observable<Course[]>;

    ngOnInit() {
        const http$ = createHttpObservable('/api/courses');
        const courses$: Observable<Course[]> = http$.pipe(
            tap( () => console.log('HTTP request executed') ),
            map( response => Object.values(response['payload'])),
            shareReplay<Course[]>()
        );
        this.beginnerCourses$ = courses$.pipe(
            map(
                courses => courses.filter( course => course.category == 'BEGINNER' )
            )
        );
        this.advancedCourses$ = courses$.pipe(
            map(
                courses => courses.filter( course => course.category == 'ADVANCED' )
            )
        );


    }

}
