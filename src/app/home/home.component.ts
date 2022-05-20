import {Component, OnInit} from '@angular/core';
import { Course } from "../model/course";
import { createHttpObservable } from '../common/util';
import { map } from 'rxjs/operators';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    beginnerCourses: Course[] = [];
    advancedCourses: Course[] = [];

    ngOnInit() {
        const http$ = createHttpObservable('/api/courses');
        const courses$ = http$.pipe(
            map(
                response => Object.values(response['payload'])
            )
        );

        courses$.subscribe( 
            courses => { 
                this.beginnerCourses = courses.filter( course => course['category'] == 'BEGINNER') as Course[];
                this.advancedCourses = courses.filter( course => course['category'] == 'ADVANCED') as Course[];

            },
            () => {},
            () => { console.log('Complete') }
        );


    }

}
