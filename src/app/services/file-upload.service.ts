import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async updatePicture(type: 'users' | 'doctors' | 'hospitals', id: string, file?: File) {
    try {
      if (file) {
        const url = `${baseUrl}/upload/${type}/${id}`;
        const form = new FormData();
        form.append('image', file);

        const resp = await fetch(url, {
          method: 'PUT',
          headers: {
            'x-token': localStorage.getItem('token') || ''
          },
          body: form
        });
        const data= await resp.json();
        console.log(data);

        if(data.ok)
          return data.file;
        else
        return false;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
