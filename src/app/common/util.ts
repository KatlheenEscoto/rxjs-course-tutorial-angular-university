import { Observable } from "rxjs";

export function createHttpObservable(url: string): Observable<any> {
    return Observable.create(
      observer => {
        const controller = new AbortController();
        const signal = controller.signal;

        fetch(url)
          .then(response => {
            return response.json();
          })
          .then( body => {
            observer.next(body);
            observer.complete();
          })
          .catch( error => {
            observer.error(error);
          });
        
          return () => controller.abort();
      }
    );
  }