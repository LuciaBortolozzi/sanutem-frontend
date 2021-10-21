import {Component, OnInit} from '@angular/core';
import {UploadFileService} from 'src/app/auth/services/upload-file.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-medical-tests',
  templateUrl: './medical-tests.component.html',
  styleUrls: ['./medical-tests.component.css']
})
export class MedicalTestsComponent implements OnInit {

  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';

  fileInfos: Observable<any>;
  private nameUser: string;
  focus: boolean;
  filesForm: FormGroup;

  constructor(private uploadService: UploadFileService, private activatedRoute: ActivatedRoute) {
    this.nameUser = this.activatedRoute.snapshot.params.name;
  }

  ngOnInit(): void {
    this.filesForm = new FormGroup({
      file: new FormControl('', Validators.required)
    });
    this.fileInfos = this.uploadService.getFiles(this.nameUser);
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.progress = 0;

    this.currentFile = this.selectedFiles.item(0);
    this.uploadService.upload(this.nameUser, this.currentFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          this.fileInfos = this.uploadService.getFiles(this.nameUser);
        }
      },
      err => {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
      });

    this.selectedFiles = undefined;
  }

}
