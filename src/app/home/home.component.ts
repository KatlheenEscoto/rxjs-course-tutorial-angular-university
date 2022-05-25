import {Component, OnInit} from '@angular/core';
import { Course } from "../model/course";
import { createHttpObservable } from '../common/util';
import { catchError, finalize, map, shareReplay, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { of } from 'rxjs';


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
            catchError( error => {
                console.log('Error ocurred', error);
                return throwError(error);
            }),
            finalize( () => {
                console.log('Finalize executed...');
            }),
            tap( () => console.log('HTTP request executed') ),
            map( response => Object.values(response['payload'])),
            shareReplay<Course[]>(),
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
