/**
 * Simple HTTM Service
 * ------------------------------------------------
 * Contains methods explicitly for making HTTP requests and returning response data as a Document (object)
 * 
 */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SimplehttpService {

  constructor() { }

   /* Utility: Makes a single page HTTP request and then parses the response into an HTML document */
   public getDom(url: string) {
    let httpResponsePromise = fetch(url, {
      redirect: 'follow',
      headers : {
        'Content-Type': 'text/plain'
      }
    }).then(fetchedResponse => {
      return fetchedResponse.text();
    }).then(fetchedResolvedPromise => {
      return new DOMParser().parseFromString(fetchedResolvedPromise, "text/html");
    });
    return httpResponsePromise;
  }
}
